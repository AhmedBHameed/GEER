import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsService, ValidatorsService } from '../../../_services/_functions/forms';
import { FunctionsService } from '../../../_services/_functions/functions.service';
import { RequestsService } from '../../../_services/requests.service';
import { GlobalService } from '../../../_services/global.service';

declare var $: any;
@Component({
  selector: 'app-ad-setting',
  templateUrl: './ad-setting.component.html',
  styleUrls: ['./ad-setting.component.css'],
  providers: [ FormsService, RequestsService ]
})
export class AdSettingComponent implements OnInit {
  submitted: boolean = false;
  showForm: boolean = false;
  settingsForm: FormGroup;
  categories: any;
  logoImg: any;
  bannerImg: any;
  defaultImg: string = './assets/img/no-image-available.jpg';
  constructor(
    public funs: FunctionsService,
    private fs: FormsService,
    private req: RequestsService,
    public gs: GlobalService) { }

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
    const GraphQL_getSettings = {
      query : `
        {
          getCategories {
            id,
            category,
            date
          }
        }
      `};
    this.req.get(GraphQL_getSettings).subscribe(
      res => {
        const respond = res.json();
        if ( this.funs.hasError(respond) ) {
          return;
        }
        this.categories = respond.data.getCategories;
        this.settingsForm = this.fs.set(this.settingsForm, this.gs.settings);
        if (this.settingsForm.value.logo == '') {
          this.settingsForm.value.logo = this.defaultImg;
        }
        if (this.settingsForm.value.bannerImg == '') {
          this.settingsForm.value.bannerImg = this.defaultImg;
        }
        this.logoImg = this.settingsForm.value['logo'] ? this.funs.url + this.settingsForm.value['logo'] : this.defaultImg;
        this.bannerImg = this.settingsForm.value['banner_img'] ? this.funs.url + this.settingsForm.value['banner_img'] : this.defaultImg;
        this.showForm = true;
      },
      err => {
        this.funs.showErrorNote(err.json().errors[0]);
    });
  }
  changeLogoImage(e) {
    this.settingsForm.value.logo = e.target.files[0];
    this.funs.chooseImage(e, this.defaultImg).then((data) => {
      // this.settingsForm.controls['logo'].patchValue(data);
      $('.logoimg').attr('src', data).hide().fadeIn(300);
    });
  }
  changeBannerImage(e, selector) {
    this.settingsForm.value.bannerImg = e.target.files[0];
    this.funs.chooseImage(e, this.defaultImg).then((data) => {
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
                token: "${this.funs.getToken()}",
                id: ${data.id},
                title: "${data.title}",
                meta_name: "${data.meta_name}",
                meta_description: "${data.meta_description}",
                slide_category_id: "${data.slide_category_id}",
                slide_post_num: "${data.slide_post_num}",
                session_time: "${data.session_time}",
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
      this.req.binaryRequest(GraphQL_updateSettings, {
        logo: this.settingsForm.value.logo,
        banner_img: this.settingsForm.value.bannerImg
      }).subscribe(
        res => {
          const respond = res.json();
          if ( this.funs.hasError(respond) ) {
            return;
          }
          this.gs.settings = respond.data.updateSettings;
          this.funs.showSuccessNote(respond.data.updateSettings.ack.message + '. Some of the settings will apply after refresh');
        },
        err => {
          this.funs.showErrorNote(err.errors[0]);
      });
    }
  }
}
