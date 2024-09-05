import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private myPayKeySubject = new BehaviorSubject<boolean>(false);  // Observable banate hain

  constructor() {
    this.checkMyPayKey(); // Service ke shuru hote hi check karenge
  }

  // Observable ko access karne ke liye getter
  get myPayKey$() {
    return this.myPayKeySubject.asObservable();
  }

  // SetInterval ke zariye check karenge har 1 second me
  checkMyPayKey() {
    interval(1000).subscribe(() => {
      const key = sessionStorage.getItem('mypay');
      if (key && !this.myPayKeySubject.value) {
        this.myPayKeySubject.next(true); // Agar key set ho gayi, to observable ko update karenge
      }
    });
  }
}
