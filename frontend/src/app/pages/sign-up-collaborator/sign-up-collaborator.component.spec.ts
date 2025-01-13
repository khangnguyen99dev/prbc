import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpCollaboratorComponent } from './sign-up-collaborator.component';

describe('SignUpCollaboratorComponent', () => {
  let component: SignUpCollaboratorComponent;
  let fixture: ComponentFixture<SignUpCollaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpCollaboratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
