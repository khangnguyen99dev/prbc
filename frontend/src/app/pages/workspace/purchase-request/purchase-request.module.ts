import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRequestComponent } from './purchase-request.component';
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
    { path: '', component: PurchaseRequestComponent }
];

@NgModule({
  declarations: [PurchaseRequestComponent],
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
  ],
  providers: [  
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class PurchaseRequestModule { }
