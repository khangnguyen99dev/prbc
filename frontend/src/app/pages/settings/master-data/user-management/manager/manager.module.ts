import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { FormsModule } from '@angular/forms';
import { UserDetailsModule } from './user-details/user-details.module';
import { AccessManagementModule } from './access-management/access-management.module';

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
        AccessManagementModule
    ],
    exports: [RouterModule],
})
export class ManagerModule { }