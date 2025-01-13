import { Component, OnInit, Input } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PermissionService } from 'src/app/services/permission.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
    @Input() modelId: any = null;
    public form: any = {
        entity_id: '',
        name: '',
        employee_number: '',
        email: '',
        date_of_birth: '',
        password: '',
        confirm_password: '',
        entityObject: null,
        status: ''
    };
    loading: boolean = false;
    public errorMessages: string[] = [];
    public successMessage: string = '';
    public entities: any[] = [];
    constructor(
        private route: ActivatedRoute,
        public permissionService: PermissionService
    ) { }

    async ngOnInit(): Promise<void> {
        await this.setForm();
        await this.setupSelectize();
        this.route.queryParams.subscribe((queryParams: any) => {
            if (queryParams['success_message']) {
                window.scrollTo(0, 0);
                this.successMessage = "User created successfully";
                this.clearMessages();
            }
        });
    }

    async setForm(): Promise<void> {
        this.loading = true;
        const response = await axios.get(`${environment.api_url}/settings/users/${this.modelId}`, {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
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

                let user = response.data.user;
                this.form.name = user.name;
                this.form.employee_number = user.employee_number;
                this.form.email = user.email;
                this.form.date_of_birth = user.date_of_birth;
                this.form.entity_id = user.entity_id;
                this.form.entityObject = user.entity;
                this.form.status = user.status;
                // this.form.password = user.password;
                // this.form.confirm_password = user.confirm_password;

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

    updateUser(): void {
        this.errorMessages = [];
        this.successMessage = '';
        this.loading = true;
        if (this.form.date_of_birth) {
            this.form.date_of_birth = moment(this.form.date_of_birth).format('YYYY-MM-DD');
        }
        axios.put(`${environment.api_url}/settings/users/${this.modelId}`, this.form, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
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

    async setupSelectize(): Promise<void> {
        const component = this;
        $(function() {
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
                }
            })[0].selectize;

            if (component.form.entity_id) {
                entitySelectize.addOption(component.form.entityObject);
                entitySelectize.setValue(component.form.entityObject.id);
            }
        });
    }
}
