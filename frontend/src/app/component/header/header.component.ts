import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    public currentUser: any = [];
    public loadingUserInfo: boolean = false;
    private userSubscription!: Subscription;
    notifications: any[] = [];
    notificationSubscription!: Subscription;
    public headerContainer: any = [];
    private headerSubscription!: Subscription;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private headerService: HeaderService,
        private notificationService: NotificationService
    ) { }
    
    onLogout() {
        this.authService.performLogout();
    }

    ngOnInit() {
        // Subscribe to user updates
        this.userSubscription = this.userService.user$.subscribe(user => {
            if (user) {
                this.currentUser = user;
            }
        });

        // Initial fetch
        this.userService.fetchUserInfo();
        

        // Subscribe to user updates
        this.notificationSubscription = this.notificationService.notifications$.subscribe(notifications => {
            if (notifications) {
                this.notifications = notifications;
            }
        });

        // Initial fetch
        this.notificationService.fetchNotifications();

        // Subscribe to user updates
        this.headerSubscription = this.headerService.headers$.subscribe(headers => {
            if (headers) {
                this.headerContainer = headers;
            }
        });
    }

    ngOnDestroy() {
        // Unsubscribe to prevent memory leaks
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }
}
