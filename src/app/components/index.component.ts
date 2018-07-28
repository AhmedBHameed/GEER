import { Component, OnInit } from '@angular/core';

// Services
import { AuthService, HttpService, SharedDataService, NotificationsService} from '../_services';

// Graphql queries
import { gqlSettings } from '../_gql_queries';
import { pluck } from 'rxjs/operators';

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
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  reqIsComplete: boolean = false;

  settingsLoaded: boolean = false;

  constructor(
    private auth: AuthService,
    private http: HttpService,
    private sharedData: SharedDataService,
    private notify: NotificationsService    
  ) { }

  ngOnInit() {
    // Apollo programm section.
    // this.apollo.init().watchQuery<any>({query: getSettings}).valueChanges.subscribe(({data}) => {
    //     this.footerHeaderData = data.getSettings;
    //     this.reqIsComplete = true;
    //   }
    // );

    this.sharedData.isAdmin = false;
    let geertoken = this.auth.getCashedOf('geertoken');
    if (geertoken) {
      this.auth.checkToken().subscribe(
        (res: any) => {
          if (!res.ack.ok) return;
          this.sharedData.isAdmin = true;
        },
        (err: any) => {
          console.log(err);
          this.notify.message(err, true);
        }
      );
    } else {
      this.sharedData.isAdmin = false;
    }
    // Grap all settings if not exists.
    if (!this.sharedData.settings) {
      this.http.post(gqlSettings).subscribe(
        (res: any) => {
          this.sharedData.settings = res.getSettings;
          this.settingsLoaded = true;
        },
        (err: any) => {
          this.notify.message(err, true);
        }
      );
    } else {
      this.settingsLoaded = true;
    }
  }

  doNavbarAction(action: string) {
    if (action == 'logout') this.auth.logout();
  }
  checkCradentials(): boolean {
    let geertoken = this.auth.getCashedOf('geertoken');
    if (typeof geertoken != 'string') return false;
    return (geertoken.split('.').length === 3) ? true : false; 
  }
}
