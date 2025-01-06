import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    public employeeNumber: string = '';
    public password: string = '';

    public errorMessages: string[] = [];
    public successMessage: string = '';
    public loading = false;

    hidePassword = true;

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
        const token = window.localStorage.getItem(environment.api_token_identifier);
        if (token) {
            this.router.navigateByUrl('/home');
        }
    }

    async signIn() {
        this.errorMessages = [];
        this.loading = true;

        try {
            const response = await axios.post(`${environment.api_url}/login`, {
                employee_number: this.employeeNumber,
                password: this.password,
            });

            if (response.data.error) {
                this.errorMessages = [response.data.error_message];
                window.scrollTo(0, 0);
                this.loading = false;
                this.clearMessages();
                return;
            }

            const token = response.data.access_token;
            window.localStorage.setItem(environment.api_token_identifier, token);
            this.router.navigateByUrl('/home');

        } catch (error: any) {
            console.error(error);
            if (error.response?.status === 422) {
                Object.keys(error.response.data.errors).forEach(key => {
                    this.errorMessages.push(error.response.data.errors[key]);
                });
            } else {
                this.errorMessages.push('Sorry, something went wrong. Please try again later.');
            }
            window.scrollTo(0, 0);
            this.loading = false;
            this.clearMessages();
        }
    }

    togglePassword() {
        this.hidePassword = !this.hidePassword;
    }

    clearMessages() {
        setTimeout(() => {
            this.successMessage = '';
        }, 3500);
    }
}
