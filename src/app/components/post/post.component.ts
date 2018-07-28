import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GqlQueryInterface, GraphtyService } from 'graphty';

// Services
import { HttpService, NotificationsService } from '../../_services';

// Environments
import { environment } from '../../../environments/environment';


declare let Prism: any;
@Component({
   selector: 'app-post',
   templateUrl: './post.component.html',
   styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, AfterViewInit {
   backendUrl: string = environment.backendUrl;
   artical: any = {};
   defaultImg: string = './assets/img/no-image-available.jpg';
   highlighted: boolean = false;
   @ViewChild('articalBody') articalBody: ElementRef;


   constructor(
      private ar: ActivatedRoute,
      private http: HttpService,
      private graf: GraphtyService,
      private notify: NotificationsService) { }

   ngOnInit() {
      const gqlArtical: GqlQueryInterface = this.graf.stagnation({
         fun: {
            name: 'getArtical',
            args: { id: +this.ar.snapshot.params.id }
         },
         ret: ['title', 'artical', 'category_name', 'image', 'author_name', 'date']
      });

      this.http.post(gqlArtical).subscribe(
         (res: any) => {
            this.artical = res.getArtical;
         },
         (err: any) => {
            this.notify.message(err, true);
      });
   }

   ngAfterViewInit() {
      setTimeout( ()=> {
         Prism.highlightAll();
      }, 500);
   }
}
