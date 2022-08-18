import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnakebarservicesService } from '../services/snakebarservices.service';
import { GlobalConstant } from '../shared/global-constant';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  ngAfterViewInit() {}
  data: any;
  responseMsg: any;

  constructor(
    private dashboardService: DashboardService,
    public router: Router,
    private snakeBarService: SnakebarservicesService
  ) {
    this.dashboardData();
  }

  dashboardData() {
    this.dashboardService.getDetails().subscribe(
      (response) => {
        this.data = response;

      },
      (error: any) => {
        if (error?.error?.message) {
          this.responseMsg = error?.error?.message;
        } else {
          this.responseMsg = GlobalConstant.genericError;
        }
        this.snakeBarService.openSnakeBar(this.responseMsg, 'error');
      }
    );
  }
}
