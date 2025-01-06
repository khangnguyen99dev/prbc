import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SettingsLinkComponent } from './settings-link.component';

@NgModule({
  declarations: [
    SettingsLinkComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SettingsLinkComponent
  ]
})
export class SettingsLinkModule { }
