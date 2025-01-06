import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { PermissionService } from 'src/app/services/permission.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { HeaderService } from 'src/app/services/header.service';
@Component({
    selector: 'app-currency-management',
    templateUrl: './currency-management.component.html',
    styleUrls: ['./currency-management.component.scss']
})
export class CurrencyManagementComponent implements OnInit {

    query: any = '';
    currencies: any = [];
    currencyCodes: any = [];
    loading = true;
    page = 1;
    totalItems = 0;
    perPage = 10;
    from = 0;
    to = 0;

    // Filters
    public filters: any = {
        name: "",
        currency_code: "",
        created_by: "",
        created_at: "",
    };

    public errorMessages: string[] = [];
    public successMessage: string = '';

    constructor(
        private router: Router,
        private headerService: HeaderService,
        private activatedRoute: ActivatedRoute,
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
                title: 'Currency Management',
            },
        ]);
    }

    filterUpdated() {

    }

    async getCurrencies() {
        this.loading = true;

        const filters = { ...this.filters };
        if (filters.last_default_rate) {
            filters.last_default_rate = moment(filters.last_default_rate).format('YYYY-MM-DD');
        }
        if (filters.created_at) {
            filters.created_at = moment(filters.created_at).format('YYYY-MM-DD');
        }

        try {
            const res = await axios.get(`${environment.api_url}/settings/currencies`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                    "Content-Type": 'application/json',
                    Accept: 'application/json'
                },
                params: {
                    page: this.page,
                    per_page: this.perPage,
                    ...filters
                }
            });
            const data = await res.data;
            if (data.error) {
                this.errorMessages.push(data.error_message);
                window.scrollTo(0, 0);
                this.loading = false;
                this.clearMessages();
                return;
            }

            this.currencies = data.currencies.data;
            this.totalItems = data.currencies.total;
            this.from = data.currencies.from;
            this.to = data.currencies.to;
            this.loading = false;
        } catch (error: any) {
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
        }
    }

    async deleteCurrency(currency: any) {
        if (confirm('Are you sure you want to delete this currency?')) {
            this.loading = true;

            try {
                const res = await axios.delete(`${environment.api_url}/settings/currencies/${currency.id}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                        Accept: 'application/json',
                        "Content-Type": 'application/json'
                    }
                });
                const data = await res.data;
                this.loading = false;
                if (data.error) {
                    this.errorMessages.push(data.error_message);
                    window.scrollTo(0, 0);
                    this.loading = false;
                    this.clearMessages();
                    return;
                }
                this.successMessage = data.success_message;
                this.page = 1;
                this.getCurrencies();
                window.scrollTo(0, 0);
                setTimeout(() => {
                    this.successMessage = '';
                    this.loading = false;
                }, 3500);
            } catch (error: any) {
                console.log(error);
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
            }
        }
    }

    selectedPage(page: any) {
        this.page = page;
        this.getCurrencies();
    }

    ngOnInit() {
        this.getCurrencies();
        this.setupSelectize();

        this.activatedRoute.queryParams.subscribe(params => {
            let page = params['page'];
            if (page == undefined || page == null || page == '') {
                return;
            }
            this.page = page;
            this.getCurrencies();
        });
    }

    resetFilters() {
        this.filters = {
            name: "",
            currency_code: "",
            created_by: "",
            created_at: "",
        };
        this.page = 1;
        this.getCurrencies();
    }

    searchCurrencies() {
        this.page = 1;
        this.getCurrencies();
    }

    clearMessages() {
        setTimeout(() => {
            this.successMessage = '';
        }, 3500);
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
