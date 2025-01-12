import { Component, ElementRef, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { PermissionService } from 'src/app/services/permission.service';
import * as moment from 'moment';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-wedding-online',
  templateUrl: './wedding-online.component.html',
  styleUrls: ['./wedding-online.component.scss']
})
export class WeddingOnlineComponent {
  public weddingOnlines: any[] = [];
  public loading = false; 
  public errorMessages: any[] = [];
  public successMessage = '';

  // Pagination
  public page = 1;
  public totalItems = 0;
  public perPage = 10;
  public to = '';
  public from = '';

  // Filters
  public filters: any = {
    slug: "",
    bride_name: "",
    groom_name: "",
    wedding_date: "",
    status: "",
  };

  constructor(
      private headerService: HeaderService,
      public permissionService: PermissionService
  ) {
    this.headerService.setupHeader([
      {
        title: 'Work Space',
      },
      {
        title: 'Wedding Online',
      },
    ]);
   }

  ngOnInit(): void {
    this.getWeddingOnlines();
  }

  getWeddingOnlines(): void {
    this.loading = true;
    const filters = { ...this.filters };
    if (filters.wedding_date) {
        filters.wedding_date = moment(filters.wedding_date).format('YYYY-MM-DD');
    }

    axios.get(`${environment.api_url}/work-space/wedding-onlines`, {
      headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
      },
      params: {
          page: this.page,
          per_page: this.perPage,
          module: 'wedding_online',
          ...filters
      }
  })
      .then((response) => {
          if (response.data.error) {
              let errors = [];
              errors.push(response.data.error_message);
              this.errorMessages = errors;
              window.scrollTo(0, 0);
              this.loading = false;
              this.clearMessages();
              return;
          }

          this.weddingOnlines = response.data.wedding_onlines.data;
          this.totalItems = response.data.wedding_onlines.total;
          this.to = response.data.wedding_onlines.to;
          this.from = response.data.wedding_onlines.from;
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

  selectedPage(page: any) {
    this.page = page;
    this.getWeddingOnlines();
  }

  searchWeddingOnline(): void {
    this.page = 1;
    this.getWeddingOnlines();
  }

  clearMessages() {
    setTimeout(() => {
        this.errorMessages = [];
        this.successMessage = '';
    }, 3500);
  }

  resetFilters(): void {
    this.filters = {
        bride_name: "",
        groom_name: "",
        wedding_date: "",
        status: "",
    };
    this.getWeddingOnlines();
  }
}
