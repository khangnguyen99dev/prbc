import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-access-management',
    templateUrl: './access-management.component.html',
    styleUrls: ['./access-management.component.scss']
})
export class AccessManagementComponent implements OnInit {
    @Input() modelId: any = null;

    public errorMessages: string[] = [];
    public successMessage: string = '';

    settingUp = true;
    successSetup = false;
    saving = false;

    permissionFormControl = new FormControl();

    user: any = [];
    installedApplications: any = [];
    roles: any = [];
    roleSelected: any = [];

    constructor(
        private route: ActivatedRoute,
        public permissionService: PermissionService
    ) { };

    async setup() {
        this.settingUp = true;

        try {
            const res = await axios.get(`${environment.api_url}/settings/users/${this.modelId}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
                }
            });
            const data = await res.data;
            this.settingUp = false;
            if (data.error) {
                this.errorMessages.push(data.error_message);
                window.scrollTo(0, 0);
                return;
            }

            this.user = data.user;
            this.installedApplications = Object.values(data.installed_applications);
            this.roles = data.roles;

            // get role seleted
            for (let [index, application] of this.installedApplications.entries()) {
                for (let role of application.roles) {
                    if (this.roles.includes(role.role_name)) {
                        let roleName = application.key + '|||' + role.role_name;
                        this.roleSelected.push(roleName);
                    }
                }

                if (!this.roleSelected[index]) {
                    this.roleSelected.push('');
                }
            }

            setTimeout(() => {
                this.setupSelectize();
            }, 200);

            this.successSetup = true;
        } catch (error) {
            console.log(error);
            this.settingUp = false;
        }
    }

    setupSelectize() {
        for (let [index, application] of this.installedApplications.entries()) {
            let roleSelectizeEl: any = $('#roles_selectize_' + application.key);
            roleSelectizeEl.selectize();

            let roleSelected = [];
            for (let role of application.roles) {
                if (this.roles.includes(role.role_name)) {
                    let roleName = application.key + '|||' + role.role_name;
                    roleSelected.push(roleName);
                }
            }

            roleSelectizeEl[0].selectize.setValue(roleSelected);
        }
    }

    hasRole(role: String) {
        if (role !== null
            && role !== undefined
            && role !== ''
            && this.roles.includes(role)
        ) {
            return true;
        }
        return false;
    }

    async save() {
        this.errorMessages = [];
        try {
            this.saving = true;

            const roleSelected = [];
            for (let [index, application] of this.installedApplications.entries()) {
                const selectedApplicationRoles: any = $('#roles_selectize_' + application.key).val();
                roleSelected.push(...selectedApplicationRoles);
            }

            const formData = {
                user_id: this.modelId,
                roles: roleSelected,
            };

            const res = await axios.post(`${environment.api_url}/settings/user-access-managements/assign-role`, formData, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                    "Content-Type": 'application/json',
                    Accept: 'application/json'
                }
            });
            const data = await res.data;
            this.saving = false;

            if (data.error) {
                this.errorMessages.push(data.error_message);
                window.scrollTo(0, 0);
                return;
            }

            const component = this;
            this.successMessage = data.success_message;

            setTimeout(() => {
                component.successMessage = '';
            }, 3500);

            window.scrollTo(0, 0);

        } catch (error: any) {
            this.saving = false;
            console.log(error);
            window.scrollTo(0, 0);
        }
    }

    ngOnInit() {
        this.modelId = this.route.snapshot.params['id'];
        this.setup()
    }
}
