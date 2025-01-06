import { ComponentFixture, TestBed } from '@angular/core/testing';

import {BonusPoolComponent } from './bonus-pool.component';

describe('BonusPoolComponent', () => {
  let component: BonusPoolComponent;
  let fixture: ComponentFixture<BonusPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ BonusPoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonusPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
