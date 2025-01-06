import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceLinkComponent } from './workspace-link.component';

describe('WorkspaceLinkComponent', () => {
  let component: WorkspaceLinkComponent;
  let fixture: ComponentFixture<WorkspaceLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
