import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstant } from '../shared/global-constant';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpclient: HttpClient) {}

  add(data: any) {
    return this.httpclient.post(`${GlobalConstant.APIURL}/category/add`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  update(data: any) {
    return this.httpclient.patch(`${GlobalConstant.APIURL}/category/update`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }


  getCategory() {
    return this.httpclient.get(`${GlobalConstant.APIURL}/category/get`);
  }
}
