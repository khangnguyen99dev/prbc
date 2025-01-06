import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyManagementComponent } from './currency-management.component';
import { RouterModule, Routes } from '@angular/router';
import { PaginationModule } from 'src/app/component/pagination/pagination.module';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'src/app/component/alert/alert.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

const routes: Routes = [
    {
        path: '',
        component: CurrencyManagementComponent
    }
]

@NgModule({
    declarations: [
        CurrencyManagementComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        PaginationModule,
        AlertModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ],
})
export class CurrencyManagementModule { }

