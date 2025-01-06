import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { environment } from 'src/environments/environment';
import axios from 'axios';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        const token = window.localStorage.getItem(environment.api_token_identifier);

        if (!token) {
            this.router.navigate(['/sign-in']);
            return false;
        }

        try {
            const response = await axios.get(`${environment.api_url}/user-exists`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return true;
        } catch (error) {
            window.localStorage.removeItem(environment.api_token_identifier);
            this.router.navigate(['/sign-in']);
            return false;
        }
    }
} 