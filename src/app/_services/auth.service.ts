import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionsService } from './_functions/functions.service';
// import { Observable } from 'rxjs/Rx';
// import 'rxjs/Rx';
// import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
  public tokenLoop: any;
  constructor(private fn: FunctionsService, private router: Router) {
  }

  cash(key: string, data: any, isPermanent: boolean = false){
    if (isPermanent) {
      window.localStorage.setItem( key , data );
    } else {
      window.sessionStorage.setItem( key , data );
    }
  }
  clearCash() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
  getCashedOf(key: string): any {
    return window.localStorage.getItem(key) || window.sessionStorage.getItem(key);
  }

  login(token: string, checkbox= false): void {
    this.cash('geertoken', token, checkbox);
  }
  // clear token remove user from local storage to log user out
  logout(): void {
    this.clearCash();
    this.router.navigate(['', 'login']);
  }
  //=========================== Sign in Page ========================
  signIn(data: any) {
    // let header = new Headers({"Content-Type": "application/x-www-form-urlencoded"}); // this is like ajax request;
    return this.fn.makeRequest('signin', 'Post', data);
  }

  // refreshToken(){
  //   this.tokenLoop = setInterval(() => {
  //     this.renewToken();
  //   }, 10000);
  // }

  // renewToken(){
  //   if(this.checkCradentials()){
  //     console.log('hi');
  //     let token = window.localStorage.getItem('token');
  //     let head = new Headers({ 'Accept': 'application/json' });
  //     head.append("Authorization", JSON.stringify({"token": token }));
  //     //this.http.post('http://10.0.0.200/PHP/cms/test/_functions/renew_token.php','', {headers: head}).subscribe(
  //     this.http.post('http://localhost:8888/PHP/angular2Backend/_functions/renew_token.php','', {headers: head}).subscribe(
  //       (res) => {
  //         if(typeof res.json().error == 'string' && res.json().error != '') {
  //           clearInterval(this.tokenLoop);
  //           window.localStorage.setItem('error', res.json().error);
  //           this.error.errorMsg = localStorage.getItem('error');
  //           this.router.navigate(['login']);
  //         }else{
  //           localStorage.removeItem('error');
  //           this.error.errorMsg = null;
  //         }
  //         window.localStorage.setItem('token', res.json().token);
  //       });
  //   }
  // }

}
