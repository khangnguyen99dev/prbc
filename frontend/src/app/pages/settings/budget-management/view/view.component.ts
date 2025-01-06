import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PermissionService } from 'src/app/services/permission.service';
import * as moment from 'moment';
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
  public monthlyAmounts: any[] = [];
  public budget: any = null;

  public totalBudget: number = 0;
  public form: any = {
    id: '',
    year: '',
    entity_id: '',
    currency: 'SGD',
    monthly_amounts: []
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    public permissionService: PermissionService
  ) {
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
      },
    ]);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.modelId = params['id'];
      this.getBudget();
    });
    this.route.queryParams.subscribe((queryParams: any) => {
        if (queryParams['success_message']) {
            window.scrollTo(0, 0);
            this.successMessage = "Entity budget created successfully";
            this.clearMessages();
        }
    });
  }

  getBudget() {
    this.loading = true;
    axios.get(`${environment.api_url}/settings/budgets/${this.modelId}`, {
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
      this.totalBudget = response.data.budget.total_budget;
      this.monthlyAmounts = response.data.budget.monthly_amounts;
    })
    .catch((error) => {
      this.errorMessages = error.response.data.error_message;
    })
    .finally(() => {
      this.loading = false;
    });
  }

  getMonthName(month: number): string {
    return moment().month(month - 1).format('MMMM');
  }

  clearMessages() {
    setTimeout(() => {
        this.successMessage = '';
    }, 3500);
  }
}
