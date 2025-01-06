import { Component } from '@angular/core';
import { HeaderService } from '../../services/header.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    // Add your home page logic here
    constructor(
        private headerService: HeaderService
    ) {
        this.headerService.setupHeader([
            {
                title: 'Dashboards',
            },
        ]);
    }
}
