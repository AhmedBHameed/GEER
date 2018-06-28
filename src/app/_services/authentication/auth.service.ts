import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http/http.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private notify: NotificationsService, private http: HttpService, private router: Router) { }

  cash(key: string, data: any, isPermanent: boolean = false) {
    if (isPermanent) {
      window.localStorage.setItem(key, data);
    } else {
      window.sessionStorage.setItem(key, data);
    }
  }
  getCashedOf(key: string): any {
    return window.localStorage.getItem(key) || window.sessionStorage.getItem(key);
  }
  redirectTo(path: Array<string>): void {
    this.router.navigate(path);
  }
  getToken(): string {
    let token = this.getCashedOf('geertoken');
    if (token && typeof token == 'string' && token.split(".").length == 3) {
      return token;
    } else {
      this.notify.message('Invalid token', true);
      this.redirectTo(['login']);
    }
  }
  checkToken() {
    let gql_checkToken = {
      query: `
          {
            checkToken(jwt: "${this.getToken()}"){
              isActive,
              username,
              id,
              ack{
                ok,
                message
              }
            }
          }
      `};
    return this.http.post(gql_checkToken);
  }
  clearCash() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
  login(token: string, checkbox: boolean = false): void {
    this.cash('geertoken', token, checkbox);
  }
  logout(): void {
    this.clearCash();
    this.redirectTo(['', 'login']);
  }






  // isAuthUser(authType: string = 'user') {
  //   let cradentials = this.getToken(), type = window.localStorage.getItem('type') || window.sessionStorage.getItem('type');
  //   if(typeof cradentials == 'string' && type != authType){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }
  // isAdmin(): boolean {
  //   const token = this.getCashedOf('geertoken');
  //   if (!token) {
  //       return false;
  //   }
  //   this.GqlQuery_checkToken = {
  //     query: `
  //       {
  //         checkToken(jwt: "${token}"){
  //           isActive,
  //           username,
  //           id,
  //           ack {
  //             ok
  //             message
  //           }
  //         }
  //       }
  //     `};
  //   return true;
  // }
}
