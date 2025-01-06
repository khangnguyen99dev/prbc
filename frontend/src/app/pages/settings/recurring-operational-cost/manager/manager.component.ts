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
    public currentTab: string = 'details';

    constructor(
        private headerService: HeaderService,
        private route: ActivatedRoute
    ) {
        this.headerService.setupHeader([
            {
                title: 'Settings',
            },
            {
                title: 'Recurring Operational Cost',
                link: '/settings/recurring-operational-cost',
            },
            {
                title: 'Manager ROC',
            },
        ]);
    }


    ngOnInit() {
        this.modelId = this.route.snapshot.params['id'];
        this.route.queryParams.subscribe(params => {
            this.currentTab = params['tab'] ?? 'details';
        });
    }
}
