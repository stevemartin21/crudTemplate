//  An interceptor will basically take every req and add something to it
// just need to understand how it all works
// injected the serive and a couple of angualr items
/// set intercept the http req and then grab the token and add it to it
//  this will give access to some of the user information to display different pages and infomration
//  Basically the steps are grab token and set the header to include the toekn and the call the next handle functions



import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CreateDataService } from '../services/create-data.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private createDataService: CreateDataService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Made it to the interceptor');
    const requestToken = this.createDataService.getToken();

    const sentRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + requestToken)
    });

    return next.handle(sentRequest);
  }
}

// d
