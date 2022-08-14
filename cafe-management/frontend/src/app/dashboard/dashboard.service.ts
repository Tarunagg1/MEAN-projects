import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstant } from '../shared/global-constant';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient:HttpClient) { }
  
  
	getDetails(){
		return this.httpClient.get(`${GlobalConstant.APIURL}/dashboard/details`);
	}
}
