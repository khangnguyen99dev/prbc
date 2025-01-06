import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in.component';
import { FormsModule } from '@angular/forms';
import { AlertModule } from '../../alert/alert.module';

const routes: Routes = [
    { path: '', component: SignInComponent }, 
];

@NgModule({
    declarations: [SignInComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        AlertModule
    ],
    exports: [RouterModule],
})
export class SignInModule { }