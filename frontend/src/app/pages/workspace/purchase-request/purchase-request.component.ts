import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { PermissionService } from 'src/app/services/permission.service';
import * as moment from 'moment';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.component.html',
  styleUrls: ['./purchase-request.component.scss']
})
export class PurchaseRequestComponent {

  public purchaseRequests: any[] = [];
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
    entity_name: "",
    pr_number: "",
    pr_date: "",
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
        title: 'Purchase Requests',
      },
    ]);
   }

  ngOnInit(): void {
    this.getPurchaseRequests();
  }

  getPurchaseRequests(): void {
    this.loading = true;
    const filters = { ...this.filters };
    if (filters.pr_date) {
        filters.pr_date = moment(filters.pr_date).format('YYYY-MM-DD');
    }

    axios.get(`${environment.api_url}/work-space/purchase-requests`, {
      headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
      },
      params: {
          page: this.page,
          per_page: this.perPage,
          module: 'purchase_request',
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

          this.purchaseRequests = response.data.purchase_requests.data;
          this.totalItems = response.data.purchase_requests.total;
          this.to = response.data.purchase_requests.to;
          this.from = response.data.purchase_requests.from;
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
    this.getPurchaseRequests();
  }

  searchPurchaseRequests(): void {
    this.page = 1;
    this.getPurchaseRequests();
  }

  clearMessages() {
    setTimeout(() => {
        this.errorMessages = [];
        this.successMessage = '';
    }, 3500);
  }

  resetFilters(): void {
    this.filters = {
        pr_number: "",
        pr_date: "",
        amount: "",
        status: "",
    };
    this.getPurchaseRequests();
  }

}
