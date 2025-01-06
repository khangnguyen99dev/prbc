import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CurrencyRatePeriodsComponent } from './currency-rate-periods.component';
import { AlertModule } from 'src/app/component/alert/alert.module';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PaginationModule } from 'src/app/component/pagination/pagination.module';

@NgModule({
    declarations: [
        CurrencyRatePeriodsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        AlertModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        PaginationModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ],
    exports: [
        CurrencyRatePeriodsComponent
    ]
})
export class CurrencyRatePeriodsModule { }