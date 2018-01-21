import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormsService, ValidatorsService } from '../../_services/_functions/forms';

import { FunctionsService } from '../../_services/_functions/functions.service';
import { RequestsService } from '../../_services/requests.service';
import { AuthService } from '../../_services/auth.service';
import { GlobalService } from '../../_services/global.service';

declare var $: any;
declare var CryptoJS: any;
@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css'],
  providers: [ AuthService, FormsService, RequestsService ]
})
export class LogginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  loading: boolean= false;
  GqlQuery: any;
  constructor(
    public gs: GlobalService,
    public funs: FunctionsService,
    private req: RequestsService,
    private fs: FormsService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.auth.getCashedOf('geertoken')) {
        this.router.navigate(['']);
        return;
    }
    this.auth.clearCash();
    this.loginForm = this.fs.group([
        {key: 'username', defaultValue: '', validators: [ValidatorsService.required()] },
        {key: 'password', defaultValue: '', validators: [ValidatorsService.required()] },
        {key: 'checkbox', defaultValue: false }
    ]);
    
  }

  loggin(data: any, isValid: boolean) {
      this.submitted = true;
      if (isValid) {
          this.GqlQuery = {
                query: `
              {
                getToken(username:"${data.username}",password:"${ CryptoJS.SHA256(data.password).toString() }"){
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
          this.req.post(this.GqlQuery).subscribe(
            res => {
                const respond = res.json();
                this.loading  = this.submitted = false;
                if ( this.funs.hasError(respond) ) {
                  return;
                }
                this.categories.push(respond.data.addCategory);
                this.funs.showSuccessNote('New category successfully added');
              },
              err => {
                this.funs.showErrorNote(err.json().errors[0]);
            });
              res => {
                  
                  let respond = res.json();
                  if (respond.errors) {
                      this.funs.notify({
                          type: 'danger',
                          icon: 'fa fa-exclamation-triangle',
                          title: 'Request Error!!',
                          message: respond.errors[0].message
                      });
                      return;
                  } else if (respond.data.getToken.ack.ok) {
                    this.submitted = true;
                    this.gs.username = respond.data.getToken.username;
                    this.auth.login(respond.data.getToken.jwt, data.checkbox);
                    this.funs.delay(() => {
                        this.router.navigate(['']);
                    }, 2500);
                  }
                  this.funs.notify({
                      type: 'success',
                      icon: 'fa fa-flag',
                      title: 'Login Status',
                      message: respond.data.getToken.ack.message
                  });
              },
              err => {
                  this.funs.notify({
                      type: 'danger',
                      icon: 'fa fa-exclamation-triangle',
                      title: 'Login Status',
                      message: err
                  });
              }
          );
      }
  }

}
