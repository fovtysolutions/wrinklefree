import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService  } from 'src/app/services/sessionstoragesetup.service';
import * as moment from 'moment';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  dummy: any[] = [];
  list: any[] = [];
  balance: any = 0;
  amount: number;
  showInput: boolean = false; 
  payId: string;
  constructor(
    public util: UtilService,
    private iab: InAppBrowser,
    private route: ActivatedRoute,
    public api: ApiService,
    private LocalStorageService: LocalStorageService
  ) {
    this.getWallet();
    this.checkAndVerifyPayId();
  }

  ngOnInit() {
    this.LocalStorageService.myPayKey$.subscribe(isMyPayKeySet => {
      if (isMyPayKeySet) {
        this.onMyPayKeySet(); // Function ko call karenge
      }
    });
  }

  onMyPayKeySet() {
    const myPayValue = localStorage.getItem('mypay'); 
    // console.log('mypay key is set in sessionStorage');
    console.log('mypay value:', myPayValue);
    if (myPayValue) {
      this.verifyPurchaseRazorPay(myPayValue);
    } else {
      if (myPayValue) {
        this.verifyPurchaseRazorPay(myPayValue);
      }
    }
  }

  toggleInput() {
    this.showInput = !this.showInput;  // Toggle the input field visibility
  }

  checkAndVerifyPayId(): void {
    this.payId = this.route.snapshot.queryParamMap.get('pay_id') || '';
    if (this.payId) {
      this.verifyPurchaseRazorPay(this.payId);
    } else {
      this.payId = this.route.snapshot.queryParamMap.get('key_id') || '';
      if (this.payId) {
        this.verifyPurchaseRazorPay(this.payId);
      }
    }
  }

  getWallet() {
    this.dummy = Array(10);
    this.api.post_private('v1/profile/getMyWallet', { id: localStorage.getItem('uid') }).then((data: any) => {
      console.log(data);
      this.dummy = [];
      if (data && data.status && data.status == 200 && data.data) {
        this.balance = data.data.balance;
        // console.log("Radhe",this.balance = data.data);
        this.list = data.transactions;
        this.list.forEach(element => {
          element.created_at = moment(element.created_at).format('LL');
        })
      }
    }, error => {
      console.log(error);
      this.dummy = [];
      this.util.apiErrorHandler(error);
    }).catch(error => {
      console.log(error);
      this.dummy = [];
      this.util.apiErrorHandler(error);
    });
  }

  addAmount(walletAmount: any) {
    this.dummy = Array(10);
  
    const requestData = {
      id: localStorage.getItem('uid'),
      amount: walletAmount 
    };
  
    this.api.post_private('v1/profile/addAmount', requestData).then((data: any) => {
      console.log(data);
      this.dummy = [];
      if (data && data.status && data.status == 200 && data.data) {
        // this.balance = data.data.balance;
        // this.list = data.transactions;
        // this.list.forEach(element => {
        //   element.created_at = moment(element.created_at).format('LL');
        // })
        // this.showInput = false;
        this.getWallet();
      }
    }, error => {
      console.log(error);
      this.dummy = [];
      this.util.apiErrorHandler(error);
    }).catch(error => {
      console.log(error);
      this.dummy = [];
      this.util.apiErrorHandler(error);
    });
  }

  getName() {
    return this.util.userInfo && this.util.userInfo.first_name ? this.util.userInfo.first_name + ' ' + this.util.userInfo.last_name : 'Washing WALA';
  }

  getEmail() {
    return this.util.userInfo && this.util.userInfo.email ? this.util.userInfo.email : 'info@wrinkle-free.co.in';
  }
  async payWithRazorPay() {
    const options: InAppBrowserOptions = {
      location: 'no',
      clearcache: 'yes',
      zoom: 'yes',
      toolbar: 'yes',
      closebuttoncaption: 'close'
    };
    const param = {
      amount: this.amount  ? (this.amount  * 100).toFixed() : 5,
      email: this.getEmail(),
      logo: this.util && this.util.appLogo ? this.api.mediaURL + this.util.appLogo : 'null',
      name: this.getName(),
      app_color: this.util && this.util.app_color ? this.util.app_color : '#f47878',
      walleturl: 'wallet'
    }
    console.log('opended');
    const windowRef = window.open(
      this.api.baseUrl + 'v1/payments/razorPay?' + this.api.JSON_to_URLEncoded(param),
      'paymentWindow', 
      'width=800,height=600'
    );
    window.location.reload();
    console.log('browser=> end');
  }

  verifyPurchaseRazorPay(paymentId: any) {
    localStorage.removeItem('mypay');
    this.util.show();
    this.api.get_private('v1/payments/VerifyRazorPurchase?id=' + paymentId).then((data: any) => {
      console.log(data);
      if (data && data.status && data.status == 200 && data.success && data.success.status && data.success.status == 'captured') {
        this.util.hide();
        console.log(data.success);
        this.addAmount(data.success.amount/100);
      } else {
        this.util.hide();
        this.util.errorToast(this.util.translate('Something went wrong while payments. please contact administrator'));
      }
    }, error => {
      console.log(error);
      this.util.hide();
      this.util.errorToast(this.util.translate('Something went wrong while payments. please contact administrator'));
    }).catch(error => {
      console.log(error);
      this.util.hide();
      this.util.errorToast(this.util.translate('Something went wrong while payments. please contact administrator'));
    });
  }

}
