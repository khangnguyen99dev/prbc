import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PermissionService } from 'src/app/services/permission.service';
import 'jquery';
import '@selectize/selectize';
import * as moment from 'moment';
import { NotificationService } from 'src/app/services/notification.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent {
    public errorMessages: string[] = [];
    public successMessage: string = '';

    constructor(
        private router: Router,
        private headerService: HeaderService,
        public permissionService: PermissionService,
        private notificationService: NotificationService
    ) {
        this.headerService.setupHeader([
            {
                title: 'Settings',
            },
            {
                title: 'Recurring Operational Cost',
                link: '/settings/recurring-operational-cost',
            },
            {
                title: 'New Recurring Operational Cost',
            },
        ]);
    }

    public form: any = {
        name: '',
        code: '',
        description: '',
        entity_id: '',
        cost_amount_in_local_currency: '',
        active: 0,
        date_active: moment(new Date()).format('YYYY-MM-DD'),
    };

    public loading: boolean = false;

    createRecurringOperationalCost(): void {
        this.errorMessages = [];
        this.successMessage = '';
        this.loading = true;

        if (this.form.active == 1) {
            this.form.date_active = moment(this.form.date_active).format('YYYY-MM-DD');
        }

        const formData = new FormData();
        formData.append('name', this.form.name);
        formData.append('code', this.form.code);
        formData.append('description', this.form.description);
        formData.append('entity_id', this.form.entity_id);
        formData.append('cost_amount_in_local_currency', this.form.cost_amount_in_local_currency);
        formData.append('active', this.form.active);
        formData.append('date_active', this.form.date_active);

        axios.post(`${environment.api_url}/settings/recurring-operational-costs`, formData, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'multipart/form-data',
                Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
            },
        })
            .then((response) => {
                if (response.data.error) {
                    this.errorMessages.push(response.data.error_message);
                    window.scrollTo(0, 0);
                    this.loading = false;
                    this.clearMessages();
                    return;
                }

                this.notificationService.fetchNotifications();
                this.router.navigateByUrl('/settings/recurring-operational-cost/' + response.data.recurring_operational_cost.id + '?success_message=true');
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

    clearMessages() {
        setTimeout(() => {
            this.successMessage = '';
        }, 3500);
    }

    ngAfterViewInit() {
        this.setupSelectize();
    }

    setupSelectize() {
        const component = this;
        $(function() {
            ($("#entity_selectize") as any).selectize()[0].selectize.destroy();
            // ($("#active_selectize") as any).selectize()[0].selectize.destroy();

            const entityEl: any = $('#entity_selectize');
            const entitySelectize = entityEl.selectize({
                preload: true,
                valueField: 'id',
                searchField: 'label',
                labelField: 'label',
                load: (query: any, callback: any) => {
                    $('#fetching_entity').show();
                    $.ajax({
                        url: `${environment.api_url}/settings/entities?search_selectize=${query}`,
                        type: 'GET',
                        error: function () {
                            callback();
                            $("#fetching_entity").hide();
                        },
                        success: (res: any) => {
                            callback(res?.entities?.data);
                            // this.items = res?.data?.items?.data;
                            $("#fetching_entity").hide();
                        },
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                            'Content-Type': 'application/json',
                        }
                    });
                },
                onChange: (value: any) => {
                    component.form.entity_id = value;
                }
            })[0].selectize;

            const activeEl: any = $('#active_selectize');
            const activeSelectize = activeEl.selectize({
                onChange: (value: any) => {
                    console.log(value);
                    component.form.active = value;
                }
            })[0].selectize;
        });
    }

}
