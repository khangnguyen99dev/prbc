import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';

@Component({
    selector: 'app-manager',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.scss']
})
export class ManagerComponent {

    public modelId: number = 0;
    public currentTab: string = 'currency_details';

    constructor(
        private headerService: HeaderService,
        private route: ActivatedRoute
    ) {
        this.headerService.setupHeader([
            {
                title: 'Settings',
            },
            {
                title: 'Master Data',
            },
            {
                title: 'Currency Management',
                link: '/settings/master-data/currency-management',
            },
            {
                title: 'Manager Currency',
            },
        ]);
    }


    ngOnInit() {
        this.modelId = this.route.snapshot.params['id'];
        this.route.queryParams.subscribe(params => {
            this.currentTab = params['tab'] ?? 'currency_details';
        });
    }
}
