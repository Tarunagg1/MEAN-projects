import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstant } from '../shared/global-constant';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpclient: HttpClient) {}

  addProduct(data: any) {
    return this.httpclient.post(`${GlobalConstant.APIURL}/product/add`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  updateProduct(data: any) {
    return this.httpclient.patch(
      `${GlobalConstant.APIURL}/product/update`,
      data,
      {
        headers: new HttpHeaders().set('Content-T3ype', 'application/json'),
      }
    );
  }

  getProduct() {
    return this.httpclient.get(`${GlobalConstant.APIURL}/product/get`);
  }

  deleteProduct(id: any) {
    return this.httpclient.delete(
      `${GlobalConstant.APIURL}/product/delete/${id}`
    );
  }
}
