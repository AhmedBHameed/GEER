import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as sha from 'sha.js';
import { FormGroup } from '@angular/forms';
import { FormsService, ValidatorsService } from '../../_services/_functions/forms';

import { FunctionsService } from '../../_services/_functions/functions.service';
import { RequestsService } from '../../_services/requests.service';
import { AuthService } from '../../_services/auth.service';
import { GlobalService } from '../../_services/global.service';

declare var $: any;
@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css'],
  providers: [ AuthService, FormsService, RequestsService ]
})
export class LogginComponent implements OnInit {
  showLogin: boolean = false;
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
    this.showLogin = true;
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
                getToken(username:"${data.username}",password:"${ sha('sha256').update(data.password).digest('hex') }"){
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
            if (respond.data.getToken.ack.ok) {
              this.submitted = true;
              this.gs.username = respond.data.getToken.username;
              this.auth.login(respond.data.getToken.jwt, data.checkbox);
              this.funs.delay(() => {
                  this.router.navigate(['']);
              }, 2500);
              this.funs.showSuccessNote(respond.data.getToken.ack.message);
            } else {
              this.funs.showErrorNote( respond.data.getToken.ack.message );  
            }
          },
          err => {
            this.funs.showErrorNote(err.json().errors[0]);
        });
      }
  }

}
