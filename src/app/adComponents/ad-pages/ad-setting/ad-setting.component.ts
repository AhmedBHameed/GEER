import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GqlQueryInterface, GraphtyService } from 'graphty';

// Environments
import { environment } from '../../../../environments/environment';

// Services
import { BaseApis } from '../../../_services/base-apis';
import { FormsService, ValidatorsService } from '../../../_services/_functions/forms';
import { MultimediaService } from '../../../_services';

declare var $: any;
@Component({
   selector: 'app-ad-setting',
   templateUrl: './ad-setting.component.html',
   styleUrls: ['./ad-setting.component.scss'],
   providers: [FormsService, MultimediaService]
})
export class AdSettingComponent extends BaseApis implements OnInit {
   submitted: boolean = false;
   showForm: boolean = false;
   settingsForm: FormGroup;
   logoImg: any;
   bannerImg: any;
   defaultImg: string = './assets/img/no-image-available.jpg';

   constructor(
      protected injector: Injector,
      private fs: FormsService,
      private graf: GraphtyService,
      private multi: MultimediaService) {
            super(injector);
   }

   ngOnInit() {
      this.settingsForm = this.fs.group([
         { key: 'id', defaultValue: 0 },
         { key: 'meta_name', defaultValue: '', validators: [ValidatorsService.required()] },
         { key: 'meta_description', defaultValue: '', validators: [ValidatorsService.required()] },
         { key: 'title', defaultValue: '', validators: [ValidatorsService.required()] },
         { key: 'banner_img', defaultValue: '' },
         { key: 'logo', defaultValue: '' },
         { key: 'slide_category_id', defaultValue: '', validators: [ValidatorsService.required()] },
         { key: 'slide_post_num', defaultValue: '', validators: [ValidatorsService.required()] },
         { key: 'session_time', defaultValue: '', validators: [ValidatorsService.required()] },
         { key: 'facebook', defaultValue: '' },
         { key: 'youtube', defaultValue: '' },
         { key: 'googleplus', defaultValue: '' },
         { key: 'twitter', defaultValue: '' }
      ]);

      let getSettings: GqlQueryInterface = this.graf.stagnation({
         fun: {
            name: 'getSettings'
         },
         ret: ['id', 'title', 'meta_name', 'meta_description', 'logo', 'slide_category_id', 'slide_post_num', 'session_time', 'banner_img', 'facebook', 'googleplus', 'youtube', 'twitter']
      });
      if (this.sharedData.settings) {
         this.httpService.post(getSettings).subscribe(
            (res: any) => {
               this.sharedData.settings = res.getSettings;
               this.settingsForm = this.fs.set(this.settingsForm, this.sharedData.settings);
               this.logoImg = this.settingsForm.value['logo'] == '' ? environment.baseApp + this.defaultImg : environment.backendUrl + this.settingsForm.value['logo'];
               this.bannerImg = this.settingsForm.value['banner_img'] == '' ? environment.baseApp + this.defaultImg : environment.backendUrl + this.settingsForm.value['banner_img'];
               this.showForm = true;
            },
            (err: any) => {
               console.error(err.json().errors[0]);
            });
      } else {
         this.settingsForm = this.fs.set(this.settingsForm, this.sharedData.settings);
         this.logoImg = this.settingsForm.value['logo'] == '' ? environment.baseApp + this.defaultImg : environment.backendUrl + this.settingsForm.value['logo'];
         this.bannerImg = this.settingsForm.value['banner_img'] == '' ? environment.baseApp + this.defaultImg : environment.backendUrl + this.settingsForm.value['banner_img'];
         this.showForm = true;
      }
   }

   changeLogoImage(e) {
      this.settingsForm.value.logo = e.target.files[0];
      this.multi.chooseImage(e, this.defaultImg).then((data) => {
         // this.settingsForm.controls['logo'].patchValue(data);
         $('.logoimg').attr('src', data).hide().fadeIn(300);
      });
   }
   changeBannerImage(e, selector) {
      this.settingsForm.value.bannerImg = e.target.files[0];
      this.multi.chooseImage(e, this.defaultImg).then((data) => {
         // this.settingsForm.controls['banner_img'].patchValue(data);
         $('.bannerimg').attr('src', data).hide().fadeIn(300);
      });
   }
   send(data: any, isValid) {
      this.submitted = true;
      if (isValid) {
         let updateSettings: GqlQueryInterface = this.graf.mutation({
            fun: {
               name: 'updateSettings',
               args: {
                  token: this.authService.getToken(),
                  id: data.id,
                  title: data.title,
                  meta_name: data.meta_name,
                  meta_description: data.meta_description,
                  slide_category_id: +data.slide_category_id || 0,
                  slide_post_num: +data.slide_post_num,
                  session_time: +data.session_time,
                  twitter: data.twitter,
                  googleplus: data.googleplus,
                  youtube: data.youtube,
                  facebook: data.facebook
               }
            },
            ret: ['id', 'title', 'meta_name', 'meta_description', 'logo', 'slide_category_id', 'slide_post_num', 'session_time', 'banner_img', 'facebook', 'googleplus', 'youtube', 'twitter']
         });
         this.httpService.packBinaryForm(updateSettings, {
            logo: this.settingsForm.value.logo,
            banner_img: this.settingsForm.value.bannerImg
         }).subscribe(
            (res: any) => {
               this.sharedData.settings = res.updateSettings;
               this.notiService.message(res.updateSettings.ack.message + '. Some of the settings will apply after refresh');
            },
            (err: any) => {
               console.error(err.json().errors[0].message);
            });
      }
   }
}
