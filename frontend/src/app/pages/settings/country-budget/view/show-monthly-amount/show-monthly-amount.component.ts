import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PermissionService } from 'src/app/services/permission.service';
import * as moment from 'moment';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-show-monthly-amount',
  templateUrl: './show-monthly-amount.component.html',
  styleUrls: ['./show-monthly-amount.component.scss']
})
export class ShowMonthlyAmountComponent {
  @Input() modelId: any = null;
  @Input() itemId: any = null;

  public errorMessages: string[] = [];
  public loading = false;
  public successMessage: string = '';
  public monthlyBudget: any = null;

  public plannedPurchaseRequests: any = [];
  public actualPurchaseRequests: any = [];
  public recurringOperationalCosts: any = [];
  public entityBudgetMonths: any = [];

  public countryBudget: any = null;
  public plannedPurchaseRequestsPagination: any = null;
  public actualPurchaseRequestsPagination: any = null;
  public recurringOperationalCostsPagination: any = null;
  public entityBudgetMonthsPagination: any = null;

  public plannedPurchaseRequestsPage = 1;  
  public actualPurchaseRequestsPage = 1;
  public recurringOperationalCostsPage = 1;
  public entityBudgetMonthsPage = 1;

  public perPage = 10;
  public totalItemPlannedPurchaseRequests = 0;
  public totalItemActualPurchaseRequests = 0;
  public totalItemRecurringOperationalCosts = 0;
  public totalItemEntityBudgetMonths = 0;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.modelId = params['id'];
      this.itemId = params['itemId'];
      this.getMonthlyBudget();
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
          link: `/settings/country-budget/${this.modelId}`,
        },
        {
          title: 'Show Monthly Amount',
        },
      ]);
    });
  }

  getMonthlyBudget() {
    this.loading = true;
    axios.get(`${environment.api_url}/settings/country-budgets/${this.modelId}/${this.itemId}?planned=${this.plannedPurchaseRequestsPage}&actual=${this.actualPurchaseRequestsPage}&recurring=${this.recurringOperationalCostsPage}&entity=${this.entityBudgetMonthsPage}`, {
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
      },
    })
      .then(response => {
        if (response.data.error) {
          this.errorMessages = response.data.error_message;
          return;
        }

        this.monthlyBudget = response.data.monthly;
        this.countryBudget = response.data.countryBudget;
        
        this.plannedPurchaseRequests = response.data.plannedPurchaseRequests.data;
        this.actualPurchaseRequests = response.data.actualPurchaseRequests.data;
        this.recurringOperationalCosts = response.data.recurringOperationalCosts.data;
        this.entityBudgetMonths = response.data.entityBudgetMonths.data;

        this.totalItemPlannedPurchaseRequests = response.data.plannedPurchaseRequests.total;
        this.totalItemActualPurchaseRequests = response.data.actualPurchaseRequests.total;
        this.totalItemRecurringOperationalCosts = response.data.recurringOperationalCosts.total;
        this.totalItemEntityBudgetMonths = response.data.entityBudgetMonths.total;

      })
      .finally(() => this.loading = false);
  }

  selectedPage(page: any, type: string) {
    if (type == 'plannedPurchaseRequests') {
      this.plannedPurchaseRequestsPage = page;
    } else if (type == 'actualPurchaseRequests') {
      this.actualPurchaseRequestsPage = page;
    } else if (type == 'recurringOperationalCosts') {
      this.recurringOperationalCostsPage = page;
    } else if (type == 'entityBudgetMonths') {
      this.entityBudgetMonthsPage = page;
    }
    this.getMonthlyBudget();
  }
}
