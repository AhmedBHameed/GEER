import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { HttpService, NotificationsService } from '../../_services';

// Environments
import { environment } from '../../../environments/environment';

@Component({
   selector: 'app-post',
   templateUrl: './post.component.html',
   styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
   backendUrl: string = environment.backendUrl;
   artical: any = {};
   defaultImg: string = './assets/img/no-image-available.jpg';

   constructor(private ar: ActivatedRoute, private http: HttpService, private notify: NotificationsService) { }

   ngOnInit() {
      const gqlArtical = {
         query:
         `
            {
               getArtical (id: ${this.ar.snapshot.params.id}) {
                  title,
                  artical,
                  category_name,
                  image,
                  author_name,
                  date
               }
            }
         `
      };
      this.http.post(gqlArtical).subscribe(
         (res: any) => {
            res = res.json();
            if (this.http.hasError(res)) {
               this.notify.message(res);
               return false;
            }
            this.artical = res.data.getArtical;
         },
         (err: any) => {
            console.error(err.json().errors[0].message);
      });
   }
}
