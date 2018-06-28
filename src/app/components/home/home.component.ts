import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Services
import { HttpService, NotificationsService } from '../../_services';

// Environments
import { environment } from '../../../environments/environment';

// Grqphql queries
import { gqlArticals } from '../../_gql_queries';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   headTitle = 'New Posts';
   isDataLoaded: boolean = false;
   newArticals: Array<any>;
   backendUrl: string = environment.backendUrl;
   defaultImg: string = './assets/img/no-image-available.jpg';

   constructor(
      private title: Title,
      private router: ActivatedRoute,
      private notify: NotificationsService,
      private http: HttpService) { }

   ngOnInit() {
      this.title.setTitle(this.router.snapshot.data['title']);
      this.http.post(gqlArticals).subscribe(
         (res: any) => {
            res = res.json();
            if (this.http.hasError(res)) {
               this.notify.message(res);
               return false;
            }
            this.newArticals = res.data.getArticals;
            this.isDataLoaded = true;
         },
         (err: any) => {
            console.error(err.json().errors[0].message);
      });
   }

}
