import { Component, Injector, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

// Services
import { BaseApis } from '../../../_services/base-apis';
import { FormsService, ValidatorsService } from '../../../_services/_functions/forms';
import { MultimediaService } from '../../../_services';

@Component({
   selector: 'app-ad-allarticals',
   templateUrl: './ad-allarticals.component.html',
   styleUrls: ['./ad-allarticals.component.css'],
   providers: [FormsService, MultimediaService]
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
      private multi: MultimediaService,
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
      const gqlGetArticalsAndArticalsRows = {
         query: `
            {
               getArticalsRows {
                  rows
               },
               getArticals(
                  page: ${this.opt.currentPage},
                  limit: ${this.opt.itemsPerPage}
               ) {
                  id,
                  title,
                  artical,
                  category,
                  category_name,
                  image,
                  author,
                  author_name,
                  status,
                  date
               }
            }
         `
      };
      this.httpService.post(gqlGetArticalsAndArticalsRows).subscribe(
         (res: any) => {
            res = res.json();
            if (this.httpService.hasError(res)) {
               this.notiService.message(res, true);
               return;
            }
            this.opt.totalItems = res.data.getArticalsRows.rows;
            this.articals = res.data.getArticals;
            this.isDataLoaded = true;
         },
         (err: any) => {
            console.error(err.json().errors[0].message);
         }
      );
   }
   api_getArticals(page: number = this.opt.currentPage) {
      const gqlGetArticals = {
         query: `
        {
          getArticals(
            page: ${page},
            limit: ${this.opt.itemsPerPage}
          ) {
            id,
            title,
            artical,
            category,
            category_name,
            image,
            author,
            author_name,
            status,
            date
          }
        }
    `};
      this.isDataLoaded = false;
      this.httpService.post(gqlGetArticals).subscribe(
         (res: any) => {
            res = res.json();
            if (this.httpService.hasError(res)) {
               this.notiService.message(res, true);
               return;
            }
            this.articals = res.data.getArticals;
            this.isDataLoaded = true;
         },
         (err: any) => {
            console.error(err.json().errors[0].message);
         }
      );
   }

   private _api_changeArticalStatus(articalObj: any, index: number) {
      let status;
      (articalObj.status == 'published') ? status = 'dreft' : status = 'published';

      const gqlUpdateArticalsStatus = {
         query: `
        mutation {
          updateArtical(
            title: "${articalObj.title}",
            id: ${articalObj.id},
            status: "${status}",
            artical: "${articalObj.post}",
            category: ${articalObj.category},
            image: "${articalObj.image}",
            author: ${articalObj.author},
            token: "${this.authService.getToken()}"
          ) {
            id,
            title,
            artical,
            category,
            image,
            author,
            author_name,
            status,
            date,
            ack {
              ok,
              message
            }
          }
        }
    `};
      this.httpService.post(gqlUpdateArticalsStatus).subscribe(
         (res: any) => {
            res = res.json();
            if (this.httpService.hasError(res)) {
               this.notiService.message(res, true);
               return;
            }
            this.notiService.message(res.data.updateArtical.ack.message);
            this.articals[index]['status'] = res.data.updateArtical.status;
         },
         (err: any) => {
            console.error(err.json().errors[0].message);
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
      let gqlDeleteArtical = {
         query: `
            mutation {
               deleteArtical(
                  id: ${this.articals[index].id},
                  token: "${this.authService.getToken()}"
               ){
                  ack {
                     ok,
                     message
                  }
               }
            }
         `
      }
      this.httpService.post(gqlDeleteArtical).subscribe(
         (res: any) => {
            res = res.json();
            if (this.httpService.hasError(res)) {
               this.notiService.message(res, true);
               return;
            }
            this.notiService.message(res.data.deleteArtical.ack.message);
            this.articals = this.fs.removeRow(this.articals, index);
            this.api_getArticalsRows();
         },
         (err: any) => {
            console.error(err.json().errors[0].message);
         }
      );
   }
}
