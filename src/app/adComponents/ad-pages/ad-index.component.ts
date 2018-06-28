import { Injector, Component, OnInit } from '@angular/core';

// Base service
import { BaseApis } from '../../_services/base-apis';

// import { Observable } from 'rxjs/Rx';

declare var $: any;
@Component({
   selector: 'app-ad-index',
   templateUrl: './ad-index.component.html',
   styleUrls: ['./ad-index.component.css']
})
export class AdIndexComponent extends BaseApis implements OnInit {
   // To check if user with authorization is logged in
   isThatAdmin: boolean = false;
   
   navbar_links: any;
   STO: string;

   constructor(protected injector: Injector) {
      super(injector);
   }

   ngOnInit() {
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
         { routerLink: ',admin', fontawesome: 'fa fa-tachometer', caption: 'Control Panel' },
         { routerLink: ',admin,settings', fontawesome: 'fa fa-cogs', caption: 'Settings' },
         { routerLink: ',admin,categories', fontawesome: 'fa fa-list-alt', caption: 'Categories' },
         { routerLink: ',admin,artical,add', fontawesome: 'fa fa-pencil-square-o', caption: 'Add/Update artical' },
         { routerLink: ',admin,allarticals,1', fontawesome: 'fa fa-newspaper-o', caption: 'Articals' },
      ];

      this.authService.checkToken().subscribe(
         (res: any) => {
            res = res.json();
            if (this.httpService.hasError(res)) {
               this.notiService.message(res);
               this.authService.redirectTo(['login']);
               return false;
            }
            if (res.data.checkToken.isActive) {
               this.isThatAdmin = this.sharedData.isAdmin = true;
               this.sharedData.userData.username = res.data.checkToken.username;
               this.sharedData.userData.id = res.data.checkToken.id;
            } else {
               this.authService.redirectTo(['/']);
            }
            this.notiService.message(res.data.checkToken.ack.message);
         },
         (err: any) => {
            console.error(err.errors[0].message);
         });
   }
   doNavbarAction(action: string) {
      if (action == 'logout') this.authService.logout();
   }
}
