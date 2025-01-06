import { Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

export const routes: Routes = [
    {
        path: 'settings/master-data/user-management',
        loadChildren: () => import('./master-data/user-management/user-management.module').then(m => m.UserManagementModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/master-data/user-management/create',
        loadChildren: () => import('./master-data/user-management/create/create.module').then(m => m.CreateModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/master-data/user-management/:id',
        loadChildren: () => import('./master-data/user-management/manager/manager.module').then(m => m.ManagerModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/master-data/region-management',
        loadChildren: () => import('./master-data/region-management/region-management.module').then(m => m.RegionManagementModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/master-data/region-management/create',
        loadChildren: () => import('./master-data/region-management/create/create.module').then(m => m.CreateModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/master-data/region-management/:id',
        loadChildren: () => import('./master-data/region-management/edit/edit.module').then(m => m.EditModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/master-data/country-management',
        loadChildren: () => import('./master-data/country-management/country-management.module').then(m => m.CountryManagementModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/master-data/country-management/create',
        loadChildren: () => import('./master-data/country-management/create/create.module').then(m => m.CreateModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/master-data/country-management/:id',
        loadChildren: () => import('./master-data/country-management/edit/edit.module').then(m => m.EditModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/master-data/entity-management',
        loadChildren: () => import('./master-data/entity-management/entity-management.module').then(m => m.EntityManagementModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/master-data/entity-management/create',
        loadChildren: () => import('./master-data/entity-management/create/create.module').then(m => m.CreateModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/master-data/entity-management/:id',
        loadChildren: () => import('./master-data/entity-management/edit/edit.module').then(m => m.EditModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'notifications',
        loadChildren: () => import('../notification/notification.module').then(m => m.NotificationModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/budget-management',
        loadChildren: () => import('./budget-management/budget-management.module').then(m => m.BudgetManagementModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/budget-management/create',
        loadChildren: () => import('./budget-management/create/create.module').then(m => m.CreateModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/budget-management/:id',
        loadChildren: () => import('./budget-management/view/view.module').then(m => m.ViewModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/budget-management/view/:id/:itemId',
        loadChildren: () => import('./budget-management/view/show-monthly-amount/show-monthly-amount.module').then(m => m.ShowMonthlyAmountModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/budget-management/edit/:id',
        loadChildren: () => import('./budget-management/edit/edit.module').then(m => m.EditModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },

    {
        path: 'settings/master-data/currency-management',
        loadChildren: () => import('./master-data/currency-management/currency-management.module').then(m => m.CurrencyManagementModule),
        data: {
            layout: 'app',
        },
        canActivate: [
            AuthGuard
        ]
    },

    {
        path: 'settings/master-data/currency-management/create',
        loadChildren: () => import('./master-data/currency-management/create/create.module').then(m => m.CreateModule),
        data: {
            layout: 'app',
        },
        canActivate: [
            AuthGuard
        ]
    },

    {
        path: 'settings/master-data/currency-management/:id',
        loadChildren: () => import('./master-data/currency-management/manager/manager.module').then(m => m.ManagerModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },

    {
        path: 'settings/recurring-operational-cost',
        loadChildren: () => import('./recurring-operational-cost/recurring-operational-cost.module').then(m => m.RecurringOperationalCostModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },

    {
        path: 'settings/recurring-operational-cost/create',
        loadChildren: () => import('./recurring-operational-cost/create/create.module').then(m => m.CreateModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },

    {
        path: 'settings/recurring-operational-cost/:id',
        loadChildren: () => import('./recurring-operational-cost/manager/manager.module').then(m => m.ManagerModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/country-budget',
        loadChildren: () => import('./country-budget/country-budget.module').then(m => m.CountryBudgetModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/country-budget/create',
        loadChildren: () => import('./country-budget/create/create.module').then(m => m.CreateModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/country-budget/:id',
        loadChildren: () => import('./country-budget/view/view.module').then(m => m.ViewModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/country-budget/edit/:id',
        loadChildren: () => import('./country-budget/edit/edit.module').then(m => m.EditModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/country-budget/view/:id/:itemId',
        loadChildren: () => import('./country-budget/view/show-monthly-amount/show-monthly-amount.module').then(m => m.ShowMonthlyAmountModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/bonus-pool',
        loadChildren: () => import('./bonus-pool/bonus-pool.module').then(m => m.BonusPoolModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/bonus-pool/create',
        loadChildren: () => import('./bonus-pool/create/create.module').then(m => m.CreateModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'settings/bonus-pool/:id',
        loadChildren: () => import('./bonus-pool/view/view.module').then(m => m.ViewModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    }
];
