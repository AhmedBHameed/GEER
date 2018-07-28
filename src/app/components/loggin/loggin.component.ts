import { Component, OnInit } from '@angular/core';
import * as sha from 'sha.js';
import { FormGroup } from '@angular/forms';
import { GraphtyService, GqlQueryInterface } from 'graphty';
import { pluck } from 'rxjs/operators';

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
      // GqlQuery: any;
      constructor(
            private fs: FormsService,
            private auth: AuthService,
            private http: HttpService,
            private graf: GraphtyService,
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
                  const getToken: GqlQueryInterface = this.graf.stagnation({
                        fun: {
                              name: 'getToken',
                              args: { username: data.username, password: sha('sha256').update(data.password).digest('hex') }
                        },
                        ret: ['jwt', this.graf.stagnation({
                              fun: {
                                    name: 'ack'
                              },
                              ret: ['ok', 'message']
                        })
                        ]
                  });
                  this.loading = true;
                  this.http.post(getToken).pipe(pluck('getToken')).subscribe(
                        (res: any) => {
                              this.loading = this.submitted = false;
                              if (res.ack.ok) {
                                    this.submitted = true;
                                    this.auth.login(res.jwt, data.checkbox);
                                    this.notify.message(res.ack.message);
                                    this.sharedData.isAdmin = true;
                                    setTimeout(() => {
                                          this.auth.redirectTo(['/']);
                                    }, 2500);
                              } else {
                                    this.notify.message(res.ack.message, true);
                              }
                        },
                        (err: any) => {
                              this.notify.message(err, true);
                        });
            }
      }

}
