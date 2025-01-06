import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PermissionService } from 'src/app/services/permission.service';
import * as moment from 'moment';
import { HeaderService } from 'src/app/services/header.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent {

    constructor(
        private router: Router,
        private headerService: HeaderService,
        public permissionService: PermissionService
    ) {
        this.headerService.setupHeader([
            {
                title: 'Work Space',
            },
            {
                title: 'Purchase Requests',
                link: '/purchase-requests',
            },
            {
                title: 'New Purchase Request',
            },
        ]);
    }

    public items: any[] = [];
    public loading: boolean = false;
    public errorMessages: string[] = [];
    public successMessage: string = '';

    public availableBudget: any = {};

    public form: any = {
        pr_name: '',
        entity_id: '',
        currency: '',
        pr_number: '',
        pr_date: moment().format('YYYY-MM-DD'),
        pr_description: '',
        items: []
    };

    public levelSetup: any = {
        total_level: 0,
        option_levels: [],
        level_selected: 0,
        option_approver_user: []
    };


    ngOnInit() {
        this.setup();
    }

    save() {
        this.errorMessages = [];
        this.loading = true;
        this.form.items = this.items;
        this.form.items.forEach((item: any) => {
            item.required_by = moment(item.required_by).format('YYYY-MM-DD');
        });
        this.form.approver_users_selected = [];
        for (let i = 1; i <= this.levelSetup.level_selected; i++) {
            this.form.approver_users_selected.push({
                'level': i,
                'approver_user_id': $('#approver_user_selectize_' + i).val()
            });
        }
        this.form.approval_level_required = this.levelSetup.level_selected;
        this.form.currency = $('#currency_selectize').val();
        axios.post(`${environment.api_url}/work-space/purchase-requests`, this.form, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
            }
        })
            .then(response => {
                if (response.data.error) {
                    this.errorMessages.push(response.data.error_message);
                    window.scrollTo(0, 0);
                    this.loading = false;
                    this.clearMessages();
                    return;
                }

                this.router.navigateByUrl('/purchase-requests/' + response.data.purchase_request.id + '?success_message=true');
            })
            .catch(error => {
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

    deleteItem(index: number) {
        this.items.splice(index, 1);
    }

    addItem() {
        this.items.push({
            item_name: '',
            item_description: '',
            unit_price: 0,
            quantity: 0,
            total_price: 0
        });
    }

    calculateTotalPrice(index: number) {
        this.items[index].total_price = this.items[index].quantity * this.items[index].unit_price;
    }

    setup(): void {
        axios.get(`${environment.api_url}/work-space/purchase-requests/setup`, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
            }
        })
            .then(response => {
                this.form.pr_number = response.data.pr_number;
                this.levelSetup = response.data.level_setup;
                this.setupSelectizeLevel();
            })
            .catch(error => {
                this.errorMessages = error.response.data.errors;
                this.loading = false;
            });
    }

    ngAfterViewInit() {
        this.setupSelectize();
    }

    setupSelectize() {
        const component = this;
        $(function() {

            ($("#entity_selectize") as any).selectize()[0].selectize.destroy();
            // ($("#level_selectize") as any).selectize()[0].selectize.destroy();

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
                    component.getAvailableBudget();
                    
                    if (component.levelSetup.level_selected > 0) {
                        component.levelSetup.option_approver_user = [];
                        for (let i = 1; i <= component.levelSetup.level_selected; i++) {
                            component.levelSetup.option_approver_user.push({
                                id: i,
                            });
                            
                        }
                        component.setupApproverUserSelectize();
                    }
                }
            })[0].selectize;


            ($("#currency_selectize") as any).selectize()[0].selectize.destroy();

            const currencyEl: any = $('#currency_selectize');
            const currencySelectize = currencyEl.selectize({
                preload: true,
                valueField: 'currency_code',
                searchField: 'label',
                labelField: 'label',
                load: (query: any, callback: any) => {
                    $('#fetching_currency').show();
                    $.ajax({
                        url: `${environment.api_url}/settings/currencies?search_selectize=${query}`,
                        type: 'GET',
                        error: function () {
                            callback();
                            $("#fetching_currency").hide();
                        },
                        success: (res: any) => {
                            callback(res?.currencies?.data);
                            $("#fetching_currency").hide();
                        },
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                            'Content-Type': 'application/json',
                        }
                    });
                },
                onChange: (value: any) => {
                    component.form.currency = value;
                    component.getAvailableBudget();
                }
            })[0].selectize;
        });
    }

    setupSelectizeLevel() {
        const component = this;
        $(function() {
            const levelEl: any = $('#level_selectize');
            const levelSelectize = levelEl.selectize({
                onChange: (value: any) => {
                    component.levelSetup.level_selected = value;
                    component.levelSetup.option_approver_user = [];
                    for (let i = 1; i <= component.levelSetup.level_selected; i++) {
                        component.levelSetup.option_approver_user.push({
                            id: i,
                        });

                    }
                    component.setupApproverUserSelectize();
                }
            })[0].selectize;
        });
    }

    setupApproverUserSelectize() {
        const component = this;
        $(function() {
            for (let i = 1; i <= component.levelSetup.level_selected; i++) {
                ($("#approver_user_selectize_" + i) as any).selectize()[0].selectize.destroy();
                const approverUserEl: any = $('#approver_user_selectize_' + i);
                const approverUserSelectize = approverUserEl.selectize({
                    preload: true,
                    valueField: 'id',
                    searchField: 'label',
                    labelField: 'label',
                    load: (query: any, callback: any) => {
                        $('#fetching_approver_user_' + i).show();
                        $.ajax({
                            url: `${environment.api_url}/settings/users?search_selectize=${query}&module=purchase_request&level=${i}&entity_id=${component.form.entity_id}`,
                            type: 'GET',
                            error: function () {
                                callback();
                                $("#fetching_approver_user_" + i).hide();
                            },
                            success: (res: any) => {
                                callback(res?.users?.data);
                                console.log(res?.users?.data);
                                $("#fetching_approver_user_" + i).hide();
                            },
                            headers: {
                                Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                                'Content-Type': 'application/json',
                            }
                        });
                    }
                })[0].selectize;
            }
        });
    }


    clearMessages() {
        setTimeout(() => {
            this.successMessage = '';
        }, 3500);
    }

    getAvailableBudget() {
        axios.get(`${environment.api_url}/work-space/purchase-requests/get-available-budget`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
            },
            params: {
                pr_date: this.form.pr_date,
                currency: this.form.currency,
                entity_id: this.form.entity_id
            }
        })
            .then(response => {
                this.availableBudget = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }
}
