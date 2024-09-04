import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QueryParamService {
  constructor(private route: ActivatedRoute) {}

  getPayId(): string {
    return this.route.snapshot.queryParamMap.get('pay_id') || '';
  }
}
