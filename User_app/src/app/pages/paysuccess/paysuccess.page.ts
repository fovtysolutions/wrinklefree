import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paysuccess',
  templateUrl: './paysuccess.page.html',
  styleUrls: ['./paysuccess.page.scss'],
})
export class paysuccessPage implements OnInit {

  message: string | null = null;
  payId: string;

  constructor(private localStorageService: LocalStorageService,private route: ActivatedRoute,) { this.checkAndVerifyPayId(); }

  checkAndVerifyPayId(): void {
    this.payId = this.route.snapshot.queryParamMap.get('pay_id') || '';
    if (this.payId) {
      this.updatePayid(this.payId);
    } else {
      this.payId = this.route.snapshot.queryParamMap.get('key_id') || '';
      if (this.payId) {
        this.updateKetid(this.payId);
      }
    }
  }

  ngOnInit() {
    // Get initial value from localStorage
    this.message = this.localStorageService.getItem('mypay');

    // Subscribe to localStorage changes
    this.localStorageService.storage$.subscribe((event) => {
      if (event.key === 'mypay') {
        this.message = event.newValue;
        console.log('Message updated from another tab:', this.message);
      }
    });
    setTimeout(() => {
      window.close();
    }, 5000);
  }

  // Method to update localStorage
  updatePayid(payId: string) {
    this.localStorageService.setItem('mypay', payId);
  }

  updateKetid(keyId: string) {
    this.localStorageService.setItem('mypay', keyId);
  }

}
