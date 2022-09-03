import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstant } from '../shared/global-constant';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private httpclient: HttpClient) {}

  getProduct() {
    return this.httpclient.get(`${GlobalConstant.APIURL}/product/get`);
  }

  deleteProduct(id: any) {
    return this.httpclient.delete(
      `${GlobalConstant.APIURL}/product/delete/${id}`
    );
  }

  getProductById(id: any) {
    return this.httpclient.get(`${GlobalConstant.APIURL}/category/${id}`);
  }

  getById(id: any) {
    return this.httpclient.get(`${GlobalConstant.APIURL}/getById/${id}`);
  }
}
