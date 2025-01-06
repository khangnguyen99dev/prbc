import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { FormsModule } from '@angular/forms';
import { UserDetailsModule } from './currency-details/currency-details.module';
import { CurrencyRatePeriodsModule } from './currency-rate-periods/currency-rate-periods.module';

const routes: Routes = [
    { path: '', component: ManagerComponent }, 
];

@NgModule({
    declarations: [ManagerComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        UserDetailsModule,
        CurrencyRatePeriodsModule
    ],
    exports: [RouterModule],
})
export class ManagerModule { }