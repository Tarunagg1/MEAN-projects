import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstant } from '../shared/global-constant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpclient: HttpClient) {}

  signUp(data: any) {
    return this.httpclient.post(`${GlobalConstant.APIURL}/user/signup`, data);
  }

  forgotPassword(data: any) {
    return this.httpclient.post(`${GlobalConstant.APIURL}/user/forgotpassword`, data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    });
  }

signIn(data: any) {
    return this.httpclient.post(`${GlobalConstant.APIURL}/user/signin`, data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    });
  }

  changePassword(data:any){
    return this.httpclient.post(`${GlobalConstant.APIURL}/user/changepassword`, data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    });
  }

}
