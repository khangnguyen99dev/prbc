import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RocMonthComponent } from './roc-month.component';
import { AlertModule } from 'src/app/component/alert/alert.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PaginationModule } from 'src/app/component/pagination/pagination.module';
@NgModule({
    declarations: [
        RocMonthComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        AlertModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        PaginationModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ],
    exports: [
        RocMonthComponent
    ]
})
export class RocMonthModule { }
