import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageSubject = new Subject<any>();
  storage$ = this.storageSubject.asObservable();

  constructor(private ngZone: NgZone) {
    // Listen for storage changes
    window.addEventListener('storage', this.onStorageChange.bind(this));
  }

  private onStorageChange(event: StorageEvent) {
    // Ensure that changes are picked up by Angular's change detection
    this.ngZone.run(() => {
      this.storageSubject.next({
        key: event.key,
        oldValue: event.oldValue,
        newValue: event.newValue,
        url: event.url
      });
    });
  } 

  // Method to get item from localStorage
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Method to set item in localStorage
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  // Method to remove item from localStorage
  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
