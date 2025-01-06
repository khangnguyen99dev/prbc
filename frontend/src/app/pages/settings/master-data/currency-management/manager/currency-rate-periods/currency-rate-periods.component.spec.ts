import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrencyRatePeriodsComponent } from './currency-rate-periods.component';

describe('CurrencyRatePeriodsComponent', () => {
    let component: CurrencyRatePeriodsComponent;
    let fixture: ComponentFixture<CurrencyRatePeriodsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [CurrencyRatePeriodsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CurrencyRatePeriodsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
