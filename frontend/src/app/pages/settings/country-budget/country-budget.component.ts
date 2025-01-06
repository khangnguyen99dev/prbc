import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { PermissionService } from 'src/app/services/permission.service';
import * as moment from 'moment';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-country-budget',
  templateUrl: './country-budget.component.html',
  styleUrls: ['./country-budget.component.scss']
})
export class CountryBudgetComponent {
  public countryBudgets: any[] = [];
  public loading = false;
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
        title: 'Country Budget',
      },
    ]);
  }

  // Pagination
  public page = 1;
  public totalItems = 0;
  public perPage = 10;
  public to = '';
  public from = '';

  // Filters
  public filters: any = {
    country_name: '',
    year: '',
    created_at: '',
    created_by: '',
  };

  ngOnInit(): void {
    this.getCountryBudgets();
  }

  resetFilters(): void {
    this.filters = {
      country_name: '',
      year: '',
      created_at: '',
      created_by: '',
    };
  }

  searchBudgets(): void {
    this.getCountryBudgets();
  }

  selectedPage(page: number): void {
    this.page = page;
    this.getCountryBudgets();
  }

  clearMessages() {
    setTimeout(() => {
        this.successMessage = '';
    }, 3500);
  }

  getCountryBudgets(): void {
    this.loading = true;
    const filters = { ...this.filters };
    if (filters.created_at) {
      filters.created_at = moment(filters.created_at).format('YYYY-MM-DD');
    }

    axios.get(`${environment.api_url}/settings/country-budgets`, {
          headers: {
              Accept: 'application/json',
              "Content-Type": 'application/json',
              Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
          },
          params: {
              page: this.page,
              per_page: this.perPage,
              module: 'country_budget',
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

          this.countryBudgets = response.data.country_budgets.data;
          this.totalItems = response.data.country_budgets.total;
          this.to = response.data.country_budgets.to;
          this.from = response.data.country_budgets.from;
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
}
