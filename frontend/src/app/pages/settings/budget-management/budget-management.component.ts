import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { PermissionService } from 'src/app/services/permission.service';
import * as moment from 'moment';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-budget-management',
  templateUrl: './budget-management.component.html',
  styleUrls: ['./budget-management.component.scss']
})
export class BudgetManagementComponent {
  public budgets: any[] = [];
  public loading = false;

  // Pagination
  public page = 1;
  public totalItems = 0;
  public perPage = 10;
  public to = '';
  public from = '';

  // Filters
  public filters: any = {
      year: "",
      created_at: "",
      created_by: "",
      entity_name: "",
  };

  public errorMessages: string[] = [];
  public successMessage: string = '';

  constructor(
      private headerService: HeaderService,
      public permissionService: PermissionService
  ) { 
    this.headerService.setupHeader([
      {
          title: 'Settings',
      },
      {
          title: 'Entity Budget',
      },
    ]);
  }

  ngOnInit(): void {
      this.getBudgets();
  }

  getBudgets(): void {
      this.loading = true;
      const filters = { ...this.filters };
      if (filters.created_at) {
          filters.created_at = moment(filters.created_at).format('YYYY-MM-DD');
      }
      axios.get(`${environment.api_url}/settings/budgets`, {
          headers: {
              Accept: 'application/json',
              "Content-Type": 'application/json',
              Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
          },
          params: {
              page: this.page,
              per_page: this.perPage,
              module: 'budget_management',
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

              this.budgets = response.data.budgets.data;
              this.totalItems = response.data.budgets.total;
              this.to = response.data.budgets.to;
              this.from = response.data.budgets.from;
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
      this.getBudgets();
  }

  searchBudgets(): void {
      this.page = 1;
      this.getBudgets();
  }

  clearMessages() {
      setTimeout(() => {
          this.successMessage = '';
      }, 3500);
  }

  resetFilters(): void {
      this.filters = {
          year: "",
          created_at: "",
          created_by: "",
      };
      this.getBudgets();
  }
}
