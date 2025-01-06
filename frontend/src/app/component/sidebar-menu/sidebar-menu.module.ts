import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu.component';
import { SettingsLinkModule } from './settings-link/settings-link.module';
import { WorkspaceLinkComponent } from './workspace-link/workspace-link.component';

@NgModule({
    declarations: [
        SidebarMenuComponent,
        WorkspaceLinkComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SettingsLinkModule
    ],
    exports: [
        SidebarMenuComponent
    ]
})
export class SidebarMenuModule { }
