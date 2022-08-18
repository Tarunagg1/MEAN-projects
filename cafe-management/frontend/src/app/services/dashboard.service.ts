import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstant } from '../shared/global-constant';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private httpclient: HttpClient) {}

  getDetails() {
    return this.httpclient.get(`${GlobalConstant.APIURL}/dashboard/details`);
  }
}
