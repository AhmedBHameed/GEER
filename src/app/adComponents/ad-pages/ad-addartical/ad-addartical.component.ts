import { Component, Injector, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GqlQueryInterface, GraphtyService } from 'graphty';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';

// Services
import { BaseApis } from '../../../_services/base-apis';
import { FormsService, ValidatorsService } from '../../../_services/_functions/forms';
import { MultimediaService } from '../../../_services';

declare var $: any, tinymce: any;
@Component({
   selector: 'app-ad-addartical',
   templateUrl: './ad-addartical.component.html',
   styleUrls: ['./ad-addartical.component.css'],
   providers: [FormsService, MultimediaService]
})
export class AdAddarticalComponent extends BaseApis implements OnInit {
   @ViewChild('articalImage') fileInputEl: ElementRef;
   categories: any;
   articalForm: FormGroup;
   defaultImg: string = './assets/img/no-image-available.jpg';
   backendUrl: string = environment.backendUrl;
   submitted: boolean = false;
   isUpdateMood: boolean = false;
   constructor(
      protected injector: Injector,
      private fs: FormsService,
      private ar: ActivatedRoute,
      private graf: GraphtyService,
      private multi: MultimediaService) {
      super(injector);
   }

   ngOnInit() {
      this.articalForm = this.fs.group([
         { key: 'id', defaultValue: '' },
         { key: 'title', defaultValue: '', validators: [ValidatorsService.required(), ValidatorsService.minLength(3)] },
         { key: 'category', defaultValue: '', validators: [ValidatorsService.required()] },
         { key: 'status', defaultValue: 'dreft' },
         { key: 'artical', defaultValue: '' },
         { key: 'author', defaultValue: '' },
         { key: 'image', defaultValue: '' }
      ]);

      this.isUpdateMood = this.ar.snapshot.params.type == 'update' && this.sharedData.updateArtical.articalObj;
      if (this.isUpdateMood) {
         this.articalForm = this.fs.update(this.articalForm, this.sharedData.updateArtical.articalObj);
      } else {
         this.isUpdateMood = false;
         this.authService.redirectTo(['admin', 'artical', 'add']);
      }
   }

   // Empty the input field in case the user upload the same image (preventing halt issue of the same image)
   reset() {
      this.articalForm = this.fs.reset(this.articalForm);
      this.fileInputEl.nativeElement.value = '';
      if (!/safari/i.test(navigator.userAgent)) {
         this.fileInputEl.nativeElement.type = '';
         this.fileInputEl.nativeElement.type = 'file';
      }
   }

   send(data: any, isValid: boolean) {
      this.submitted = true;
      let AddUpdateArtical: GqlQueryInterface;
      if (isValid) {
         if (this.isUpdateMood) {
            AddUpdateArtical = this.graf.mutation({
               fun: {
                  name: 'updateArtical',
                  args: {
                     id: +data.id,
                     token: this.authService.getToken(),
                     title: data.title,
                     category: +data.category,
                     status: data.status,
                     artical: data.artical,
                     author: +this.sharedData.userData.id,
                     image: this.sharedData.updateArtical.articalObj.image
                  }
               },
               ret: ['ack{ok,message}']
            });
         } else {
            AddUpdateArtical = this.graf.mutation({
               fun: {
                  name: 'addArtical',
                  args: {
                     token: this.authService.getToken(),
                     title: data.title,
                     category: +data.category,
                     status: data.status,
                     artical: data.artical,
                     author: +this.sharedData.userData.id
                  }
               },
               ret: ['ack{ok,message}']
            });
         }
         this.httpService.packBinaryForm(AddUpdateArtical, { image: this.articalForm.value.image }).subscribe(
            (res: any) => {
               this.fs.reset(this.articalForm);
               if (this.isUpdateMood) {
                  this.notiService.message(res.updateArtical.ack.message);
                  this.authService.redirectTo(['admin', 'allarticals', this.sharedData.updateArtical.onPage]);
               } else {
                  this.notiService.message(res.addArtical.ack.message);
                  this.reset();
               }
            },
            (err: any) => {
               this.notiService.message(err.json().errors[0].message);
            });
      }
   }

   changePic(imgUrl: string) {
      $('img.articalImage').attr('src', imgUrl).hide().fadeIn(500);
   }

   chooseArticalImage(e) {
      this.fs.update(this.articalForm, { image: e.target.files[0] });
      this.multi.chooseImage(e, this.defaultImg).then((data: string) => {
         this.changePic(data);
      });
   }
}
