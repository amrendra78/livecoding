import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // 👈 yaha RouterModule add karo

@Component({
  selector: 'app-home',
  standalone: true, // 👈 standalone true likhna zaroori hai
  imports: [CommonModule, FormsModule, RouterModule], // 👈 RouterModule yaha add kar do
  templateUrl: './home.html',
  styleUrls: ['./home.css'] // 👈 yaha 'styleUrls' hoga (plural)
})
export class HomeComponent {
  // For Create Room form
  roomName = '';
  roomDescription = '';
  roomFile: File | null = null;
  // For Join Room form
  joinRoomId = '';
  inviteCode = '';

  createdRooms: { id: string, name: string, description: string }[] = [];
  joinedRooms: { id: string, name: string, description: string }[] = [];

  constructor(private router: Router) {
    this.loadRooms();
  }

  loadRooms() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const created = localStorage.getItem('createdRooms');
      const joined = localStorage.getItem('joinedRooms');
      this.createdRooms = created ? JSON.parse(created) : [];
      this.joinedRooms = joined ? JSON.parse(joined) : [];
    } else {
      this.createdRooms = [];
      this.joinedRooms = [];
    }
  }

  saveRooms() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('createdRooms', JSON.stringify(this.createdRooms));
      localStorage.setItem('joinedRooms', JSON.stringify(this.joinedRooms));
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.roomFile = input.files[0];
    } else {
      this.roomFile = null;
    }
  }

  onCreateRoom() {
    if (!this.roomName.trim()) return;
    const roomId = Math.random().toString(36).substring(2, 10);
    // Add to createdRooms and save
    this.createdRooms.push({ id: roomId, name: this.roomName.trim(), description: this.roomDescription.trim() });
    this.saveRooms();
    // Navigate to editor
    this.router.navigate(['/editor', roomId], {
      queryParams: { name: this.roomName.trim(), description: this.roomDescription.trim() }
    });
  }

deleteCreatedRoom(id: string) {
  this.createdRooms = this.createdRooms.filter(r => r.id !== id);
  this.saveRooms();
}

deleteJoinedRoom(id: string) {
  this.joinedRooms = this.joinedRooms.filter(r => r.id !== id);
  this.saveRooms();
}



  onJoinRoom() {
    let roomId = this.joinRoomId.trim();
    if (!roomId) return;
    if (roomId.includes('/')) {
      if (roomId.endsWith('/')) roomId = roomId.slice(0, -1);
      const parts = roomId.split('/');
      roomId = parts[parts.length - 1];
    }
    // Only add if not already joined
    if (!this.joinedRooms.some(r => r.id === roomId)) {
      // For demo, just add with empty name/desc (could fetch from backend)
      this.joinedRooms.push({ id: roomId, name: 'Room ' + roomId, description: '' });
      this.saveRooms();
    }
    this.router.navigate(['/editor', roomId]);
  }
}
