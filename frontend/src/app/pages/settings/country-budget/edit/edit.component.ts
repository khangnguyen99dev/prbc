import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import axios from 'axios';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  @Input() id: any = null;
  errorMessages: any = [];
  successMessage: any = '';
  countryBudget: any = null;
  totalCountryBudget: any = null;
  monthlyAmounts: any = null;
  countries: any = [];
  years: any = [];
  loading: boolean = false;
  public form: any = {
    year: '',
    country_id: '',
    countryObject: null,
    currency: 'SGD',
    monthly_amounts: []
  };

  constructor (
    private route: ActivatedRoute,
    private headerService: HeaderService,
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.headerService.setupHeader([
      {
        title: 'Settings',
      },
      {
        title: 'Country Budget',
        link: '/settings/country-budget',
      },
      {
        title: 'View Country Budget',
        link: `/settings/country-budget/${this.id}`,
      },
      {
        title: 'Edit Country Budget',
      },
    ]);
  }

  ngOnInit() {
    this.getCountryBudget();
  }

  getCountryBudget() {
    axios.get(`${environment.api_url}/settings/country-budgets/${this.id}`, {
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
    },
    })
    .then((response) => {
      if (response.data.error) {
        this.errorMessages = response.data.error_message;
        return;
      }

      this.countryBudget = response.data.country_budget;
      this.form.year = response.data.country_budget.year;
      this.form.country_id = response.data.country_budget.country_id;
      this.form.countryObject = response.data.country_budget.country;
      this.form.currency = response.data.country_budget.currency;
      this.form.monthly_amounts = response.data.country_budget.monthly_amounts;

      this.totalCountryBudget = response.data.country_budget.total_budget;
      this.monthlyAmounts = response.data.country_budget.monthly_amounts;

      this.generateYearsList();
    })
    .catch((error) => {
      this.errorMessages = error.response.data.error_message;
    });
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

  getMonthName(month: number): string {
    return moment().month(month - 1).format('MMMM');
  }

  onYearSelect(event: any): void {
    this.form.year = event;
    this.onYearChange();
  }

  onYearChange(): void {
    this.monthlyAmounts = [];
    for (let month = 1; month <= 12; month++) {
      this.monthlyAmounts.push({
        month: month,
        budget_amount_formatted: 0
      });
    }
    this.form.monthly_amounts = this.monthlyAmounts;
  }

  saveCountryBudget(): void {
    this.errorMessages = [];
    this.successMessage = '';
    this.loading = true;

    this.form.year = this.form.year.toString();
    this.form.country_id = this.form.country_id.toString();
    this.form.monthly_amounts = this.monthlyAmounts;

    axios.put(`${environment.api_url}/settings/country-budgets/${this.id}`, this.form, {
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
      }
    })
    .then((response) => {
      if (response.data.error) {
        this.errorMessages = [response.data.error_message];
        window.scrollTo(0, 0);
        this.loading = false;
        this.clearMessages();
        return;
      }

      this.successMessage = response.data.message;
      setTimeout(() => {
          this.successMessage = '';
          this.loading = false;
      }, 3500);
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
    
  clearMessages() {
    setTimeout(() => {
      this.successMessage = '';
    }, 3500);
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

        if (component.form.year) {
          yearSelectize.setValue(component.form.year, true);
        }

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

        if (component.form.country_id) {
          countrySelectize.addOption(component.form.countryObject, true);
          countrySelectize.setValue(component.form.country_id, true);
        }
    });
  }
}
