import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { PermissionService } from 'src/app/services/permission.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
    selector: 'app-recurring-operational-cost',
    templateUrl: './recurring-operational-cost.component.html',
    styleUrls: ['./recurring-operational-cost.component.scss']
})
export class RecurringOperationalCostComponent {
    public recurringOperationalCosts: any[] = [];
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
        created_by: "",
        entity_id: "",
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
                title: 'Recurring Operational Cost',
            },
        ]);
    }

    ngOnInit(): void {
        this.getRecurringOperationalCosts();
    }

    getRecurringOperationalCosts(): void {
        this.loading = true;
        const filters = { ...this.filters };
        if (filters.created_at) {
            filters.created_at = moment(filters.created_at).format('YYYY-MM-DD');
        }
        axios.get(`${environment.api_url}/settings/recurring-operational-costs`, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
            },
            params: {
                page: this.page,
                per_page: this.perPage,
                ...filters
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

                this.recurringOperationalCosts = response.data.recurring_operational_costs.data;
                this.totalItems = response.data.recurring_operational_costs.total;
                this.to = response.data.recurring_operational_costs.to;
                this.from = response.data.recurring_operational_costs.from;
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
        this.getRecurringOperationalCosts();
    }

    searchRecurringOperationalCosts(): void {
        this.page = 1;
        this.getRecurringOperationalCosts();
    }

    clearMessages() {
        setTimeout(() => {
            this.successMessage = '';
        }, 3500);
    }

    resetFilters(): void {
        ($("#entity_selectize") as any).selectize()[0].selectize.clear();
        this.filters = {
            name: "",
            code: "",
            created_by: "",
            entity_id: "",
        };
        this.page = 1;
        this.getRecurringOperationalCosts();
    }

    deleteRecurringOperationalCost(id: string): void {
        if (confirm('Are you sure you want to delete this recurring operational cost?')) {
            axios.delete(`${environment.api_url}/settings/recurring-operational-costs/${id}`, {
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

                this.successMessage = response.data.success_message;
                this.page = 1;
                this.getRecurringOperationalCosts();
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

    ngAfterViewInit() {
        this.setupSelectize();
    }

    setupSelectize() {
        const component = this;
        $(function() {
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
                    component.filters.entity_id = value ? value : '';
                }
            })[0].selectize;
        });
    }
}
