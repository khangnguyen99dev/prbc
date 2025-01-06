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
                title: 'Region Management',
                link: '/settings/master-data/region-management',
            },
            {
                title: 'New Region',
            },
        ]);
    }

    public form: any = {
        name: '',
        code: '',
        owner_id: '',
        image: null,
        image_url: null,
    };

    public loading: boolean = false;

    createRegion(): void {
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
        axios.post(`${environment.api_url}/settings/regions`, formData, {
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

                this.router.navigateByUrl('/settings/master-data/region-management/' + response.data.region.id + '?success_message=true');
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

            //   if (component.clusterLocations.length > 0) {
            //     const selectedClusterLocations = [];
            //     for(let location of component.clusterLocations) {
            //       locationSelectize.addOption(location); 
            //       selectedClusterLocations.push(location.id);
            //     }
            //     locationSelectize.setValue(selectedClusterLocations);
            //   };
        });
    }

    onImageChange(event: any) {
        console.log(event);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.form.image_url = e.target.result;
            this.form.image = file;
        };
        reader.readAsDataURL(file);
    }

    removeImage() {
        this.form.image_url = null;
        this.form.image = null;
    }
}
