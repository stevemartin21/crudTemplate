// This is basically a file to activate the routes and if it doesn't have it and returns
// the boolean false then it will redirect to teh login page

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateDataService } from './services/create-data.service';

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(private createDataService: CreateDataService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.createDataService.getVerified();
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }
}
