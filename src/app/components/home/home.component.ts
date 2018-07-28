import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { GqlQueryInterface, GraphtyService } from 'graphty';

// Services
import { HttpService, NotificationsService } from '../../_services';

// Environments
import { environment } from '../../../environments/environment';


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
      private graphty: GraphtyService,
      private http: HttpService) { }

   ngOnInit() {
      this.title.setTitle(this.router.snapshot.data['title']);
      let gqlArticals: GqlQueryInterface = this.graphty.stagnation({
         fun: {
            name: 'getArticals',
            args: { limit: 15 }
         },
         ret: ['id', 'title', 'artical', 'category', 'category_name', 'image', 'author', 'author_name', 'status', 'date', 'rows']
      });

      this.http.post(gqlArticals).subscribe(
         (res: any) => {
            this.newArticals = res.getArticals;
            this.isDataLoaded = true;
         },
         (err: any) => {
            this.notify.message(err, true);
         });
   }

}
