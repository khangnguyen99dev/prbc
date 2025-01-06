import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { HeaderService } from 'src/app/services/header.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-manager',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.scss']
})
export class ManagerComponent {

    public modelId: number = 0;
    public user: any = {};
    public currentTab: string = 'user_details';

    constructor(
        private router: Router,
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
                title: 'User Management',
                link: '/settings/master-data/user-management',
            },
            {
                title: 'Manager User',
            },
        ]);
    }

    public form: any = {
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    };

    ngOnInit() {
        this.modelId = this.route.snapshot.params['id'];
        this.route.queryParams.subscribe(params => {
            this.currentTab = params['tab'] ?? 'user_details';
        });
    }
}
