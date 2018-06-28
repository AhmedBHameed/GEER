import { Component, OnInit } from '@angular/core';
import * as sha from 'sha.js';
import { FormGroup } from '@angular/forms';

// Services
import { AuthService, NotificationsService, HttpService, SharedDataService } from '../../_services';
import { FormsService, ValidatorsService } from '../../_services/_functions/forms';

declare var $: any;
@Component({
   selector: 'app-loggin',
   templateUrl: './loggin.component.html',
   styleUrls: ['./loggin.component.css'],
   providers: [FormsService]
})
export class LogginComponent implements OnInit {
   showLogin: boolean = false;
   loginForm: FormGroup;
   submitted: boolean = false;
   loading: boolean = false;
   GqlQuery: any;
   constructor(
      private fs: FormsService,
      private auth: AuthService,
      private http: HttpService,
      private notify: NotificationsService,
      private sharedData: SharedDataService
   ) { }

   ngOnInit() {
      if (this.auth.getCashedOf('geertoken')) {
         this.auth.redirectTo(['/']);
         return;
      }
      this.showLogin = true;
      this.auth.clearCash();
      this.loginForm = this.fs.group([
         { key: 'username', defaultValue: '', validators: [ValidatorsService.required()] },
         { key: 'password', defaultValue: '', validators: [ValidatorsService.required()] },
         { key: 'checkbox', defaultValue: false }
      ]);
   }

   loggin(data: any, isValid: boolean) {
      this.submitted = true;
      if (isValid) {
         this.GqlQuery = {
            query: `
              {
                getToken(username:"${data.username}",password:"${sha('sha256').update(data.password).digest('hex')}"){
                  jwt
                  ack {
                    ok
                    message
                  }
                }
              }
            `
         };
         this.loading = true;
         this.http.post(this.GqlQuery).subscribe(
            (res: any) => {
               res = res.json();
               this.loading = this.submitted = false;
               if (this.http.hasError(res)) {
                  this.notify.message(res);
                  return false;
               }
               if (res.data.getToken.ack.ok) {
                  this.submitted = true;
                  this.auth.login(res.data.getToken.jwt, data.checkbox);
                  this.notify.message(res.data.getToken.ack.message);
                  this.sharedData.isAdmin = true;
                  setTimeout(() => {
                     this.auth.redirectTo(['/']);
                  }, 2500);
               } else {
                  this.notify.message(res.data.getToken.ack.message, true);
               }
            },
            (err: any) => {
               console.error(err);
            });
      }
   }

}
