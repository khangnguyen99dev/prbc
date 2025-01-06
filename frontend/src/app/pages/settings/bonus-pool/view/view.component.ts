import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PermissionService } from 'src/app/services/permission.service';
import * as moment from 'moment';
import { FormatterService } from 'src/app/services/formatter.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  @Input() modelId: any = null;

  public errorMessages: string[] = [];
  public loading = false;
  public successMessage: string = '';
  public bonusPool: any = null;
  public entities: any[] = [];
  public items: any[] = [];
  public histories: any[] = [];
  public isDisabled = false;

  public form: any = {
    id: null,
    name: '',
    code: '',
    currency: '',
    total_bonus: '',
    minimum_management_bonus: '',
    description: '',
    status: ''
  };

  constructor(
    private headerService: HeaderService,
    private router: Router,
    private route: ActivatedRoute,
    public permissionService: PermissionService,
    public formatterService: FormatterService
  ) {
    this.headerService.setupHeader([
      {
        title: 'Settings',
      },
      {
        title: 'Bonus Pool',
        link: '/settings/bonus-pool',
      },
      {
        title: 'View Bonus Pool',
      },
    ]);
  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.modelId = params['id'];
      await this.getBonusPool();
      await this.getEntities();
      this.setupSelectize();
    });

    this.route.queryParams.subscribe((queryParams: any) => {
        if (queryParams['success_message']) {
            window.scrollTo(0, 0);
            this.successMessage = "Bonus Pool created successfully";
            this.clearMessages();
        }
    });
  }

  getEntities(): void {
    axios.get(`${environment.api_url}/settings/entities`, {
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
      }
    })
      .then(response => {
        this.entities = response.data.entities.data;
      })
      .catch(error => {
        this.errorMessages = error.response.data.errors;
        this.loading = false;
      });
  }

  getBonusPool() {
    this.loading = true;
    axios.get(`${environment.api_url}/settings/bonus-pools/${this.modelId}`, {
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

      this.bonusPool = response.data.bonus_pool;
      this.form.entity_id = this.bonusPool.entity_id;
      this.form.name = this.bonusPool.name;
      this.form.code = this.bonusPool.code;
      this.form.currency = this.bonusPool.currency;
      this.form.total_bonus = this.formatterService.formatMoney(this.bonusPool.total_bonus_in_doc, 2, '.', '');
      this.form.minimum_management_bonus = this.formatterService.formatMoney(this.bonusPool.minimum_management_bonus_in_doc, 2, '.', '');
      this.form.remaining_bonus_in_doc = this.formatterService.formatMoney(this.bonusPool.remaining_bonus_in_doc, 2, '.', '');
      this.form.description = this.bonusPool.description;
      this.form.status = this.bonusPool.status;

      this.histories = this.bonusPool.histories;

      this.items = this.bonusPool.items;

      this.items.forEach((item: any, index: number) => {
        item.amount = this.formatterService.formatMoney(item.bonus_amount_in_doc, 2, '.', '');
        this.setupUserSelectize(index, item);
      });

      if (this.items.length > 0 || !this.permissionService.hasPermission('Settings - Bonus Pool - Can Create Bonus Pool')) {
        this.isDisabled = true;
      }
    })
    .catch((error) => {
      this.errorMessages = error.response.data.error_message;
    })
    .finally(() => {
      this.loading = false;
    });
  }

  setupSelectize() {
    const component = this;
    $(function() {
        ($("#currency_selectize") as any).selectize()[0].selectize.destroy();

        const currencyEl: any = $('#currency_selectize');
        const currencySelectize = currencyEl.selectize({
            preload: true,
            valueField: 'currency_code',
            searchField: 'label',
            labelField: 'label',
            load: (query: any, callback: any) => {
                $('#fetching_currency').show();
                $.ajax({
                    url: `${environment.api_url}/settings/currencies?search_selectize=${query}`,
                    type: 'GET',
                    error: function () {
                        callback();
                        $("#fetching_currency").hide();
                    },
                    success: (res: any) => {
                        callback(res?.currencies?.data);
                        $("#fetching_currency").hide();

                        // Set currency value after currencies are loaded
                        if (component.form.currency) {
                          currencySelectize.setValue(component.form.currency);
                        }
                    },
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                        'Content-Type': 'application/json',
                    }
                });
            },
        })[0].selectize;

        setTimeout(() => {
          if (component.isDisabled) {
            currencySelectize.disable();
          }
        }, 300);
    });
  }

  updateBonusBool() {
    this.loading = true;
    this.form.currency = $("#currency_selectize").val();
    axios.put(`${environment.api_url}/settings/bonus-pools/${this.modelId}`, this.form, {
          headers: {
              Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
          }
      })
      .then(response => {
          if (response.data.error) {
              this.errorMessages.push(response.data.error_message);
              window.scrollTo(0, 0);
              this.loading = false;
              return;
          }

          this.successMessage = response.data.message;
          window.scrollTo(0, 0);
          setTimeout(() => {  
              this.loading = false;
          }, 3500);
          this.getBonusPool();    
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
      });
  }

  addItem() {
    this.setupUserSelectize(this.items.length);
    this.items.push({
      user_id: null,
      employee_name: '',
      employee_number: '',
      date_of_birth: '',
      amount: '',
      description: '',
      status: 'Pending',
      status_color: 'warning'
    });
  }

  deleteItem(index: number, id: number) {
    this.items.splice(index, 1);
  } 

  saveItems() {
    this.loading = true;

    if (this.items.length == 0) {
      this.errorMessages.push('Please add at least one item');
      this.loading = false;
      return;
    }

    axios.post(`${environment.api_url}/settings/bonus-pools/${this.modelId}/items`, { items: this.items }, {
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
      }
    })
    .then(response => {
      if (response.data.error) {
        this.successMessage = '';
        this.errorMessages = [response.data.error_message];
        window.scrollTo(0, 0);
        this.loading = false;
      } else {
        this.errorMessages = [];
        this.successMessage = 'Bonus Pool saved successfully';
        this.loading = false;
        window.scrollTo(0, 0);
        this.getBonusPool();
      }
    })
    .catch(error => {
      this.errorMessages = error.response.data.errors;
      this.loading = false;
    });
  }

  setupUserSelectize(i: number, item: any = null) {
    const component = this;
    $(function() {
        ($(`#user_selectize_${i}`) as any).selectize()[0].selectize.destroy();

        const userEl: any = $(`#user_selectize_${i}`);
        const userSelectize = userEl.selectize({
            preload: true,
            valueField: 'id',
            searchField: 'label',
            labelField: 'label',
            load: (query: any, callback: any) => {
                $('#fetching_user').show();
                $.ajax({
                    url: `${environment.api_url}/settings/users?search_selectize=${query}&entity_id=${component.form.entity_id}`,
                    type: 'GET',
                    error: function () {
                        callback();
                        $("#fetching_user").hide();
                    },
                    success: (res: any) => {
                        callback(res?.users?.data);
                        $("#fetching_user").hide();

                        if (item) {
                          userSelectize.setValue(item.user_id);
                        }
                    },
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                        'Content-Type': 'application/json',
                    }
                });
            },
            onChange: (value: any) => {
              component.items[i].employee_name = userSelectize.options[value].name;
              component.items[i].employee_number = userSelectize.options[value].employee_number;
              component.items[i].date_of_birth = userSelectize.options[value].date_of_birth ? moment(userSelectize.options[value].date_of_birth).format('DD/MM/YYYY') : '';
              component.items[i].user_id = value;
            }
        })[0].selectize;
    });
  }

  approvalItem(action: string, item: any) {
    let message = '';
    if (action == 'approve') {
      message = 'Are you sure you want to approve this item?';
    } else {
      message = 'Are you sure you want to reject this item?';
    }

    if (confirm(message)) {
      this.loading = true;
      axios.post(`${environment.api_url}/settings/bonus-pools/${this.modelId}/items/${item.id}/approval`, { action: action, comment: item.comment }, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
        }
      })
      .then(response => {
        if (response.data.error) {
          this.errorMessages.push(response.data.error_message);
          window.scrollTo(0, 0);
          this.loading = false;
          return;
        }

        this.successMessage = response.data.message;  
        window.scrollTo(0, 0);
        setTimeout(() => {  
          this.loading = false;
        }, 3500);
        this.getBonusPool();
      })
      .catch(error => {
        this.errorMessages = error.response.data.errors;
        this.loading = false;
      });
    }
  }

  isPending(items: any) {
    return items.some((item: any) => item.status == 'Pending');
  }

  getTotalAmount() {
    const total = this.items.reduce((total: number, item: any) => {
      if (item.status != 'Rejected') {
        return total + (item.amount ? parseFloat(item.amount) : 0);
      }
      return total;
    }, 0);

    return this.formatterService.formatNumberCalculate(total);
  }

  clearMessages() {
    setTimeout(() => {
        this.successMessage = '';
    }, 3500);
  }
}
