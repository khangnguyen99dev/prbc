import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PermissionService } from 'src/app/services/permission.service';
import 'jquery';
import '@selectize/selectize';
import { HeaderService } from 'src/app/services/header.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent {
    public modelId: number = 0;
    public errorMessages: string[] = [];
    public successMessage: string = '';

    constructor(
        private router: Router,
        private headerService: HeaderService,
        private route: ActivatedRoute,
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
                title: 'Entity Management',
                link: '/settings/master-data/entity-management',
            },
            {
                title: 'Edit Entity',
            },
        ]);
    }

    public form: any = {
        name: '',
        code: '',
        address: '',
        local_currency_id: '',
        optionLocalCurrency: {},
        country_id: '',
        optionCountry: {},
        image: null,
        image_url: null,
        is_deleted_image: false,
    };

    public loading: boolean = false;

    updateEntity(): void {
        this.errorMessages = [];
        this.successMessage = '';
        this.loading = true;
        const formData = new FormData();
        formData.append('name', this.form.name);
        formData.append('code', this.form.code);
        formData.append('address', this.form.address);
        formData.append('local_currency_id', this.form.local_currency_id);
        if (this.form.image && this.form.image instanceof File) {
            formData.append('image', this.form.image);
        }
        formData.append('is_deleted_image', this.form.is_deleted_image ? '1' : '0');
        formData.append('country_id', this.form.country_id);
        formData.append('_method', 'PUT');
        axios.post(`${environment.api_url}/settings/entities/${this.modelId}`, formData, {
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

    async setupSelectize(): Promise<void> {
        const component = this;
        $(function() {
            ($("#local_currency_selectize") as any).selectize()[0].selectize.destroy();
            
            const localCurrencyEl: any = $('#local_currency_selectize');
            const localCurrencySelectize = localCurrencyEl.selectize({
                preload: true,
                valueField: 'id',
                searchField: 'label',
                labelField: 'label',
                load: (query: any, callback: any) => {
                    $('#fetching_local_currency').show();
                    $.ajax({
                        url: `${environment.api_url}/settings/currencies?search_selectize=${query}`,
                        type: 'GET',
                        error: function () {
                            callback();
                            $("#fetching_local_currency").hide();
                        },
                        success: (res: any) => {
                            callback(res?.currencies?.data);
                            // this.items = res?.data?.items?.data;
                            $("#fetching_local_currency").hide();
                        },
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                            'Content-Type': 'application/json',
                        }
                    });
                },
                onChange: (value: any) => {
                    component.form.local_currency_id = value;
                }
            })[0].selectize;

            if (component.form.local_currency_id) {
                localCurrencySelectize.addOption(component.form.optionLocalCurrency);
                localCurrencySelectize.setValue(component.form.local_currency_id);
            };

            const countryEl: any = $('#country_selectize');
                const countrySelectize = countryEl.selectize({
                    preload: true,
                    valueField: 'id',
                    searchField: 'name',
                    labelField: 'name',
                    load: (query: any, callback: any) => {
                        $('#fetching_country').show();
                        $.ajax({
                            url: `${environment.api_url}/settings/countries?search_selectize=${query}`,
                            type: 'GET',
                            error: function () {
                                callback();
                                $("#fetching_country").hide();
                            },
                            success: (res: any) => {
                                callback(res?.countries?.data);
                                $("#fetching_country").hide();
                            },
                            headers: {
                                Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                                'Content-Type': 'application/json',
                            }
                        });
                },
                onChange: (value: any) => {
                    component.form.country_id = value;
                }
            })[0].selectize;

            if (component.form.country_id) {
                countrySelectize.addOption(component.form.optionCountry);
                countrySelectize.setValue(component.form.country_id);
            };
        });
    }
    async ngOnInit(): Promise<void> {
        this.modelId = this.route.snapshot.params['id'];
        this.setForm();
        this.route.queryParams.subscribe((queryParams: any) => {
            if (queryParams['success_message']) {
                window.scrollTo(0, 0);
                this.successMessage = "Entity created successfully";
                this.clearMessages();
            }
        });
    }

    async setForm(): Promise<void> {
        this.loading = true;
        axios.get(`${environment.api_url}/settings/entities/${this.modelId}`, {
                headers: {
                    Accept: 'application/json',
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

                let entity = response.data.entity;
                this.form.name = entity.name;
                this.form.code = entity.code;
                this.form.address = entity.address;
                this.form.local_currency_id = entity.local_currency_id;
                this.form.optionLocalCurrency = entity.local_currency;
                this.form.country_id = entity.country_id;
                this.form.optionCountry = entity.country;
                this.form.image_url = entity.logo_url ? entity.logo_url : null;

                this.setupSelectize();

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

    onImageChange(event: any) {
        console.log(event);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.form.image_url = e.target.result;
            this.form.image = file;
            this.form.is_deleted_image = false;
        };
        reader.readAsDataURL(file);
    }

    removeImage() {
        this.form.image_url = null;
        this.form.image = null;
        this.form.is_deleted_image = true;
    }
}