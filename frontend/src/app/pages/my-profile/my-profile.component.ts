import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
    public form: any = {
        // entity_id: '',
        name: '',
        employee_number: '',
        email: '',
        date_of_birth: '',
        password: '',
        confirm_password: '',
        entityObject: ''
    };
    public userId: number = 0;
    public loading: boolean = false;
    public errorMessages: any = [];
    public successMessage: any = '';

    constructor (
        private userService: UserService,
        private headerService: HeaderService,
    ) { 
        this.headerService.setupHeader([
            {
              title: 'My Profile',
            },
        ]);
    }

    private userSubscription!: Subscription;

    ngOnInit(): void {
        this.userSubscription = this.userService.user$.subscribe(user => {
            if (user) {
                this.userId = user.id;
                this.form.name = user.name;
                this.form.email = user.email;
                this.form.employee_number = user.employee_number;
                this.form.date_of_birth = user.date_of_birth;
                this.form.entity_id = user.entity_id;
                this.form.entityObject = user.entity;
                this.setupSelectize();
            }
        });
    }

    updateUser(): void {
        this.errorMessages = [];
        this.successMessage = '';
        this.loading = true;
        if (this.form.date_of_birth) {
            this.form.date_of_birth = moment(this.form.date_of_birth).format('YYYY-MM-DD');
        }
        axios.put(`${environment.api_url}/update-profile/${this.userId}`, this.form, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
            },
        })
            .then((response) => {
                if (response.data.error) {
                    let errors = [];
                    errors.push(response.data.error_message);
                    this.errorMessages = errors;
                    this.loading = false;
                    this.clearMessages();
                    return;
                }

                this.userService.fetchUserInfo();

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
