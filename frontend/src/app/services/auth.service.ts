import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PermissionService } from './permission.service';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.api_url;

    constructor(
        private http: HttpClient,
        private router: Router,
        private permissionService: PermissionService
    ) { }

    logout(): Observable<any> {
        return this.http.post(`${this.apiUrl}/logout`, {}, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
            },
        });
    }

    performLogout() {
        this.permissionService.removePermissions();
        this.logout().subscribe({
            next: () => {
                // Clear local storage or any authentication tokens
                localStorage.removeItem('access_token');
                // Navigate to login page
                this.router.navigate(['/sign-in']);
            },
            error: (error) => {
                console.error('Logout failed', error);
                // Even if logout fails, clear local storage and redirect
                localStorage.removeItem('access_token');
                this.router.navigate(['/sign-in']);
            }
        });
    }
} 