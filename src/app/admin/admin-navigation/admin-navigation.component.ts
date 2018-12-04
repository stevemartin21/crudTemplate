import { Component, OnInit } from '@angular/core';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { CreateDataService } from '../../services/create-data.service';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.scss']
})
export class AdminNavigationComponent implements OnInit {

  constructor( private createDataService: CreateDataService, private router: Router)  { }

  ngOnInit() {


  }

  logOut() {

    console.log('Logged out');

    this.createDataService.onLogOut();
  }



}
