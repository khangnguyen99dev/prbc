import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PermissionService } from 'src/app/services/permission.service';
import 'jquery';
import '@selectize/selectize';
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
                title: 'Country Management',
                link: '/settings/master-data/country-management',
            },
            {
                title: 'New Country',
            },
        ]);
    }

    public form: any = {
        name: '',
        code: '',
        owner_id: '',
        region_id: '',
        flag: null,
        flag_url: null,
    };

    public loading: boolean = false;

    createCountry(): void {
        this.errorMessages = [];
        this.successMessage = '';
        this.loading = true;
        const formData = new FormData();
        formData.append('name', this.form.name);
        formData.append('code', this.form.code);
        formData.append('owner_id', this.form.owner_id);
        formData.append('region_id', this.form.region_id);
        if (this.form.flag && this.form.flag instanceof File) {
            formData.append('flag', this.form.flag);
        }
        axios.post(`${environment.api_url}/settings/countries`, formData, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'multipart/form-data',
                Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
            },
        }).then((response) => {
                if (response.data.error) {
                    this.errorMessages.push(response.data.error_message);
                    window.scrollTo(0, 0);
                    this.loading = false;
                    this.clearMessages();
                    return;
                }

                this.router.navigateByUrl('/settings/master-data/country-management/' + response.data.country.id + '?success_message=true');
        }).catch((error) => {
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
            ($("#owner_selectize") as any).selectize()[0].selectize.destroy();
            const ownerEl: any = $('#owner_selectize');
            const ownerSelectize = ownerEl.selectize({
                preload: true,
                valueField: 'id',
                searchField: 'name',
                labelField: 'name',
                load: (query: any, callback: any) => {
                    $('#fetching_owner').show();
                    $.ajax({
                        url: `${environment.api_url}/settings/users?search_selectize=${query}`,
                        type: 'GET',
                        error: function () {
                            callback();
                            $("#fetching_owner").hide();
                        },
                        success: (res: any) => {
                            callback(res?.users?.data);
                            $("#fetching_owner").hide();
                        },
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                            'Content-Type': 'application/json',
                        }
                    });
                },
                onChange: (value: any) => {
                    component.form.owner_id = value;
                }
            })[0].selectize;

            ($("#region_selectize") as any).selectize()[0].selectize.destroy();
            const regionEl: any = $('#region_selectize');
            const regionSelectize = regionEl.selectize({
                preload: true,
                valueField: 'id',
                searchField: 'name',
                labelField: 'name',
                load: (query: any, callback: any) => {
                    $('#fetching_region').show();
                    $.ajax({
                        url: `${environment.api_url}/settings/regions?search_selectize=${query}`,
                        type: 'GET',
                        error: function () {
                            callback();
                            $("#fetching_region").hide();
                        },
                        success: (res: any) => {
                            callback(res?.regions?.data);
                            $("#fetching_region").hide();
                        },
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                            'Content-Type': 'application/json',
                        }
                    });
                },
                onChange: (value: any) => {
                    component.form.region_id = value;
                }
            })[0].selectize;
        });
    }

    onImageChange(event: any) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.form.flag_url = e.target.result;
            this.form.flag = file;
        };
        reader.readAsDataURL(file);
    }

    removeImage() {
        this.form.flag_url = null;
        this.form.flag = null;
    }
}
