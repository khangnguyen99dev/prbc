import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { PermissionService } from 'src/app/services/permission.service';
import * as moment from 'moment';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-bonus-pool',
  templateUrl: './bonus-pool.component.html',
  styleUrls: ['./bonus-pool.component.scss']
})
export class BonusPoolComponent {
  public bonusPools: any[] = [];
  public loading = false;

  // Pagination
  public page = 1;
  public totalItems = 0;
  public perPage = 10;
  public to = '';
  public from = '';

  // Filters
  public filters: any = {
      name: "",
      created_at: "",
      code: "",
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
        title: 'Bonus Pool',
      },
    ]);
  }

  ngOnInit(): void {
      this.getBonusPools();
  }

  getBonusPools(): void {
      this.loading = true;
      const filters = { ...this.filters };
      if (filters.created_at) {
          filters.created_at = moment(filters.created_at).format('YYYY-MM-DD');
      }
      axios.get(`${environment.api_url}/settings/bonus-pools`, {
          headers: {
              Accept: 'application/json',
              "Content-Type": 'application/json',
              Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
          },
          params: {
              page: this.page,
              per_page: this.perPage,
              module: 'bonus_pool',
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

              this.bonusPools = response.data.bonus_pools.data;
              this.totalItems = response.data.bonus_pools.total;
              this.to = response.data.bonus_pools.to;
              this.from = response.data.bonus_pools.from;
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
      this.getBonusPools();
  }

  searchBonusPools(): void {
      this.page = 1;
      this.getBonusPools();
  }

  clearMessages() {
      setTimeout(() => {
          this.successMessage = '';
      }, 3500);
  }

  resetFilters(): void {
      this.filters = {
          name: "",
          created_at: "",
          created_by: "",
      };
      this.getBonusPools();
  }
}
