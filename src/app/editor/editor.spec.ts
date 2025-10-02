import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorComponent } from './editor';
import { Editor } from './editor';
describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let fixture: ComponentFixture<Editor>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorComponent]ngModule({
    })imports: [Editor]
    .compileComponents();
    .compileComponents();
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;or);
    fixture.detectChanges();onentInstance;
  });ixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });xpect(component).toBeTruthy();
}););
});
