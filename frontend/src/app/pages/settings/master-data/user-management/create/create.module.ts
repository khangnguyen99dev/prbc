import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create.component';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'src/app/component/alert/alert.module';
import { PaginationModule } from 'src/app/component/pagination/pagination.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

const routes: Routes = [
    { path: '', component: CreateComponent }, 
];

@NgModule({
    declarations: [CreateComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        AlertModule,
        PaginationModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ],
    exports: [RouterModule],
})
export class CreateModule { }