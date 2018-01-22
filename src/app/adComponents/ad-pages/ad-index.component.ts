import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { FunctionsService } from '../../_services/_functions/functions.service';
import { AuthService } from '../../_services/auth.service';
import { GlobalService } from '../../_services/global.service';
import { RequestsService } from '../../_services/requests.service';
// import { Observable } from 'rxjs/Rx';

declare var $: any;
@Component({
  selector: 'app-ad-index',
  templateUrl: './ad-index.component.html',
  styleUrls: ['./ad-index.component.css'],
  providers: [ AuthService, RequestsService ]
})
export class AdIndexComponent implements OnInit {
  GqlQuery_checkToken: any;
  GqlQuery_Settings: any = {
    query: `
      {
        getSettings{
          id,
          title,
          meta_name,
          meta_description,
          logo,
          slide_category_id,
          slide_post_num,
          session_time,
          banner_img,
          facebook,
          googleplus,
          youtube,
          twitter,
        }
      }
  `};
  navbar_links: any;
  isThatAdmin   : boolean = false;
  STO           : string;
  constructor(
    private req: RequestsService,
    private funs: FunctionsService,
    private auth: AuthService,
    private router: Router,
    public gs: GlobalService
  ) { }

  ngOnInit() {
    this.gs.backendUrl = this.funs.url;
          // <li><a [routerLink]="['', 'admin']"><i class="fa fa-tachometer" aria-hidden="true"></i> Control Panel</a></li>
          // <li><a [routerLink]="['', 'admin', 'settings']"><i class="fa fa-cogs" aria-hidden="true"></i> Settings</a></li>
          // <li><a [routerLink]="['', 'admin', 'categories']"><i class="fa fa-list-alt" aria-hidden="true"></i> Categories</a></li>
          // <li><a [routerLink]="['', 'admin', 'addartical']"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Add artical</a></li>
          // <li><a [routerLink]="['', 'admin', 'allarticals']"><i class="fa fa-newspaper-o" aria-hidden="true"></i> Articals</a></li>
          
          // <li><a href=""><i class="fa fa-users" aria-hidden="true"></i> Mumbers</a></li>
          // <li><a href=""><i class="fa fa-comments-o" aria-hidden="true"></i> Commants</a></li>
          // <li><a href=""><i class="fa fa-star" aria-hidden="true"></i> Personal Profile</a></li>
          // <li class="dropdown"><a href="#"><span class="triangle"><i class="fa fa-cog" aria-hidden="true"></i> Settings</span></a></li>
          // <ul class="menu-list">
          //   <li><a [routerLink]="['','login']"><i class="fa fa-sign-out" aria-hidden="true"></i> Log out</a></li>
          // </ul>
      this.navbar_links = [
        {routerLink: ',admin', fontawesome: 'fa fa-tachometer', caption: 'Control Panel'},
        {routerLink: ',admin,settings', fontawesome: 'fa fa-cogs', caption: 'Settings'},
        {routerLink: ',admin,categories', fontawesome: 'fa fa-list-alt', caption: 'Categories'},
        {routerLink: ',admin,addartical', fontawesome: 'fa fa-pencil-square-o', caption: 'Add artical'},
        {routerLink: ',admin,allarticals', fontawesome: 'fa fa-newspaper-o', caption: 'Articals'},
      ];
      if (!this.isAdmin()) {
          this.returnToHome();
          return false;
      }
      this.req.post(this.GqlQuery_checkToken).subscribe(res => {
              let respond = res.json();
              if (respond.errors) {
                  this.funs.notify({
                      type: 'danger',
                      icon: 'fa fa-exclamation-triangle',
                      title: 'Request Error!!',
                      message: respond.errors[0].message
                  });
                  this.returnToHome();
                  return;
              } else if (respond.data.checkToken.isActive) {
                  this.isThatAdmin = true;
                  this.gs.username = respond.data.checkToken.username;
              } else {
                this.returnToHome();
              }
              this.funs.notify({
                  type: 'success',
                  icon: 'fa fa-flag',
                  title: 'Login Status',
                  message: respond.data.checkToken.ack.message
              });
          },
          err => {

      });
      if (!this.gs.settings) {
        this.req.post(this.GqlQuery_Settings).subscribe(
          data => {
            let respond = data.json();
            if ( this.funs.hasError(respond) ) {
              return;
            }
            this.gs.settings = respond.data.getSettings;
            this.gs.adminNavbarActive = true;
          },
          err => {
            this.funs.showErrorNote(err.errors[0]);
          });
      } else {
        this.gs.adminNavbarActive = true;
      }
  }

  isAdmin(): boolean {
      const token = this.auth.getCashedOf('geertoken');
      if (!token) {
          return false;
      }
      this.GqlQuery_checkToken = {
        query: `
          {
            checkToken(jwt: "${token}"){
              isActive,
              username,
              ack {
                ok
                message
              }
            }
          }
        `};
      return true;
  }
  logout(word: string) {
    console.log(word);
    if(word == 'logout') this.auth.logout();
  }

  returnToHome() {
    this.router.navigate(['']);
  }
}
