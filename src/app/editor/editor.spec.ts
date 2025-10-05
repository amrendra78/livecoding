import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD

import { Editor } from './editor';

describe('Editor', () => {
  let component: Editor;
  let fixture: ComponentFixture<Editor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
=======
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
>>>>>>> 2a79b6e4904e4ebee98d3dacd39003e64c1b5af2
});
