import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-up-collaborator',
  templateUrl: './sign-up-collaborator.component.html',
  styleUrls: ['./sign-up-collaborator.component.scss']
})
export class SignUpCollaboratorComponent {

  constructor(
    private router: Router
  ) { }

  public errorMessages: string[] = [];
  public successMessage: string = '';
  public loading = false;

  public formData: any = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  ngOnInit(): void {
    
  }

  async onSubmit() {
    this.errorMessages = [];
    this.loading = true;

    try {
        const response = await axios.post(`${environment.api_url}/sign-up-collaborator`, this.formData);

        if (response.data.error) {
            this.errorMessages = [response.data.error_message];
            window.scrollTo(0, 0);
            this.loading = false;
            this.clearMessages();
            return;
        }

        this.successMessage = 'Thank you for your interest in becoming a collaborator. We will get back to you soon.';
        this.loading = false;
        this.clearMessages();

        this.formData = {
            name: '',
            email: '',
            phone: '',
            message: ''
        };

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

  clearMessages() {
    setTimeout(() => {
        this.successMessage = '';
    }, 3500);
  }
}
