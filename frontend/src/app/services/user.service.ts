import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userSubject = new BehaviorSubject<any>(null);
    public user$ = this.userSubject.asObservable();

    async fetchUserInfo() {
        const token = window.localStorage.getItem(environment.api_token_identifier);
        if (!token) {
            return;
        }
        try {
            const res = await axios.get(`${environment.api_url}/user-info`, {
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

            const user = data?.data?.user || {};
            this.userSubject.next(user);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }
} 