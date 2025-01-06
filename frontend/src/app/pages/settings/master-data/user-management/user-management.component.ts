import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { PermissionService } from 'src/app/services/permission.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
    public users: any[] = [];
    public loading = false;

    // Pagination
    public page = 1;
    public totalItems = 0;
    public perPage = 10;
    public to = '';
    public from = '';

    // Filters
    public filters: any = {
        name: "",
        email: "",
        created_at: "",
        created_by: "",
    };

    public errorMessages: string[] = [];
    public successMessage: string = '';

    constructor(
        private headerService: HeaderService,
        public permissionService: PermissionService
    ) {
        this.headerService.setupHeader([
            {
                title: 'Settings',
            },
            {
                title: 'Master Data',
            },
            {
                title: 'User Management',
            },
        ]);
    }

    ngOnInit(): void {
        this.getUsers();
        this.setupSelectize();
    }

    getUsers(): void {
        this.loading = true;
        const filters = { ...this.filters };
        if (filters.created_at) {
            filters.created_at = moment(filters.created_at).format('YYYY-MM-DD');
        }
        axios.get(`${environment.api_url}/settings/users`, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
            },
            params: {
                page: this.page,
                per_page: this.perPage,
                module: 'user_management',
                ...filters
            }
        })
            .then((response) => {
                if (response.data.error) {
                    this.errorMessages.push(response.data.error_message);
                    window.scrollTo(0, 0);
                    this.loading = false;
                    this.clearMessages();
                    return;
                }

                this.users = response.data.users.data;
                this.totalItems = response.data.users.total;
                this.to = response.data.users.to;
                this.from = response.data.users.from;
                this.loading = false;
            })
            .catch((error) => {
                console.error(error);
                if (error.response.status == 422) {
                    Object.keys(error.response.data.errors).forEach(key => {
                        this.errorMessages.push(error.response.data.errors[key]);
                    });
                } else {
                    this.errorMessages.push('Sorry, something went wrong. Please try again later.');
                }
                window.scrollTo(0, 0);
                this.loading = false;
                this.clearMessages();
            });
    }

    selectedPage(page: any) {
        this.page = page;
        this.getUsers();
    }

    searchUsers(): void {
        this.page = 1;
        this.getUsers();
    }

    clearMessages() {
        setTimeout(() => {
            this.successMessage = '';
        }, 3500);
    }

    resetFilters(): void {
        this.filters = {
            name: "",
            email: "",
            created_at: "",
            created_by: "",
        };
        this.getUsers();
    }

    setupSelectize() {
        const component = this;
        $(function() {
            const createdByEl: any = $('#created_by_selectize');
            const createdBySelectize = createdByEl.selectize({
                preload: true,
                valueField: 'name',
                searchField: 'name',
                labelField: 'name',
                load: (query: any, callback: any) => {
                    $.ajax({
                        url: `${environment.api_url}/settings/users?search_selectize=${query}`,
                        type: 'GET',
                        error: function () {
                            callback();
                        },
                        success: (res: any) => {
                            callback(res?.users?.data);
                        },
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                            'Content-Type': 'application/json',
                        }
                    });
                },
                onChange: (value: any) => {
                    component.filters.created_by = value;
                }
            })[0].selectize;
        });
    }
}
