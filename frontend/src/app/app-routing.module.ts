import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes as settingsRoutes } from './pages/settings/setting.routes';
import { AuthGuard } from './guards/auth.guard';
import { routes as workspaceRoutes } from './pages/workspace/workspace.routes';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'my-profile',
        loadChildren: () => import('./pages/my-profile/my-profile.module').then(m => m.MyProfileModule),
        canActivate: [AuthGuard],
        data: {
            layout: 'app',
        }
    },
    {
        path: 'sign-in',
        loadChildren: () => import('./component/authentication/sign-in/sign-in.module').then(m => m.SignInModule),
        data: {
            layout: 'sign-in'
        },
    },
    {
        path: 'wedding-online/view',
        loadChildren: () => import('./pages/workspace/wedding-online/template1/template1.module').then(m => m.Template1Module),
        data: {
            layout: 'wedding-online',
        }
    },

    //  Settings 
    ...settingsRoutes,
    ...workspaceRoutes,

    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/sign-in'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
