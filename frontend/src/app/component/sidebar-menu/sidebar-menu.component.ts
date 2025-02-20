import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../services/permission.service';

@Component({
    selector: 'app-sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
    styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
    constructor(public permissionService: PermissionService) {}

    ngOnInit(): void {
    }
}
