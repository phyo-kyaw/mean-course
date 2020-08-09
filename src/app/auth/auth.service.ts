import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';

@Injectable({providedIn: 'root'})
export class AuthService{

  private token: string;
  private tokenTimer: NodeJS.Timer;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router){}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string){
    const authData: AuthData = {
      email: email,
      password: password
    };
    this.http.post("http://localhost:3000/api/user/signup", authData)
      .subscribe( response => {
        console.log(response);
      });

  }

  login(email: string, password: string){
    const authData: AuthData = {
      email: email,
      password: password
    };
    this.http.post<{token: string, expiresIn: number}>("http://localhost:3000/api/user/login", authData)
      .subscribe( response => {
        const token = response.token;
        this.token= token;
        if ( token ) {
          const expiresInDuration = response.expiresIn;
          this.tokenTimer = setTimeout( () => {
            this.logout();
          }, expiresInDuration * 1000 ) // in millisec
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate)
          this.router.navigate(['/']);
        }

      });

  }

  logout() {

    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

}
