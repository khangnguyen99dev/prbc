import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { PermissionService } from 'src/app/services/permission.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
    selector: 'app-region-management',
    templateUrl: './region-management.component.html',
    styleUrls: ['./region-management.component.scss']
})
export class RegionManagementComponent {
    public regions: any[] = [];
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
        code: "",
        owner_name: "",
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
                title: 'Region Management',
            },
        ]);
    }

    ngOnInit(): void {
        this.getRegions();
        this.setupSelectize();
    }

    getRegions(): void {
        this.loading = true;
        const filters = { ...this.filters };
        if (filters.created_at) {
            filters.created_at = moment(filters.created_at).format('YYYY-MM-DD');
        }
        axios.get(`${environment.api_url}/settings/regions`, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
            },
            params: {
                page: this.page,
                per_page: this.perPage,
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

                this.regions = response.data.regions.data;
                this.totalItems = response.data.regions.total;
                this.to = response.data.regions.to;
                this.from = response.data.regions.from;
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
        this.getRegions();
    }

    searchRegions(): void {
        this.page = 1;
        this.getRegions();
    }

    clearMessages() {
        setTimeout(() => {
            this.successMessage = '';
        }, 3500);
    }

    resetFilters(): void {
        this.filters = {
            name: "",
            code: "",
            owner_name: "",
            created_by: "",
        };
        this.page = 1;
        this.getRegions();
    }

    deleteRegion(id: string): void {
        if (confirm('Are you sure you want to delete this region?')) {
            axios.delete(`${environment.api_url}/settings/regions/${id}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
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

                this.successMessage = response.data.success_message;
                this.page = 1;
                this.getRegions();
                window.scrollTo(0, 0);
                setTimeout(() => {
                    this.successMessage = '';
                    this.loading = false;
                }, 3500);
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
