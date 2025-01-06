import { Component } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { HeaderService } from 'src/app/services/header.service';

@Component({
    selector: 'app-country-management',
    templateUrl: './country-management.component.html',
    styleUrls: ['./country-management.component.scss']
})
export class CountryManagementComponent {
    public countries: any[] = [];
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
                title: 'Country Management',
            },
        ]);
    }

    ngOnInit(): void {
        this.getCountries();
    }

    getCountries(): void {
        this.loading = true;
        if (this.filters.created_at) {
            this.filters.created_at = moment(this.filters.created_at).format('YYYY-MM-DD');
        }
        axios.get(`${environment.api_url}/settings/countries`, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
            },
            params: {
                page: this.page,
                per_page: this.perPage,
                ...this.filters
            }
        }).then((response) => {
            if (response.data.error) {
                this.errorMessages.push(response.data.error_message);
                window.scrollTo(0, 0);
                this.loading = false;
                this.clearMessages();
                return;
            }

            this.countries = response.data.countries.data;
            this.totalItems = response.data.countries.total;
            this.to = response.data.countries.to;
            this.from = response.data.countries.from;
            this.loading = false;
        }).catch((error) => {
            console.error(error);
            if (error.response.status == 422) {
                Object.keys(error.response.data.errors).forEach(key => {
                    this.errorMessages.push(error.response.data.errors[key]);
                });
            } else {
                this.errorMessages.push('Sorry, something went wrong. Please try again later.');
            }
            this.loading = false;
        });
    }

    selectedPage(page: any) {
        this.page = page;
        this.getCountries();
    }

    searchCountries(): void {
        this.page = 1;
        this.getCountries();
    }

    clearMessages() {
        setTimeout(() => {
            this.errorMessages = [];
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
        this.getCountries();
    }

    deleteCountry(id: string): void {
        if (confirm('Are you sure you want to delete this country?')) {
            axios.delete(`${environment.api_url}/settings/countries/${id}`, {
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

                this.successMessage = response.data.message;
                this.page = 1;
                this.getCountries();
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
}

