import { Component, OnInit, Input } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PermissionService } from 'src/app/services/permission.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
    @Input() modelId: any = null;
    public errorMessages: string[] = [];
    public successMessage: string = '';

    public settingUp: boolean = true;
    public successSetup: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public permissionService: PermissionService
    ) { }

    public form: any = {
        name: '',
        code: '',
        description: '',
        entity_id: '',
        cost_amount_in_local_currency: '',
        active: 0,
        date_active: moment(new Date()).format('YYYY-MM-DD'),
        entityObject: null
    };

    public loading: boolean = false;

    editRecurringOperationalCost(): void {
        this.errorMessages = [];
        this.successMessage = '';
        this.loading = true;

        if (this.form.active == 1) {
            this.form.date_active = moment(this.form.date_active).format('YYYY-MM-DD');
        }

        const formData = new FormData();
        formData.append('id', this.modelId);
        formData.append('name', this.form.name);
        formData.append('code', this.form.code);
        formData.append('description', this.form.description);
        formData.append('entity_id', this.form.entity_id);
        formData.append('cost_amount_in_local_currency', this.form.cost_amount_in_local_currency);
        formData.append('active', this.form.active);
        formData.append('date_active', this.form.date_active);
        formData.append('_method', 'PUT');

        axios.post(`${environment.api_url}/settings/recurring-operational-costs/${this.modelId}`, formData, {
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

                this.successMessage = response.data.success_message;
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

    clearMessages() {
        setTimeout(() => {
            this.successMessage = '';
        }, 3500);
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

            if (component.form.entity_id) {
                entitySelectize.addOption(component.form.entityObject);
                entitySelectize.setValue(component.form.entity_id);
            }

            const activeEl: any = $('#active_selectize');
            const activeSelectize = activeEl.selectize({
                onChange: (value: any) => {
                    component.form.active = value;
                }
            })[0].selectize;

            activeSelectize.setValue(component.form.active);
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

            this.form.name = data.recurring_operational_cost.name;
            this.form.code = data.recurring_operational_cost.code;
            this.form.description = data.recurring_operational_cost.description;
            this.form.entity_id = data.recurring_operational_cost.entity_id;
            this.form.cost_amount_in_local_currency = data.recurring_operational_cost.cost_amount_in_local_currency;
            this.form.active = data.recurring_operational_cost.active;
            this.form.date_active = data.recurring_operational_cost.date_active;
            this.form.entityObject = data.recurring_operational_cost.entity;

            this.setupSelectize();

            this.successSetup = true;
        } catch (error) {
            console.log(error);
            this.errorMessages = ['Sorry, something went wrong. Please try again later.'];
            window.scrollTo(0, 0);
            this.settingUp = false;
        }
    }

    ngOnInit() {
        this.setup();
        this.route.queryParams.subscribe((queryParams: any) => {
            if (queryParams['success_message']) {
                window.scrollTo(0, 0);
                this.successMessage = "Recurring operational cost created successfully";
                this.clearMessages();
            }
        });
    }
}
