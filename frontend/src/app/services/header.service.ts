import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    private headersSubject = new BehaviorSubject<any>(null);
    public headers$ = this.headersSubject.asObservable();

    async setupHeader(data: any) {
        const headers = data || [];
        this.headersSubject.next(headers);
    }
} 