import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CurrencyDetailsComponent } from './currency-details.component';
import { AlertModule } from 'src/app/component/alert/alert.module';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        CurrencyDetailsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        AlertModule,
        FormsModule
    ],
    exports: [
        CurrencyDetailsComponent
    ]
})
export class UserDetailsModule { }
