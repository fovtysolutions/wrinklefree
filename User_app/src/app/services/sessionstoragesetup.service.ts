import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private myPayKeySubject = new BehaviorSubject<boolean>(false);  // Observable to track the key's state

  constructor() {
    this.checkMyPayKey(); // Check the key when the service is initialized
  }

  // Getter for observable
  get myPayKey$() {
    return this.myPayKeySubject.asObservable();
  }

  // Check localStorage for the key at regular intervals
  private checkMyPayKey() {
    interval(1000).subscribe(() => {
      const key = localStorage.getItem('mypay'); // Change to localStorage
      if (key && !this.myPayKeySubject.value) {
        this.myPayKeySubject.next(true); // Update observable if key is found
      }
    });
  }
}
