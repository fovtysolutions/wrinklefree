import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone-icon',
  templateUrl: './phone-icon.component.html',
  styleUrls: ['./phone-icon.component.scss'],
})
export class PhoneIconComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  callPhoneNumber() {
    // Perform any logic before making the call
    console.log('Calling phone number...');
    
    setTimeout(() => {
    console.log('Hello Radhe...');
    window.location.href = 'tel:9999667986';
    }, 1000);
  }

}
