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
  public user:Subject<string> = new BehaviorSubject<string>("")
  public cast = this.user.asObservable();
  public baseURL: string = "http://localhost:8889/";
  public token: any;
  public tokenTimer: any;
  public isAuthenticated:Subject<boolean> = new BehaviorSubject<boolean>(false);
  public cast2 = this.isAuthenticated.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    let token = localStorage.getItem('token');
    if(token){
      let payload = this.parseJwt(token);
      this.user.next(payload.email);
      this.isAuthenticated.next(true);
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
    this.user.next(data);
    this.isAuthenticated.next(true);
    const expiresInDuration = reponse.expiresIn;
    this.setAuthTimer(expiresInDuration);
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
    this.saveAuthData(reponse.token, expirationDate);
  }

  disconnect() {
    this.token = null;
    this.user.next("");
    this.isAuthenticated.next(false);
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
      this.isAuthenticated.next(true);
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

  parseJwt(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };
}
