import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryBudgetComponent } from './country-budget.component';

describe('CountryBudgetComponent', () => {
  let component: CountryBudgetComponent;
  let fixture: ComponentFixture<CountryBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryBudgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
