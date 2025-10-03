import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD

import { Signup } from './signup';

describe('Signup', () => {
  let component: Signup;
  let fixture: ComponentFixture<Signup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Signup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Signup);
=======
import { SignupComponent } from './signup';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
>>>>>>> 2a79b6e4904e4ebee98d3dacd39003e64c1b5af2
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
<<<<<<< HEAD
=======
});
>>>>>>> 2a79b6e4904e4ebee98d3dacd39003e64c1b5af2
