import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PurchaseRequestApproveService {
    private purchaseRequestApproveSubject = new BehaviorSubject<any>(null);
    public purchaseRequestApprove$ = this.purchaseRequestApproveSubject.asObservable();

    async fetchPurchaseRequestApprove() {
        const token = window.localStorage.getItem(environment.api_token_identifier);
        if (!token) {
            return;
        }
        try {
            const res = await axios.get(`${environment.api_url}/work-space/purchase-requests/purchase-request-approve`, {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            const data = res.data;
            if (data.error) {
                console.error('Error:', data.error);
                return;
            }

            const purchaseRequestApprove = data?.purchase_request_approve || [];
            this.purchaseRequestApproveSubject.next(purchaseRequestApprove);
        } catch (error) {
            console.error('Error fetching purchase request approve:', error);
        }
    }
} 