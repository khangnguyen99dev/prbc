import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { HeaderService } from 'src/app/services/header.service';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
    public currentTab: string = 'unread';

    public page = 1;
    public totalItems = 0;
    public perPage = 10;
    public notifications: any[] = [];
    public loading = false;
    public errorMessages: string[] = [];
    public successMessage: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private headerService: HeaderService,
        private notificationService: NotificationService
    ) {
        this.headerService.setupHeader([
            {
                title: 'Notifications',
            },
        ]);
    }


    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.currentTab = params['tab'] ?? 'unread';
            this.getNotifications();
        });
    }

    getNotifications(): void {
        this.loading = true;
        
        axios.get(`${environment.api_url}/notifications`, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
            },
            params: {
                page: this.page,
                per_page: this.perPage,
                tab: this.currentTab
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

                this.notifications = response.data.notifications.data;
                this.totalItems = response.data.notifications.total;
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

    markAsRead(id: number, handleSuccess: boolean = true): void {
        axios.post(`${environment.api_url}/notifications/mark-as-read`, {
            id: id
        }, {
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

            if (handleSuccess) {
                this.successMessage = response.data.success_message;
                this.page = 1;
                this.getNotifications();
                window.scrollTo(0, 0);
                setTimeout(() => {
                    this.successMessage = '';
                    this.loading = false;
                }, 3500);
            }
            this.notificationService.fetchNotifications();

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

    selectedPage(page: any) {
        this.page = page;
        this.getNotifications();
    }

    navigateTo(notification: any) {
        this.markAsRead(notification.id, false);
        this.router.navigate([notification?.data?.router_link]);
    }
}
