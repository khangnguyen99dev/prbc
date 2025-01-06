import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PermissionService } from 'src/app/services/permission.service';
import * as moment from 'moment';
import { HeaderService } from 'src/app/services/header.service';
import { PurchaseRequestApproveService } from 'src/app/services/purchase-request-approve.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent {
    @Input() modelId: any = null;

    public form: any = {
        id: '',
        pr_name: '',
        entity_id: '',
        entity_object: null,
        currency_object: null,
        currency: 'SGD',
        pr_number: '',
        pr_date: '',
        pr_description: '',
        items: [],
        delete_item_ids: []
    };
    public entities: any = [];
    public items: any = [];

    public formApproval: any = {
        comment: '',
    };

    public cancelComment: string = '';

    public histories: any = [];
    public loadingHistory: boolean = false;
    public page = 1;
    public totalItems = 0;
    public perPage = 10;
    public to = '';
    public from = '';

    public availableBudget: any = {};

    constructor(
        private router: Router,
        private headerService: HeaderService,
        private route: ActivatedRoute,
        public purchaseRequestApproveService: PurchaseRequestApproveService,
        private notificationService: NotificationService,
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
                title: 'View Purchase Request',
            },
        ]);
    }

    public purchaseRequest: any = {};
    public loading: boolean = false;
    public errorMessages: string[] = [];
    public successMessage: string = '';

    public levelSetup: any = {
        total_level: 0,
        option_levels: [],
        level_selected: 0,
        option_approver_user: [],
        option_approver_user_object: []
    };

    ngOnInit() {
        this.route.params.subscribe((params: any) => {
            this.modelId = params['id'];
            this.form.id = this.modelId;
            this.getPurchaseRequest();
            this.getPurchaseRequestsHistory();
        });

        this.route.queryParams.subscribe((queryParams: any) => {
            if (queryParams['success_message']) {
                window.scrollTo(0, 0);
                this.successMessage = "Purchase request created successfully";
                this.clearMessages();
            }
        });
    }

    getPurchaseRequest() {
        this.loading = true;
        axios.get(`${environment.api_url}/work-space/purchase-requests/${this.modelId}`, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
            },
        })
            .then((response) => {
                if (response.data.error) {
                    this.errorMessages = response.data.error_message;
                    return;
                }

                this.purchaseRequest = response.data.purchase_request;
                this.form.pr_name = this.purchaseRequest.pr_name;
                this.form.entity_id = this.purchaseRequest.entity_id;
                this.form.entity_object = this.purchaseRequest.entity;
                this.form.currency = this.purchaseRequest.currency;
                this.form.pr_number = this.purchaseRequest.pr_number;
                this.form.pr_date = this.purchaseRequest.date;
                this.form.pr_description = this.purchaseRequest.description;
                this.form.items = this.purchaseRequest.items;

                this.items = this.purchaseRequest.items;
                this.items.forEach((item: any) => {
                    item.total_price = item.total_price_calculate;
                    item.unit_price = item.unit_price_calculate;
                });

                this.levelSetup = response.data.level_setup;
                this.levelSetup.level_selected = this.purchaseRequest.approval_level_required;
                this.levelSetup.option_approver_user_object = [];
                this.purchaseRequest.approvers.map((item: any) => {
                    if (this.levelSetup.option_approver_user_object[item?.level] == undefined) {
                        this.levelSetup.option_approver_user_object[item?.level] = [];
                    }
                    this.levelSetup.option_approver_user_object[item?.level].push(item?.approver);
                });
                this.setupSelectize();
                this.setupSelectizeLevel();
                this.loading = false;
            })
            .catch((error) => {
                this.errorMessages = error.response.data.error_message;
                this.loading = false;
            });
    }

    deleteItem(index: number, itemId: number) {
        this.items.splice(index, 1);
        this.form.delete_item_ids.push(itemId);
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
        axios.put(`${environment.api_url}/work-space/purchase-requests/${this.modelId}`, this.form, {
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

                this.successMessage = response.data.success_message;
                this.getPurchaseRequest();
                this.getPurchaseRequestsHistory();
                window.scrollTo(0, 0);
                setTimeout(() => {
                    this.clearMessages();
                    this.loading = false;
                }, 3500);
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

    setupSelectize() {
        const component = this;
        $(function () {

            ($("#entity_selectize") as any).selectize()[0].selectize.destroy();

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

            if (component.form.entity_id) {
                entitySelectize.addOption(component.form.entity_object);
                entitySelectize.setValue(component.form.entity_id);
            }

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
                            
                            // Set currency value after currencies are loaded
                            if (component.form.currency) {
                                currencySelectize.setValue(component.form.currency);
                            }
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
        $(function () {
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

            if (component.levelSetup.level_selected) {
                levelSelectize.setValue(component.levelSetup.level_selected);
            }
        });
    }

    setupApproverUserSelectize() {
        const component = this;
        $(function () {
            for (let i = 1; i <= component.levelSetup.level_selected; i++) {
                ($("#approver_user_selectize_" + i) as any).selectize()[0].selectize.destroy();
                let approverUserEl: any = $('#approver_user_selectize_' + i);
                let approverUserSelectize = approverUserEl.selectize({
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
                                $("#fetching_approver_user_" + i).hide();
                            },
                            headers: {
                                Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                                'Content-Type': 'application/json',
                            }
                        });
                    }
                })[0].selectize;

                if (component.levelSetup.option_approver_user_object[i]?.length > 0) {
                    let options: any = [];
                    let ids: any = [];
                    component.levelSetup.option_approver_user_object[i].map((item: any) => {
                        options.push(item);
                        ids.push(item.id);
                    });
                    approverUserSelectize.addOption(options);
                    approverUserSelectize.setValue(ids);
                }
            }
        });
    }


    clearMessages() {
        setTimeout(() => {
            this.successMessage = '';
        }, 3500);
    }

    submitForApproval() {
        this.errorMessages = [];
        if (!confirm('Do you want to submit for approval?')) {
            return;
        }
        this.loading = true;
        axios.post(`${environment.api_url}/work-space/purchase-requests/${this.modelId}/submit-for-approval`, {}, {
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

                this.purchaseRequest = response.data.purchase_request;
                this.successMessage = response.data.success_message;
                this.getPurchaseRequestsHistory();
                window.scrollTo(0, 0);
                this.purchaseRequestApproveService.fetchPurchaseRequestApprove();
                this.notificationService.fetchNotifications();
                setTimeout(() => {
                    this.clearMessages();
                    this.loading = false;
                }, 3500);
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

    cancel() {
        this.errorMessages = [];
        if (!confirm('Do you want to cancel purchase request?')) {
            return;
        }
        this.loading = true;
        axios.post(`${environment.api_url}/work-space/purchase-requests/${this.modelId}/cancel`, {
            comment: this.cancelComment,
        }, {
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

                this.purchaseRequest = response.data.purchase_request;
                this.successMessage = response.data.success_message;
                this.getPurchaseRequestsHistory();
                this.getAvailableBudget();
                window.scrollTo(0, 0);
                setTimeout(() => {
                    this.clearMessages();
                    this.loading = false;
                }, 3500);
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

    public isDisabledForm() {
        let isDisabled = true;
        if (this.purchaseRequest.status == 'Draft' 
            && this.permissionService.hasPermission('WorkSpace - Can Update Purchase Request')
        ) {
            isDisabled = false;
        }
        return isDisabled;
    }

    approval(type: string) {
        this.errorMessages = [];
        this.loading = true;
        axios.post(`${environment.api_url}/work-space/purchase-requests/${this.modelId}/approval`, {
            type: type,
            comment: this.formApproval.comment,
            approval_level_approved: this.purchaseRequest.approval_level_approved,
        }, {
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

                this.purchaseRequest = response.data.purchase_request;
                this.successMessage = response.data.success_message;
                this.getPurchaseRequestsHistory();
                this.purchaseRequestApproveService.fetchPurchaseRequestApprove();
                this.notificationService.fetchNotifications();
                window.scrollTo(0, 0);
                setTimeout(() => {
                    this.clearMessages();
                    this.loading = false;
                }, 3500);
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

    getPurchaseRequestsHistory(): void {
        this.loadingHistory = true;

        axios.get(`${environment.api_url}/work-space/purchase-requests/${this.modelId}/history`, {
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
                    let errors = [];
                    errors.push(response.data.error_message);
                    this.errorMessages = errors;
                    window.scrollTo(0, 0);
                    this.loadingHistory = false;
                    this.clearMessages();
                    return;
                }

                this.histories = response.data.histories.data;
                this.totalItems = response.data.histories.total;
                this.to = response.data.histories.to;
                this.from = response.data.histories.from;
                this.loadingHistory = false;
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
                this.loadingHistory = false;
                this.clearMessages();
            });
    }

    selectedPage(page: any) {
        this.page = page;
        this.getPurchaseRequestsHistory();
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
