import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SnakebarservicesService } from '../services/snakebarservices.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { GlobalConstant } from '../shared/global-constant';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    public router: Router,
    private snakeBarService: SnakebarservicesService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let expectedRoleArray = route.data;

    expectedRoleArray = expectedRoleArray.expectedRole;
    const token: any = localStorage.getItem('token');

    let tokenPayload: any;

    try {
      tokenPayload = jwt_decode(token);
    } catch (error) {
      localStorage.clear();
      this.router.navigate(['/']);
    }

    let checkRole = false;

    for (let index = 0; index < expectedRoleArray.length; index++) {
      if (expectedRoleArray[index] == tokenPayload.role) {
        checkRole = true;
      }
    }

    if (tokenPayload.role === 'user' || tokenPayload.role === 'admin') {
      if (this.auth.isAuthenticated() && checkRole) {
        return true;
      }
      this.snakeBarService.openSnakeBar(GlobalConstant.unauthorized, '');
      this.router.navigate(['/cafe/dashboard']);
      return false;
    } else {
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }
}
