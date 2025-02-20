import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'selectize';

@Component({
  selector: 'app-generate-qr-code',
  templateUrl: './generate-qr-code.component.html',
  styleUrls: ['./generate-qr-code.component.scss']
})

export class GenerateQrCodeComponent {

  constructor(private router: Router) {}

  errorMessages: string[] = [];
  successMessage: string = '';
  loading: boolean = false;

  bankList : any[] = [];
  selectedBank = '';
  accountNumber = '';
  amount = 0;
  description = '';
  accountName = 'kaneservice';

  qrCode = '';


  generateQrCode() {
    this.clearMessages();
    this.loading = true;
    this.qrCode = '';

    if (!this.selectedBank || !this.amount || !this.accountNumber) {
      this.errorMessages.push('Vui lòng chọn ngân hàng, nhập số tiền và số tài khoản');
      this.loading = false;
      window.scrollTo(0, 0);
      return;
    }

    if (this.amount < 10000) {
      this.errorMessages.push('Giá trị tối thiểu là 10,000 VND');
      window.scrollTo(0, 0);
      this.loading = false;
      return;
    }

    const payload = {
      "accountNo": this.accountNumber,
      "accountName": this.accountName,
      "acqId": this.selectedBank,
      "amount": this.amount,
      "addInfo": this.description,
      "format": "text",
      "template": "compact"
    }

    axios.post(`https://api.vietqr.io/v2/generate`, payload)
    .then(response => {
        if (response.data.desc && response.data.code != '00') {
            this.errorMessages.push(response.data.desc);
            window.scrollTo(0, 0);
            return;
        }else{
          this.qrCode = response.data.data.qrDataURL;
        }
        this.loading = false;
    })
    .catch(error => {
        console.error(error);
        if (error.response.status == 422) {
            Object.keys(error.response.data.errors).forEach(key => {
                this.errorMessages.push(error.response.data.errors[key]);
            });
        } else {
            this.errorMessages.push('Sorry, something went wrong. Please try again later.');
        }
        window.scrollTo(0, 0);
        this.loading = false;
        this.clearMessages();
    });
  }

  clearMessages() {
    this.errorMessages = [];
    this.successMessage = '';
  }

  getBankList() {
    axios.get('https://api.vietqr.io/v2/banks')
    .then(response => {
      this.bankList = response.data.data ?? [];
    })
    .catch(error => {
      console.error(error);
    });
  }

  async ngOnInit() {
    await this.getBankList();

    this.setupSelectize();
  }

  downloadQrCode() {
    const a = document.createElement('a');
    a.href = this.qrCode;
    a.download = 'qr-code.png';
    a.click();

    this.qrCode = '';
  }

  setupSelectize() {
    const component = this;
    $(function() {
      const bankEl: any = $('#bank');
      const bankSelectize = bankEl.selectize({
          preload: true,
          valueField: 'bin',
          searchField: 'shortName',
          labelField: 'shortName',
          load: (query: any, callback: any) => {
            $.ajax({
                url: `https://api.vietqr.io/v2/banks`,
                type: 'GET',
                error: function () {
                    callback();
                },
                success: (res: any) => {
                    callback(res?.data);
                },
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`,
                    'Content-Type': 'application/json',
                }
            });
          }, 
          onChange: (value: any) => {
            component.selectedBank = value;
          }
        })[0].selectize;
    });
  }
}
