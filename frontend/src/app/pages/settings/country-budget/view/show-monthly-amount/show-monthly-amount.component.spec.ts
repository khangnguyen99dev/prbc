import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMonthlyAmountComponent } from './show-monthly-amount.component';

describe('ShowMonthlyAmountComponent', () => {
  let component: ShowMonthlyAmountComponent;
  let fixture: ComponentFixture<ShowMonthlyAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMonthlyAmountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMonthlyAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
