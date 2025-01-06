import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { RouterModule, Routes } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'src/app/component/alert/alert.module';

const routes: Routes = [
    {
        path: '',
        component: CreateComponent
    }
]


@NgModule({
    declarations: [
        CreateComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatAutocompleteModule,
        ReactiveFormsModule,
        FormsModule,
        AlertModule
    ]
})
export class CreateModule { }
