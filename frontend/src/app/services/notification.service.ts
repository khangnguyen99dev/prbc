import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notificationsSubject = new BehaviorSubject<any>(null);
    public notifications$ = this.notificationsSubject.asObservable();

    async fetchNotifications() {
        const token = window.localStorage.getItem(environment.api_token_identifier);
        if (!token) {
            return;
        }
        try {
            const res = await axios.get(`${environment.api_url}/notifications/fetch-notifications`, {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            const data = res.data;
            if (data.error) {
                console.error('Error:', data.error);
                return;
            }

            const notifications = data?.notifications || [];
            this.notificationsSubject.next(notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }
} 