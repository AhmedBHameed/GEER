import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../_services/requests.service';
import { GlobalService } from '../../_services/global.service';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';

// import { ApolloClient } from '../../_client/client';
// import gql from 'graphql-tag';

// const getSettings = gql`{
//   getSettings{
//     id
//     title
//     metaName
//     metaDescreption
//     logo
//     slideCategory
//     slideCategoryPostNum
//     sessionTime
//     bannerImg
//     fb
//     gplus
//     youtube
//     twitter
//     ack{
//       ok
//       message
//     }
//   }
// }`;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [ RequestsService, AuthService ]
})
export class IndexComponent implements OnInit {
  reqIsComplete: boolean = false;
  GqlQuery: any = {query: `
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
        getCategories {
          id,
          category,
          date
        }
      }
  `};
  navbar_links: Array<any> = [];
  constructor(
    public gs: GlobalService,
    private req: RequestsService,
    private auth: AuthService,
    
  ) { }

  ngOnInit() {
    this.gs.backendUrl = environment.backendUrl;
    // this.apollo.init().watchQuery<any>({query: getSettings}).valueChanges.subscribe(({data}) => {
    //     this.footerHeaderData = data.getSettings;
    //     this.reqIsComplete = true;
    //   }
    // );
    this.req.get(this.GqlQuery).subscribe(
        data => {
            let respond = data.json().data;
            if (respond) {
                this.gs.settings = respond.getSettings;
                this.gs.categories = respond.getCategories;
                // tslint:disable-next-line:forin
                respond.getCategories.forEach(cat => {
                  this.navbar_links.push({routerLink: ',category,' + cat.id , caption: cat.category});
                });
                this.gs.adminNavbarActive = false;
                this.reqIsComplete = true;
            }
        },
        err => {
          console.log('error in index.component', err);
        });
  }
  logout(word: string) {
    if (word == 'logout') this.auth.logout();
    return false;
  }
  checkCradentials(): boolean {
    let geertoken = this.auth.getCashedOf('geertoken');
    if (typeof geertoken != 'string') return false;
    return (geertoken.split('.').length === 3) ? true : false; 
  }
}
