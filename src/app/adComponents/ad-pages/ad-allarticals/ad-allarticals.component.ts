import { Component, Injector, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { GqlQueryInterface, GraphtyService } from 'graphty';

// Services
import { BaseApis } from '../../../_services/base-apis';
import { FormsService, ValidatorsService } from '../../../_services/_functions/forms';

@Component({
   selector: 'app-ad-allarticals',
   templateUrl: './ad-allarticals.component.html',
   styleUrls: ['./ad-allarticals.component.css'],
   providers: [FormsService]
})
export class AdAllarticalsComponent extends BaseApis implements OnInit {
   isDataLoaded: boolean = false;

   articals: Array<any>;
   backendUrl: string = environment.backendUrl;
   defaultImg: string = './assets/img/no-image-available.jpg';
   // This is object for the pagenation module
   opt: any = {
      itemsPerPage: 2,
      currentPage: 1,
      totalItems: null,
   };

   constructor(
      protected injector: Injector,
      private fs: FormsService,
      private graf: GraphtyService,
      private ar: ActivatedRoute) {
      super(injector);
   }

   ngOnInit() {
      this.opt.currentPage = this.ar.snapshot.params.page ?
         this.ar.snapshot.params.page : 1;
      this.sharedData.updateArtical.articalObj = null;
      this.sharedData.updateArtical.onPage = null;
      this.api_getArticalsRows();
   }

   api_getArticalsRows() {
      let getArticalsAndArticalsRows: GqlQueryInterface = this.graf.combine([
         this.graf.stagnation({
            fun: {
               name: 'getArticalsRows'
            },
            ret: ['rows']
         }),
         this.graf.stagnation({
            fun: {
               name: 'getArticals',
               args: { page: +this.opt.currentPage, limit: this.opt.itemsPerPage }
            },
            ret: ['id', 'title', 'artical', 'category', 'category_name', 'image', 'author', 'author_name', 'status', 'date']
         })
      ]);
      this.httpService.post(getArticalsAndArticalsRows).subscribe(
         (res: any) => {
            this.opt.totalItems = res.getArticalsRows.rows;
            this.articals = res.getArticals;
            this.isDataLoaded = true;
         },
         (err: any) => {
            this.notiService.message(err.json().errors[0].message, true);
         }
      );
   }

   api_getArticals(page: number = this.opt.currentPage) {
      let getArticals: GqlQueryInterface = this.graf.stagnation({
         fun: {
            name: 'getArticals',
            args: { page: +page, limit: +this.opt.itemsPerPage }
         },
         ret: ['id', 'title', 'artical', 'category', 'category_name', 'image', 'author', 'author_name', 'status', 'date']
      });
      this.isDataLoaded = false;
      this.httpService.post(getArticals).subscribe(
         (res: any) => {
            this.articals = res.getArticals;
            this.isDataLoaded = true;
         },
         (err: any) => {
            this.notiService.message(err.json().errors[0].message, true);
         }
      );
   }

   private _api_changeArticalStatus(articalObj: any, index: number) {
      let status;
      (articalObj.status == 'published') ? status = 'dreft' : status = 'published';
      let updateArticalsStatus: GqlQueryInterface = this.graf.stagnation({
         fun: {
            name: 'updateArtical',
            args: { 
               title: articalObj.title,
               id: articalObj.id,
               status: status,
               artical: articalObj.post,
               category: articalObj.category,
               image: articalObj.image,
               author: articalObj.author,
               token: this.authService.getToken()
            }
         },
         ret: ['id', 'title', 'artical', 'category', 'category_name', 'image', 'author', 'author_name', 'status', 'date', 'ack{ok,message}']
      }); 
      this.httpService.post(updateArticalsStatus).subscribe(
         (res: any) => {
            this.notiService.message(res.updateArtical.ack.message);
            this.articals[index]['status'] = res.updateArtical.status;
         },
         (err: any) => {
            this.notiService.message(err.json().errors[0].message, true);
         }
      );
   }

   changeArticalStatus(e, articalObj: any, index: number) {
      this._api_changeArticalStatus(articalObj, index);
   }

   // On page navigation go to page
   goTo(page) {
      this.opt.currentPage = page;
      this.authService.redirectTo(['admin', 'allarticals', page]);
      this.api_getArticals(page);
   }

   editeArticalIndex(index: number) {
      this.sharedData.updateArtical.articalObj = this.articals[index];
      this.sharedData.updateArtical.onPage = this.opt.currentPage;
      this.authService.redirectTo(['admin', 'artical', 'update']);
   }

   deleteArticalIndex(index: number) {
      let deleteArtical: GqlQueryInterface = this.graf.stagnation({
         fun: {
            name: 'deleteArtical',
            args: {
               id: this.articals[index].id,
               token: this.authService.getToken()
            }
         },
         ret: ['ack{ok,message}']
      });
      
      this.httpService.post(deleteArtical).subscribe(
         (res: any) => {
            this.notiService.message(res.deleteArtical.ack.message);
            this.articals = this.fs.removeRow(this.articals, index);
            this.api_getArticalsRows();
         },
         (err: any) => {
            this.notiService.message(err.json().errors[0].message, true);
         }
      );
   }
}
