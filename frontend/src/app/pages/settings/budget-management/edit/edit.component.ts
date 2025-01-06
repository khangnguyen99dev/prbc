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
  budget: any = null;
  totalBudget: any = null;
  monthlyAmounts: any = null;
  entities: any = [];
  years: any = [];
  loading: boolean = false;
  public form: any = {
    year: '',
    entity_id: '',
    entityObject: null,
    currency: 'SGD',
    monthly_amounts: []
  };

  constructor (
    private headerService: HeaderService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.headerService.setupHeader([
      {
        title: 'Settings',
      },
      {
        title: 'Entity Budget',
        link: '/settings/budget-management',
      },
      {
        title: 'View Budget',
        link: '/settings/budget-management/' + this.id,
      },
      {
        title: 'Edit Budget',
      },
    ]);
  }

  ngOnInit() {
    this.getBudget();
  }

  getBudget() {
    axios.get(`${environment.api_url}/settings/budgets/${this.id}`, {
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

      this.budget = response.data.budget;
      this.form.year = response.data.budget.year;
      this.form.entity_id = response.data.budget.entity_id;
      this.form.entityObject = response.data.budget.entity;
      this.form.currency = response.data.budget.currency;
      this.form.monthly_amounts = response.data.budget.monthly_amounts;

      this.totalBudget = response.data.budget.total_budget;
      this.monthlyAmounts = response.data.budget.monthly_amounts;

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

  saveBudget(): void {
    this.errorMessages = [];
    this.successMessage = '';
    this.loading = true;

    this.form.year = this.form.year.toString();
    this.form.entity_id = this.form.entity_id.toString();
    this.form.monthly_amounts = this.monthlyAmounts;

    axios.put(`${environment.api_url}/settings/budgets/${this.id}`, this.form, {
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

        ($("#entity_selectize") as any).selectize()[0].selectize.destroy();

        const entityEl: any = $('#entity_selectize');
        const entitySelectize = entityEl.selectize({
          preload: true,
          valueField: 'id',
          searchField: 'label',
          labelField: 'label',
          load: (query: any, callback: any) => {
            $('#fetching_entity').show();
            $.ajax({
              url: `${environment.api_url}/settings/entities?search_selectize=${query}`,
              type: 'GET',
              error: function () {
                  callback();
                  $("#fetching_entity").hide();
              },
              success: (res: any) => {
                  callback(res?.entities?.data);
                  // this.items = res?.data?.items?.data;
                  $("#fetching_entity").hide();
              },
              headers: {
                  Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                  'Content-Type': 'application/json',
              }
            });
          },
          onChange: (value: any) => {
            component.form.entity_id = value ? value : '';
          }
        })[0].selectize;

        if (component.form.entity_id) {
          entitySelectize.addOption(component.form.entityObject, true);
          entitySelectize.setValue(component.form.entity_id, true);
        }
    });
  }
}
