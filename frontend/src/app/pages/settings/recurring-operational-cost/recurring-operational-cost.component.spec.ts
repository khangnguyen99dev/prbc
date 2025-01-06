import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RecurringOperationalCostComponent } from './recurring-operational-cost.component';

describe('RecurringOperationalCostComponent', () => {
    let component: RecurringOperationalCostComponent;
    let fixture: ComponentFixture<RecurringOperationalCostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [RecurringOperationalCostComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RecurringOperationalCostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
