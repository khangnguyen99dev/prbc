import { Component, OnInit, Input } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PermissionService } from 'src/app/services/permission.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-currency-details',
    templateUrl: './currency-details.component.html',
    styleUrls: ['./currency-details.component.scss']
})
export class CurrencyDetailsComponent implements OnInit {
    @Input() modelId: any = null;
    addingCurrency = false;

    currencyName: any = '';
    currencyCode: any = '';
    currencyRate: any = 0;
    currencySymbol: any = '';
    currencyDecimalMark: any = '.';
    currencyThousandSeparator: any = ',';

    public isDefaultCurrency: boolean = false;
    public lastDefaultRate: number = 0;

    public errorMessages: string[] = [];
    public successMessage: string = '';
    public settingUp: boolean = true;
    public successSetup: boolean = false;
    public saving: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public permissionService: PermissionService
    ) {
    }

    getCurrencyName(currency: any) {
        if (currency.code === null || currency.code === undefined) {
            return '';
        }

        return currency.code + ' - ' + currency.name;
    }

    async save(): Promise<any> {
        if (this.saving) {
            return false;
        }

        this.errorMessages = [];

        try {
            this.saving = true;

            const formData = {
                id: this.modelId,
                name: this.currencyName,
                code: this.currencyCode,
                rate: this.currencyRate,
                symbol: this.currencySymbol,
                decimal_mark: this.currencyDecimalMark,
                thousands_separator: this.currencyThousandSeparator,
            };

            const res = await axios.put(`${environment.api_url}/settings/currencies/${this.modelId}`, formData, {
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
                this.saving = false;
                this.clearMessages();
                return;
            }

            this.successMessage = data.success_message;
            setTimeout(() => {
                this.successMessage = '';
                this.saving = false;
            }, 3500);

            window.scrollTo(0, 0);
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
            this.saving = false;
            this.clearMessages();
        }
    }

    ngOnInit() {
        this.setup();

        this.route.queryParams.subscribe((queryParams: any) => {
            if (queryParams['success_message']) {
                window.scrollTo(0, 0);
                this.successMessage = "Currency created successfully";
                this.clearMessages();
            }
        });
    }

    setupSelectize() {
        const component = this;
        $(function() {
            ($("#decimal_mark") as any).selectize()[0].selectize.destroy();
            ($("#thousand_separator") as any).selectize()[0].selectize.destroy();

            const decimalMarkEl: any = $('#decimal_mark');
            let idSelectizeDecimalMark = decimalMarkEl.selectize(
                {
                    onChange: (value: any) => {
                        component.currencyDecimalMark = value;
                    }
                }
            )[0].selectize;
            idSelectizeDecimalMark.setValue(component.currencyDecimalMark, true);

            const thousandSeparatorEl: any = $('#thousand_separator');
            let idSelectizeThousandSeparator = thousandSeparatorEl.selectize(
                {
                    onChange: (value: any) => {
                        component.currencyThousandSeparator = value;
                    }
                }
            )[0].selectize;
            idSelectizeThousandSeparator.setValue(component.currencyThousandSeparator, true);
        });
    }

    clearMessages() {
        setTimeout(() => {
            this.successMessage = '';
        }, 3500);
    }

    async setup() {
        try {
            const res = await axios.get(`${environment.api_url}/settings/currencies/${this.modelId}`, {
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
            this.currencyName = data.currency.name;
            this.currencyCode = data.currency.currency_code;
            this.currencyRate = data.currency.rate;
            this.currencySymbol = data.currency.symbol;
            this.currencyDecimalMark = data.currency.decimal_mark;
            this.currencyThousandSeparator = data.currency.thousands_separator;
            this.isDefaultCurrency = data.currency.default;
            this.lastDefaultRate = data.currency.last_default_rate;

            this.setupSelectize();

            this.successSetup = true;
        } catch (error) {
            console.log(error);
            this.errorMessages = ['Sorry, something went wrong. Please try again later.'];
            window.scrollTo(0, 0);
            this.settingUp = false;
        }
    }
}
