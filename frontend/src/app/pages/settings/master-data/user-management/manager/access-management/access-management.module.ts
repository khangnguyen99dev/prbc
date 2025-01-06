import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccessManagementComponent } from './access-management.component';
import { AlertModule } from 'src/app/component/alert/alert.module';

@NgModule({
    declarations: [
        AccessManagementComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        AlertModule
    ],
    exports: [
        AccessManagementComponent
    ]
})
export class AccessManagementModule { }
