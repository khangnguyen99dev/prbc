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
  public entities: any[] = [];
  public loading = false;

  constructor(
    private headerService: HeaderService,
    private router: Router,
    public permissionService: PermissionService,
    private notificationService: NotificationService
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
        title: 'New Bonus Pool',
      },
    ]);
  }

  public form: any = {
    name: '',
    code: '',
    currency: '',
    total_bonus: '',
    minimum_management_bonus: '',
    description: '',
  };

  createBonusPool(): void {
    this.errorMessages = [];
    this.successMessage = '';
    this.loading = true;

    this.form.currency = $("#currency_selectize").val();

    axios.post(`${environment.api_url}/settings/bonus-pools`, this.form, {
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
            this.router.navigateByUrl('/settings/bonus-pool/' + response.data.bonus_pool.id + '?success_message=true');
        }
      })
      .catch(error => {
        this.errorMessages = error.response.data.errors;
        this.loading = false;
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
                    },
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                        'Content-Type': 'application/json',
                    }
                });
            },
        })[0].selectize;
    });
  }

  ngOnInit(): void {
    this.getEntities();
    this.setupSelectize();
  }
}
