import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Methods": "GET,POST",
    "Access-Control-Allow-Headers": "Content-type",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  //public user:Subject<string> = new BehaviorSubject<string>("");
  public user: string = "";
  public baseURL: string = "http://192.168.0.34:8889/";
  public token: any;
  public tokenTimer: any;
  public isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
    let token = localStorage.getItem('token');
    if(token){
      let payload = this.parseJwt(token);
      this.user = payload.email;
      this.authStatusListener.next(true);
      this.isAuthenticated = true;
      const now = new Date();
      const expirationDate = new Date(payload.exp * 1000);
      const expiresInDuration = Math.abs(expirationDate.getTime() - now.getTime()) / 1000;
      this.setAuthTimer(expiresInDuration);
      this.saveAuthData(token, expirationDate);
    }
  }

  getUser() {
    return this.user;
  }

  connect(data: string, reponse: any) {
    this.token = reponse.token;
    this.user = data;
    this.authStatusListener.next(true);
    this.isAuthenticated = true;
    const expiresInDuration = reponse.expiresIn;
    this.setAuthTimer(expiresInDuration);
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
    this.saveAuthData(reponse.token, expirationDate);
  }

  disconnect() {
    this.token = null;
    this.isAuthenticated = false;
    this.user = "";
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  verificationConnexion(identifiants: any): Observable<any> {
    return this.http.post(this.baseURL + 'membre/connexion', JSON.stringify(identifiants), httpOptions);
  }

  register(identifiants: any): Observable<any> {
    return this.http.post(this.baseURL + 'membre/inscription', JSON.stringify(identifiants), httpOptions);
  }

  autoAuthUser() {
    const authInfos = this.getAuthData();
    if (!authInfos) { return; }
    const now = new Date();
    const expiresIn = authInfos.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInfos.token;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn / 1000);
      //this.user.next(this.user);
    }
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');

    if (!token || !expirationDate) {
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.disconnect();
    }, duration * 1000);
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  parseJwt(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };
}
