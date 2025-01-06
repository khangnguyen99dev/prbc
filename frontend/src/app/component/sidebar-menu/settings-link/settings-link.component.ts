import { Component } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
    selector: 'app-settings-link',
    templateUrl: './settings-link.component.html',
    styleUrls: ['./settings-link.component.scss']
})
export class SettingsLinkComponent {

    constructor (
        public permissionService: PermissionService,
    ) {
    }
}
