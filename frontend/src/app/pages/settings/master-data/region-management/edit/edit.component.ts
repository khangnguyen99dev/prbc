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
                title: 'Region Management',
                link: '/settings/master-data/region-management',
            },
            {
                title: 'Edit Region',
            },
        ]);
    }

    public form: any = {
        name: '',
        code: '',
        owner_id: '',
        optionOwner: {},
        image: null,
        image_url: null,
        is_deleted_image: false,
    };

    public loading: boolean = false;

    updateRegion(): void {
        this.errorMessages = [];
        this.successMessage = '';
        this.loading = true;
        const formData = new FormData();
        formData.append('name', this.form.name);
        formData.append('code', this.form.code);
        formData.append('owner_id', this.form.owner_id);
        if (this.form.image && this.form.image instanceof File) {
            formData.append('image', this.form.image);
        }
        formData.append('is_deleted_image', this.form.is_deleted_image ? '1' : '0');
        formData.append('_method', 'PUT');
        axios.post(`${environment.api_url}/settings/regions/${this.modelId}`, formData, {
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
            ($("#owner_selectize") as any).selectize()[0].selectize.destroy();

            const ownerEl: any = $('#owner_selectize');
            const ownerSelectize = ownerEl.selectize({
                preload: true,
                valueField: 'id',
                searchField: 'label',
                labelField: 'label',
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
                            // this.items = res?.data?.items?.data;
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

            if (component.form.owner_id) {
                ownerSelectize.addOption(component.form.optionOwner);
                ownerSelectize.setValue(component.form.owner_id);
            };
        });
    }

    ngOnInit() {
        this.modelId = this.route.snapshot.params['id'];
        this.setForm();
        this.route.queryParams.subscribe((queryParams: any) => {
            if (queryParams['success_message']) {
                window.scrollTo(0, 0);
                this.successMessage = "Region created successfully";
                this.clearMessages();
            }
        });
    }

    setForm(): void {
        this.loading = true;
        axios.get(`${environment.api_url}/settings/regions/${this.modelId}`, {
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

                let region = response.data.region;
                this.form.name = region.name;
                this.form.code = region.code;
                this.form.owner_id = region.owner_id;
                this.form.optionOwner = region.owner;
                this.form.image_url = region.image_url ? region.image_url : null;
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