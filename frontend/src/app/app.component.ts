import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { PermissionService } from './services/permission.service';
import { environment } from '../environments/environment';

(window as any).appEnvironment = environment;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'frontend';
    layout = 'sign-in';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private permissionService: PermissionService
    ) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.route),
            map(route => {
                while (route.firstChild) route = route.firstChild
                return route
            }),
            mergeMap(route => route.data)
        ).subscribe((data: any) => {
            this.layout = data['layout'];
            this.permissionService.getPermissions();
        });
    }
}
