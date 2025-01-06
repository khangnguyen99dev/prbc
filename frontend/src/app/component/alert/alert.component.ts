import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
    @Input() errorMessages: string[] = [];
    @Input() successMessage: string = '';
    showErrors: boolean = false;

    toggleErrors() {
        this.showErrors = !this.showErrors;
    }
}
