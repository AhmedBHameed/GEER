import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { FunctionsService } from '../../../../../_services/_functions/functions.service';
// import { DataService } from '../../../../../_services/data.service';
import { switchMap } from 'rxjs/operators';

import { Title } from '@angular/platform-browser';
import { GqlQueryInterface, GraphtyService } from 'graphty';

// Services
import { HttpService, NotificationsService } from '../../_services';

// Environments
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-allcategories',
  templateUrl: './allcategories.component.html',
  styleUrls: ['./allcategories.component.css']
})
export class AllcategoriesComponent implements OnInit {
  url: any = environment.backendUrl;
  defaultImg: string = './assets/img/no-image-available.jpg';
  title: string;
  catArticals: any = [];
  msg: string = 'This category is empty!';
  constructor(
    private ar: ActivatedRoute,
    private notify: NotificationsService,
    private graf: GraphtyService,
    private http: HttpService
  ) { }

  ngOnInit() {
    // this.url = this.fn.url;
    this.ar.params.pipe(switchMap((args: string) => {
      return this.http.post(this.getCategoryByIdQuery(args));
    })).subscribe(
      (data: any) => {
        this.catArticals = data.getArticals;
        this.title = 'Category of ( ' + data.getCategories[0].category + ' )';
      },
      (err: any) => {
        this.notify.message(err, true);
    });
  }

  getCategoryByIdQuery(args: any): GqlQueryInterface {
    return this.graf.combine([
      this.graf.stagnation({
        fun: {
          name: 'getArticals',
          args: { page: 1, limit: 15, cat_id: +args.cat }
        },
        ret: ['id', 'title', 'artical', 'category', 'category_name', 'image', 'author', 'author_name', 'status', 'date', 'rows']
      }),
      this.graf.stagnation({
        fun: {
          name: 'getCategories',
          args: { cat_id: +args.cat }
        },
        ret: ['category']
      })
    ]);
  }

}
