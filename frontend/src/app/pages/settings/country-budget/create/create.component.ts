import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PermissionService } from 'src/app/services/permission.service';
import * as moment from 'moment';
import { NotificationService } from 'src/app/services/notification.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  public errorMessages: string[] = [];
  public successMessage: string = '';
  public countries: any[] = [];
  public years: number[] = [];
  public monthlyAmounts: Array<{month: number, amount: number}> = [];
  public loading = false;

  constructor(
    private router: Router,
    private headerService: HeaderService,
    public permissionService: PermissionService,
    private notificationService: NotificationService
  ) {
    this.headerService.setupHeader([
      {
        title: 'Settings',
      },
      {
        title: 'Country Budget',
        link: '/settings/country-budget',
      },
      {
        title: 'New Country Budget',
      },
    ]);
  }

  public form: any = {
    year: '',
    country_id: '',
    currency: 'SGD',
    monthly_amounts: []
  };

  createCountryBudget(): void {
    this.errorMessages = [];
    this.successMessage = '';
    this.loading = true;

    this.form.year = this.form.year.toString();
    this.form.country_id = this.form.country_id.toString();
    this.form.monthly_amounts = this.monthlyAmounts;

    axios.post(`${environment.api_url}/settings/country-budgets`, this.form, {
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
      }
    })
      .then(response => {
        if (response.data.error) {
          this.errorMessages = [response.data.error_message];
          window.scrollTo(0, 0);
          this.loading = false;
        } else {
          this.notificationService.fetchNotifications();
          this.router.navigateByUrl('/settings/country-budget/' + response.data.country_budget.id + '?success_message=true');
        }
      })
      .catch(error => {
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

  clearMessages() {
    setTimeout(() => {
        this.successMessage = '';
    }, 3500);
  }

  getMonthName(month: number): string {
    return moment().month(month - 1).format('MMMM');
  }

  onYearChange(): void {
    this.monthlyAmounts = [];
    for (let month = 1; month <= 12; month++) {
      this.monthlyAmounts.push({
        month: month,
        amount: 0
      });
    }
    this.form.monthly_amounts = this.monthlyAmounts;
  }

  generateYearsList(): void {
    const currentYear = moment().year();
    const startYear = currentYear - 5;
    const endYear = currentYear + 5;
    
    this.years = [];
    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }
    this.setupSelectize();
  }

  ngOnInit(): void {
    this.generateYearsList();
  }

  setupSelectize() {
    const component = this;
    $(function() {
        const yearEl: any = $('#year_selectize');
        const yearSelectize = yearEl.selectize({
          onChange: (value: any) => {
              component.form.year = value;
              component.onYearChange();
          }
        })[0].selectize;

        ($("#country_selectize") as any).selectize()[0].selectize.destroy();

        const countryEl: any = $('#country_selectize');
        const countrySelectize = countryEl.selectize({
          preload: true,
          valueField: 'id',
          searchField: 'label',
          labelField: 'label',
          load: (query: any, callback: any) => {
            $('#fetching_country').show();
            $.ajax({
                url: `${environment.api_url}/settings/countries?search_selectize=${query}`,
                type: 'GET',
                error: function () {
                    callback();
                    $("#fetching_country").hide();
                },
                success: (res: any) => {
                    callback(res?.countries?.data);
                    // this.items = res?.data?.items?.data;
                    $("#fetching_country").hide();
                },
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                    'Content-Type': 'application/json',
                }
            });
          },
          onChange: (value: any) => {
              component.form.country_id = value ? value : '';
          }
        })[0].selectize;
    });
  }
}
