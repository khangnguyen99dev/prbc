import { Component, OnInit, Input } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PermissionService } from 'src/app/services/permission.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'app-roc-month',
    templateUrl: './roc-month.component.html',
    styleUrls: ['./roc-month.component.scss']
})
export class RocMonthComponent {
    @Input() modelId: any = null;
    public rocMonths: any[] = [];
    public loading = false;
    public loadingRocMonth = false;
    public settingUp = false;
    public successSetup = false;
    // Pagination
    public page = 1;
    public totalItems = 0;
    public perPage = 10;
    public to = '';
    public from = '';

    public roc: any = {};

    public errorMessages: string[] = [];
    public successMessage: string = '';

    constructor(
        public permissionService: PermissionService
    ) { }

    ngOnInit(): void {
        this.setup();
    }

    getRocMonths(): void {
        this.loading = true;

        axios.get(`${environment.api_url}/settings/recurring-operational-costs/${this.modelId}/months`, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
            },
            params: {
                page: this.page,
                per_page: this.perPage,
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

                this.rocMonths = response.data.roc_months.data;
                this.totalItems = response.data.roc_months.total;
                this.to = response.data.roc_months.to;
                this.from = response.data.roc_months.from;
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
        this.getRocMonths();
    }

    clearMessages() {
        setTimeout(() => {
            this.successMessage = '';
        }, 3500);
    }

    runManualRocMonth(): void {
        this.loadingRocMonth = true;
        this.errorMessages = [];
        this.successMessage = '';
        const formData = new FormData();
        formData.append('id', this.modelId);

        axios.post(`${environment.api_url}/settings/recurring-operational-costs/${this.modelId}/run-manual-roc-month`, formData, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
            }
        })
            .then((response) => {
                if (response.data.error) {
                    this.errorMessages.push(response.data.error_message);
                    window.scrollTo(0, 0);
                    this.loadingRocMonth = false;
                    this.clearMessages();
                    return;
                }

                this.loadingRocMonth = false;
                this.successMessage = response.data.success_message;
                this.getRocMonths();

                setTimeout(() => {
                    this.successMessage = '';
                    this.loadingRocMonth = false;
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
                this.loadingRocMonth = false;
                this.clearMessages();
            });
    }

    async setup() {
        try {
            const res = await axios.get(`${environment.api_url}/settings/recurring-operational-costs/${this.modelId}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
                }
            });
            const data = await res.data;
            this.settingUp = false;
            if (data.error) {
                this.errorMessages.push(data.error_message);
                window.scrollTo(0, 0);
                this.clearMessages();
                return;
            }
            console.log(data);
            this.roc = data.recurring_operational_cost;

            this.getRocMonths();

            this.successSetup = true;
        } catch (error) {
            console.log(error);
            this.errorMessages = ['Sorry, something went wrong. Please try again later.'];
            window.scrollTo(0, 0);
            this.settingUp = false;
        }
    }
}
