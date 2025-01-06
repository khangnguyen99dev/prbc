import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { PermissionService } from 'src/app/services/permission.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
    selector: 'app-entity-management',
    templateUrl: './entity-management.component.html',
    styleUrls: ['./entity-management.component.scss']
})
export class EntityManagementComponent {
    public entities: any[] = [];
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
        created_by: "",
        local_currency_id: "",
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
                title: 'Entity Management',
            },
        ]);
    }

    ngOnInit(): void {
        this.getEntities();
    }

    getEntities(): void {
        this.loading = true;
        const filters = { ...this.filters };
        if (filters.created_at) {
            filters.created_at = moment(filters.created_at).format('YYYY-MM-DD');
        }
        axios.get(`${environment.api_url}/settings/entities`, {
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

                this.entities = response.data.entities.data;
                this.totalItems = response.data.entities.total;
                this.to = response.data.entities.to;
                this.from = response.data.entities.from;
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
        this.getEntities();
    }

    searchEntities(): void {
        this.page = 1;
        this.getEntities();
    }

    clearMessages() {
        setTimeout(() => {
            this.successMessage = '';
        }, 3500);
    }

    resetFilters(): void {
        ($("#local_currency_selectize") as any).selectize()[0].selectize.clear();
        this.filters = {
            name: "",
            code: "",
            created_by: "",
            local_currency_id: "",
        };
        this.page = 1;
        this.getEntities();
    }

    deleteEntity(id: string): void {
        if (confirm('Are you sure you want to delete this entity?')) {
            axios.delete(`${environment.api_url}/settings/entities/${id}`, {
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
                this.getEntities();
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

    ngAfterViewInit() {
        this.setupSelectize();
    }

    setupSelectize() {
        const component = this;
        $(function() {
            ($("#local_currency_selectize") as any).selectize()[0].selectize.destroy();

            const currencyEl: any = $('#local_currency_selectize');
            const currencySelectize = currencyEl.selectize({
                preload: true,
                valueField: 'id',
                searchField: 'label',
                labelField: 'label',
                load: (query: any, callback: any) => {
                    $('#fetching_local_currency').show();
                    $.ajax({
                        url: `${environment.api_url}/settings/currencies?search_selectize=${query}`,
                        type: 'GET',
                        error: function () {
                            callback();
                            $("#fetching_local_currency").hide();
                        },
                        success: (res: any) => {
                            callback(res?.currencies?.data);
                            // this.items = res?.data?.items?.data;
                            $("#fetching_local_currency").hide();
                        },
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                            'Content-Type': 'application/json',
                        }
                    });
                },
                onChange: (value: any) => {
                    component.filters.local_currency_id = value;
                }
            })[0].selectize;

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
