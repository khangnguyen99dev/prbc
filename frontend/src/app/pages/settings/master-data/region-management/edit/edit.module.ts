import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit.component';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'src/app/component/alert/alert.module';
import { PaginationModule } from 'src/app/component/pagination/pagination.module';

const routes: Routes = [
    { path: '', component: EditComponent }, 
];

@NgModule({
    declarations: [EditComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        AlertModule,
        PaginationModule
    ],
    exports: [RouterModule],
})
export class EditModule { }
