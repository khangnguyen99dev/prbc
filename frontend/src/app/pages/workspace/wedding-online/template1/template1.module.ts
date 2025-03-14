import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Template1Component } from './template1.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'src/app/component/alert/alert.module';
import { PaginationModule } from 'src/app/component/pagination/pagination.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
    { path: '', component: Template1Component }
];

@NgModule({
  declarations: [Template1Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    AlertModule,
    PaginationModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
  ]
})
export class Template1Module { }
