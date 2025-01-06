import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details.component';
import { AlertModule } from 'src/app/component/alert/alert.module';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
    declarations: [
        UserDetailsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        AlertModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ],
    exports: [
        UserDetailsComponent
    ]
})
export class UserDetailsModule { }
