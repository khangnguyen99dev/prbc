import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { PermissionService } from '../../../services/permission.service';
import { PurchaseRequestApproveService } from 'src/app/services/purchase-request-approve.service';

@Component({
    selector: 'app-workspace-link',
    templateUrl: './workspace-link.component.html',
    styleUrls: ['./workspace-link.component.scss']
})
export class WorkspaceLinkComponent {
    private purchaseRequestApproveSubscription: Subscription;
    public purchaseRequestApprove: any;

    constructor(
        public permissionService: PermissionService,
        public purchaseRequestApproveService: PurchaseRequestApproveService
    ) {

        // Subscribe to user updates
        this.purchaseRequestApproveSubscription = this.purchaseRequestApproveService.purchaseRequestApprove$.subscribe(purchaseRequestApprove => {
            if (purchaseRequestApprove) {
                this.purchaseRequestApprove = purchaseRequestApprove;
            }
        });

        // Initial fetch
        this.purchaseRequestApproveService.fetchPurchaseRequestApprove();
    }

    countAll() {
        let count = 0;
        count += (this.purchaseRequestApprove?.length || 0);
        return count;
    }
}
