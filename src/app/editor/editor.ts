import { Component, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editor.html',
  styleUrls: ['./editor.css'] // ✅ corrected
})
export class EditorComponent implements AfterViewChecked {
  origin = '';
  code = '# cook your dish here';
  input = '';
  output = '';
  language = '';
  roomId = '';
  roomName = '';
  roomDescription = '';

  chatMessages = [
    { user: 'System', text: 'Welcome to the live chat!' }
  ];
  chatInput = '';

  @ViewChild('chatMessagesDiv', { static: false }) chatMessagesRef!: ElementRef<HTMLDivElement>;

  constructor(private route: ActivatedRoute, private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('roomId') || '';
    });

    this.route.queryParamMap.subscribe(params => {
      this.roomName = params.get('name') || '';
      this.roomDescription = params.get('description') || '';
    });
  }

ngOnInit() {
  // ✅ Only attach beforeunload listener in browser
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      this.saveEditorData();
    });

    this.origin = window.location.origin;

    // Load saved editor data from localStorage per room
    const saved = localStorage.getItem('editor-' + this.roomId);
    if (saved) {
      const obj = JSON.parse(saved);
      this.code = obj.code || this.code;
      this.input = obj.input || '';
      this.output = obj.output || '';
      this.language = obj.language || '';
      this.chatMessages = obj.chatMessages || this.chatMessages;
    }
  }

  // Optional: fetch chat messages from backend (safe even in SSR, HttpClient works)
  this.http.get<{ user: string, text: string, timestamp?: string }[]>(`${environment.apiUrl}/api/messages`)
    .subscribe(messages => {
      if (messages.length) {
        this.chatMessages = messages;
      }
    });
}


  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  copyRoomLink() {
    const url = window.location.origin + '/editor/' + this.roomId;
    navigator.clipboard.writeText(url).then(() => alert('Room link copied!'));
  }

  runCode() {
    this.output = 'Running...';
    this.http.post<{ output: string }>(`${environment.apiUrl}/api/run`, {
      code: this.code,
      input: this.input,
      language: this.language
    }).subscribe({
      next: (res) => {
        this.output = res.output;
        this.saveEditorData(); // ✅ Save after running code
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.output = 'Backend error: ' + (err.error?.output || err.statusText || 'Unknown error');
        this.saveEditorData(); // ✅ Save even if error
        this.cdr.detectChanges();
      }
    });
  }

  sendMessage() {
    if (this.chatInput.trim()) {
      const newMsg = { user: 'You', text: this.chatInput };
      this.chatMessages.push(newMsg);

      // Save message to backend (optional)
      this.http.post(`${environment.apiUrl}/api/messages`, newMsg).subscribe();

      this.chatInput = '';
      this.saveEditorData(); // ✅ Save after sending message
      setTimeout(() => this.scrollToBottom(), 0);
    }
  }

  scrollToBottom() {
    if (this.chatMessagesRef && this.chatMessagesRef.nativeElement) {
      const el = this.chatMessagesRef.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }

  // ✅ Function to save all editor data per room
  saveEditorData() {
    if (!this.roomId) return;
    const data = {
      code: this.code,
      input: this.input,
      output: this.output,
      language: this.language,
      chatMessages: this.chatMessages
    };
    localStorage.setItem('editor-' + this.roomId, JSON.stringify(data));
  }
}
