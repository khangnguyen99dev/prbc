import { Component, OnInit, Input } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PermissionService } from 'src/app/services/permission.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'app-currency-rate-periods',
    templateUrl: './currency-rate-periods.component.html',
    styleUrls: ['./currency-rate-periods.component.scss']
})
export class CurrencyRatePeriodsComponent implements OnInit {

    @Input() modelId: any = '';

    isLoading: boolean = false;
    settingUp: boolean = true;
    successSetup: boolean = false;
    page = 1;
    totalItems = 0;
    perPage = 10;
    from = 0;
    to = 0;

    currencyRatePeriodId: any;

    actionPage = 'create';

    period_start: any = '';
    period_end: any = '';
    exchange_rate: any = '';
    currencyRatePeriods: any = {};

    public errorMessages: string[] = [];
    public successMessage: string = '';

    constructor(
        public permissionService: PermissionService
    ) {

    }

    selectedPage(page: any) {
        this.page = page;
        this.setup();
    }

    async delete(costId: any) {
        if (confirm('Are you sure you want to delete this Currency Rate Period?')) {
            this.isLoading = true;

            try {
                const res = await axios.delete(`${environment.api_url}/settings/currency-rate-periods/${costId}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                        "Content-Type": 'application/json',
                        Accept: 'application/json'
                    }
                });
                const data = await res.data;

                if (data.error) {
                    this.errorMessages.push(data.error_message);
                    window.scrollTo(0, 0);
                    this.isLoading = false;
                    this.clearMessages();
                    return;
                }

                this.successMessage = 'Successfully deleted Currency Rate Period!';
                this.setup();
                setTimeout(() => {
                    this.successMessage = '';
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
                this.isLoading = false;
                this.clearMessages();
            }
        }
    }

    async save() {
        this.isLoading = true;
        this.errorMessages = [];
        this.successMessage = '';
        try {
            const res = await axios.post(`${environment.api_url}/settings/currency-rate-periods`, {
                currency_id: this.modelId,
                period_start: moment(this.period_start).format('YYYY-MM-DD'),
                period_end: moment(this.period_end).format('YYYY-MM-DD'),
                exchange_rate: this.exchange_rate
            }, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                    "Content-Type": 'application/json',
                    Accept: 'application/json'
                }
            });
            const data = await res.data;

            if (data.error) {
                this.errorMessages.push(data.error_message);
                window.scrollTo(0, 0);
                this.isLoading = false;
                this.clearMessages();
                return;
            }
            this.period_start = '';
            this.period_end = '';
            this.exchange_rate = '';
            this.successMessage = 'Successfully added Currency Rate Period!';
            window.scrollTo(0, 0);
            this.setup();

            setTimeout(() => {
                this.successMessage = '';
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
            this.isLoading = false;
            this.clearMessages();
        }
    }

    async update() {
        this.isLoading = true;
        this.errorMessages = [];
        this.successMessage = '';
        try {
            const formData = {
                currency_id: this.modelId,
                period_start: moment(this.period_start).format('YYYY-MM-DD'),
                period_end: moment(this.period_end).format('YYYY-MM-DD'),
                exchange_rate: this.exchange_rate
            };

            const res = await axios.put(`${environment.api_url}/settings/currency-rate-periods/${this.currencyRatePeriodId}`, formData, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                    "Content-Type": 'application/json',
                    Accept: 'application/json'
                }
            });

            const data = await res.data;

            if (data.error) {
                this.errorMessages.push(data.error_message);
                window.scrollTo(0, 0);
                this.isLoading = false;
                this.clearMessages();
                return;
            }
            this.actionPage = 'create';
            this.period_start = '';
            this.period_end = '';
            this.exchange_rate = '';
            this.successMessage = 'Successfully updated Currency Rate Period!';
            window.scrollTo(0, 0);
            this.setup();

            setTimeout(() => {
                this.successMessage = '';
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
            this.isLoading = false;
            this.clearMessages();
        }
    }

    async setup() {
        this.isLoading = true;

        try {
            const res = await axios.get(`${environment.api_url}/settings/currency-rate-periods?page=${this.page}&currency_id=${this.modelId}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                    "Content-Type": 'application/json',
                    Accept: 'application/json'
                }
            });
            const data = await res.data;

            this.settingUp = false;
            if (data.error) {
                this.errorMessages.push(data.error_message);
                this.isLoading = false;
                return;
            }
            this.successSetup = true;
            this.currencyRatePeriods = data.currency_rate_periods.data;
            this.totalItems = data.currency_rate_periods.total;
            this.from = data.currency_rate_periods.from;
            this.to = data.currency_rate_periods.to;
            this.isLoading = false;
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
            this.isLoading = false;
            this.clearMessages();
        }
    }

    editCurrencyRatePeriod(currencyRatePeriod: any) {
        this.actionPage = 'update';
        this.currencyRatePeriodId = currencyRatePeriod.id;
        this.period_start = currencyRatePeriod.period_start;
        this.period_end = currencyRatePeriod.period_end;
        this.exchange_rate = currencyRatePeriod.exchange_rate;
        window.scrollTo(0, 0);
    }

    cancel() {
        this.actionPage = 'create';
        this.period_start = '';
        this.period_end = '';
        this.exchange_rate = '';
        window.scrollTo(0, 0);
    }

    ngOnInit(): void {
        this.setup();
    }

    clearMessages() {
        setTimeout(() => {
            this.successMessage = '';
        }, 3500);
    }
}
