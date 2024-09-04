import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';

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
  constructor(
    public util: UtilService,
    public api: ApiService
  ) {
    this.getWallet();
  }

  ngOnInit() {
  }

  toggleInput() {
    this.showInput = !this.showInput;  // Toggle the input field visibility
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

  addAmount() {
    this.dummy = Array(10);
  
    const requestData = {
      id: localStorage.getItem('uid'),
      amount: this.amount  
    };
  
    this.api.post_private('v1/profile/addAmount', requestData).then((data: any) => {
      console.log(data);
      this.dummy = [];
      if (data && data.status && data.status == 200 && data.data) {
        this.balance = data.data.balance;
        this.list = data.transactions;
        this.list.forEach(element => {
          element.created_at = moment(element.created_at).format('LL');
        })
        this.showInput = false;
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

}
