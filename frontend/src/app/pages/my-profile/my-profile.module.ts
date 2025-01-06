import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'src/app/component/alert/alert.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

const routes: Routes = [
    { path: '', component: MyProfileComponent }, 
];

@NgModule({
    declarations: [MyProfileComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ],
    exports: [RouterModule],
})
export class MyProfileModule { }
