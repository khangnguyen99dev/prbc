import { Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

export const routes: Routes = [
    {
        path: 'purchase-requests',
        loadChildren: () => import('./purchase-request/purchase-request.module').then(m => m.PurchaseRequestModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'purchase-requests/create',
        loadChildren: () => import('./purchase-request/create/create.module').then(m => m.CreateModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'purchase-requests/:id',
        loadChildren: () => import('./purchase-request/view/view.module').then(m => m.ViewModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'wedding-online',
        loadChildren: () => import('./wedding-online/wedding-online.module').then(m => m.WeddingOnlineModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'wedding-online/create',
        loadChildren: () => import('./wedding-online/create/create.module').then(m => m.CreateModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'wedding-online/:id',
        loadChildren: () => import('./wedding-online/view/view.module').then(m => m.ViewModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    }

];

