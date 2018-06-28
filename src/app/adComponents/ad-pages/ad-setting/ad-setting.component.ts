import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FunctionsService } from '../../../_services/_functions/functions.service';
import { RequestsService } from '../../../_services/requests.service';
import { GlobalService } from '../../../_services/global.service';

// Environments
import { environment } from '../../../../environments/environment';

// Services
import { BaseApis } from '../../../_services/base-apis';
import { FormsService, ValidatorsService } from '../../../_services/_functions/forms';
import { MultimediaService } from '../../../_services/';

// Grqphql queries
import { gqlSettings } from '../../../_gql_queries';

declare var $: any;
@Component({
  selector: 'app-ad-setting',
  templateUrl: './ad-setting.component.html',
  styleUrls: ['./ad-setting.component.scss'],
  providers: [ FormsService, MultimediaService ]
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
    private multi: MultimediaService) {
    super(injector);
  }

  ngOnInit() {
    this.settingsForm = this.fs.group([
        {key: 'id', defaultValue: 0},
        {key: 'meta_name', defaultValue: '', validators: [ValidatorsService.required()]},
        {key: 'meta_description', defaultValue: '', validators: [ValidatorsService.required()]},
        {key: 'title', defaultValue: '', validators: [ValidatorsService.required()] },
        {key: 'banner_img', defaultValue: '' },
        {key: 'logo', defaultValue: ''},
        {key: 'slide_category_id', defaultValue: '', validators: [ValidatorsService.required()] },
        {key: 'slide_post_num', defaultValue: '', validators: [ValidatorsService.required()] },
        {key: 'session_time', defaultValue: '', validators: [ValidatorsService.required()] },
        {key: 'facebook', defaultValue: '' },
        {key: 'youtube', defaultValue: '' },
        {key: 'googleplus', defaultValue: '' },
        {key: 'twitter', defaultValue: '' }
    ]);
    this.httpService.post(gqlSettings).subscribe(
      (res: any) => {
        res = res.json();
        if (this.httpService.hasError(res)) {
          this.notiService.message(res);
          return false;
        }
        this.settingsForm = this.fs.set(this.settingsForm, this.sharedData.settings);
        this.logoImg = this.settingsForm.value['logo'] == '' ? environment.baseApp + this.defaultImg : environment.backendUrl + this.settingsForm.value['logo'];
        this.bannerImg = this.settingsForm.value['banner_img'] == '' ? environment.baseApp + this.defaultImg : environment.backendUrl + this.settingsForm.value['banner_img'];
        this.showForm = true;
      },
      (err: any) => {
        console.error(err.json().errors[0]);
    });
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
      const GraphQL_updateSettings: any = {
        variables: null,
        query: `
            mutation {
              updateSettings(
                token: "${this.authService.getToken()}",
                id: ${data.id},
                title: "${data.title}",
                meta_name: "${data.meta_name}",
                meta_description: "${data.meta_description}",
                slide_category_id: ${data.slide_category_id || 0},
                slide_post_num: ${data.slide_post_num},
                session_time: ${data.session_time},
                twitter: "${data.twitter}",
                googleplus: "${data.googleplus}",
                youtube: "${data.youtube}",
                facebook: "${data.facebook}"
              ) {
                id,
                title,
                logo,
                banner_img,
                meta_name,
                meta_description,
                slide_category_id,
                slide_post_num,
                session_time,
                twitter,
                googleplus,
                youtube,
                facebook,
                ack {
                  ok,
                  message
                }
              }
            }
        `
      };
      this.httpService.packBinaryForm(GraphQL_updateSettings, {
        logo: this.settingsForm.value.logo,
        banner_img: this.settingsForm.value.bannerImg
      }).subscribe(
        (res: any) => {
          res = res.json();
          if ( this.httpService.hasError(res) ) {
            this.notiService.message(res);
            return false;
          }
          this.sharedData.settings = res.data.updateSettings;
          this.notiService.message(res.data.updateSettings.ack.message + '. Some of the settings will apply after refresh');
        },
        (err: any) => {
          console.error(err.errors[0]);
      });
    }
  }
}
