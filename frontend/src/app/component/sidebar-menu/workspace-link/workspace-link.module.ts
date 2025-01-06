import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceLinkComponent } from './workspace-link.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    WorkspaceLinkComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    WorkspaceLinkComponent
  ]
})
export class WorkspaceLinkModule { }
