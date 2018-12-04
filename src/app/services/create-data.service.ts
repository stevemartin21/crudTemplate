import { Injectable } from '@angular/core';


import { User } from '../models/user.model';
import { Workout } from '../models/workout.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateDataService {

  private verifyStatusListener = new Subject<boolean>();
  private token: String;
  private isVerified = false;
  tokenTimer: any;
  userId: String;



  constructor( private http: HttpClient, private router: Router) { }

  createUser( name: String, email: String, password: String) {

    console.log('Create Data Service');

    const userData: User = { name: name, email: email, password: password};

    console.log(userData);

    this.http
    .post('http://localhost:3000/create/user', userData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/dashboard']);
        console.log('The User was created');
      });
}

getToken() {
  console.log(this.token);
  return this.token;
}

getVerified() {
  return this.isVerified;
}

getVerifyStatusListener() {
  return this.verifyStatusListener.asObservable();
}

onLogOut() {
  console.log('token was destroyed');
  this.token = null;
  this.isVerified = false;
  this.verifyStatusListener.next(false);
  this.router.navigate(['/']);
  clearTimeout(this.tokenTimer);
  this.clearVerificationData();
  this.userId = null;
 }

 autoAuthenticateUser() {
  const verificationInformation  = this.getVerificationData();

  if ( !verificationInformation) {
    return;

  }
  const now = new Date();
  const expiresIn = verificationInformation.expirationDate.getTime() - now.getTime();
  if (expiresIn > 0) {
    this.token = verificationInformation.token;
    this.isVerified = true;
    this.verifyStatusListener.next(true);
    this.setVerificationTimer(expiresIn / 1000);
  }
 }


getVerificationData () {
  const token = localStorage.getItem('token');
  const expirationDate = localStorage.getItem('expiration');
  if (!token || !expirationDate) {
    return;
  }
  return {
    token: token,
    expirationDate: new Date(expirationDate)
  };
}

saveVerificationData( token: string, expirationDate: Date) {
 localStorage.setItem('token', token );
 localStorage.setItem('expiration', expirationDate.toISOString() );
}

clearVerificationData() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
}

setVerificationTimer(duration: number, ) {
this.tokenTimer =  setTimeout( ( ) => {
  this.onLogOut();
}, duration * 10000 );
}



createToken(email: String, password: String) {

  const userData = { email: email, password: password};

  console.log(userData);

  this.http
  .post<{token: string, expiresIn: number, userId: string}>('http://localhost:3000/create/token', userData)
    .subscribe(response => {
      console.log(response);
      console.log(response.token);
      const token = response.token;
      this.token = token;

      this.userId = response.userId;
      console.log(this.userId);
      if (token) {
      const tokenDuration = response.expiresIn;
         this.setVerificationTimer(tokenDuration);
        console.log(tokenDuration);
      const now = new Date();
      const expirationDate = new Date (now.getTime() + tokenDuration * 1000);
       this.saveVerificationData(token, expirationDate );
      this.isVerified = true;
      this.verifyStatusListener.next(true);
      this.router.navigate(['dashboard']);
      console.log('The Token was created');
    }
    });
}

  createWorkOut(_id: null, title: String, description: String, workOutArea: String, accessory: String, duration: String) {

    const workOutData: Workout = {_id: _id,  title: title, description: description,
      workOutArea: workOutArea, accessory: accessory, duration: duration};

    console.log(workOutData);

    this.http
    .post('http://localhost:3000/create/workOut', workOutData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/dashboard']);
        console.log('The User was created');
      });
  }
}
