import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowMonthlyAmountComponent } from './show-monthly-amount.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'src/app/component/alert/alert.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaginationModule } from 'src/app/component/pagination/pagination.module';


const routes: Routes = [
  { path: '', component: ShowMonthlyAmountComponent }, 
];

@NgModule({
  declarations: [ShowMonthlyAmountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    AlertModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    PaginationModule
  ]
})
export class ShowMonthlyAmountModule { }