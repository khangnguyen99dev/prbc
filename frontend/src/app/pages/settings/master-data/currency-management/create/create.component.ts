import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Observable, filter, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import 'jquery';
import '@selectize/selectize';
import { PermissionService } from 'src/app/services/permission.service';
import { HeaderService } from 'src/app/services/header.service';
@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent {

    addingCurrency = false;

    currencyName: any = '';
    currencyCode: any = '';
    currencyRate: any = 0;
    currencySymbol: any = '';
    currencyDecimalMark: any = '.';
    currencyThousandSeparator: any = ',';
    addingCurrency_Loading: any = false;

    public errorMessages: string[] = [];
    public successMessage: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
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
                title: 'Currency Management',
                link: '/settings/master-data/currency-management',
            },
            {
                title: 'New Currency',
            },
        ]);
    }

    getCurrencyName(currency: any) {
        if (currency.code === null || currency.code === undefined) {
            return '';
        }

        return currency.code + ' - ' + currency.name;
    }

    async saveAddingCurrency() {
        this.errorMessages = [];
        this.successMessage = '';
        this.addingCurrency_Loading = true;

        try {
            const res = await axios.post(`${environment.api_url}/settings/currencies`, {
                name: this.currencyName,
                code: this.currencyCode,
                rate: this.currencyRate,
                symbol: this.currencySymbol,
                decimal_mark: this.currencyDecimalMark,
                thousands_separator: this.currencyThousandSeparator
            }, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            });
            const data = await res.data;
            if (data.error) {
                this.errorMessages.push(data.error_message);
                window.scrollTo(0, 0);
                this.addingCurrency_Loading = false;
                this.clearMessages();
                return;
            }

            this.router.navigateByUrl('/settings/master-data/currency-management/' + data.currency.id + '?success_message=true');
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
            this.addingCurrency_Loading = false;
            this.clearMessages();
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.setupSelectize();
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
}

