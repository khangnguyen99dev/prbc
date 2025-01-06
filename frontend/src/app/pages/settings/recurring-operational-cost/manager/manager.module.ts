import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { FormsModule } from '@angular/forms';
import { DetailsModule } from './details/details.module';
import { RocMonthModule } from './roc-month/roc-month.module';
const routes: Routes = [
    { path: '', component: ManagerComponent }, 
];

@NgModule({
    declarations: [ManagerComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        DetailsModule,
        RocMonthModule,
    ],
    exports: [RouterModule],
})
export class ManagerModule { }