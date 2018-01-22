import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { FunctionsService } from '../../../_services/_functions/functions.service';
import { RequestsService } from '../../../_services/requests.service';
import { FormsService, ValidatorsService } from '../../../_services/_functions/forms';

declare var $: any, tinymce: any;
@Component({
  selector: 'app-ad-addartical',
  templateUrl: './ad-addartical.component.html',
  styleUrls: ['./ad-addartical.component.css'],
  providers: [ FormsService ]
})
export class AdAddarticalComponent implements OnInit {
  articalForm: FormGroup;
  post_body: any = null;
  categories        : any;
  defaultImg: string = './assets/img/no-image-available.jpg';
  submitted         : boolean= false;

  constructor(
    private router: Router,
    private req: RequestsService,
    private fs: FormsService,
    private funs: FunctionsService ) {  }

  ngOnInit() {
    const GraphQL_getCategories = {
      query: `
        {
          getCategories {
            id,
            category,
            date
          }
        }
    `};
    this.req.get(GraphQL_getCategories).subscribe(
      res => {
        const respond = res.json();
        if ( this.funs.hasError(respond) ) {
          return;
        }
        this.categories = respond.data.getCategories;
        // this.showForm = true;
      },
      err => {
        this.funs.showErrorNote(err.json().errors[0]);
    });
    this.articalForm = this.fs.group([
        {key: 'title', defaultValue: '', validators: [ValidatorsService.required(), ValidatorsService.minLength(3)] },
        {key: 'category', defaultValue: '', validators: [ValidatorsService.required()] },
        {key: 'status', defaultValue: 'dreft'},
        {key: 'image', defaultValue: ''},
        {key: 'post', defaultValue: '', validators: [ValidatorsService.required()]}
    ]);
  
    //   if(this.ads.globalVariable != null){
    //     this.post_body = this.ads.globalVariable;
    //     this.modeType = 'Save';
    //     setTimeout(()=>{
    //       $('img.articalImage').attr('src', this.fn.url+this.ads.globalVariable.po_image).hide().fadeIn(300);
    //     }, 1000);
    //     console.log(this.ads.globalVariable);
    //     this.articalForm = this.fs.set(this.articalForm, [
    //       {"key":"po_title", "defaultValue":this.ads.globalVariable.po_title },
    //       {"key":"po_category", "defaultValue":this.ads.globalVariable.po_category},
    //       {"key":"po_status", "defaultValue":this.ads.globalVariable.po_status},
    //       {"key":"po_image", "defaultValue":this.ads.globalVariable.po_image},
    //       {"key":"po_post", "defaultValue":this.ads.globalVariable.po_post}
    //     ]);
    //   }else{
    //     setTimeout(()=>{
    //       $('img.articalImage').attr('src', '../../../assets/img/default/no-image-available.jpg').hide().fadeIn(300);
    //     }, 1000);
    //   }
  
  }
  keyupHandlerFunction(post) {
    this.post_body = post;
    this.articalForm = this.fs.update(this.articalForm, [{
      key: 'post',
      defaultValue: post
    }]);
  }

  reset() {
    this.articalForm = this.fs.reset(this.articalForm);
  }
  send(data: any, isValid: boolean) {
    this.submitted = true;
    if (isValid) {
      console.log(this.articalForm.value);
  //     if(this.modeType == 'Save'){
  //       data["po_post_id"] = this.ads.globalVariable.po_post_id;
  //       this.ads.modifyArtical(data).subscribe(
  //         (res) => {
  //           this.fn.notify({
  //             type: 'success',
  //             icon: 'fa fa-exclamation-triangle',
  //             title: 'Error',
  //             message: res.json().data.message
  //           });
  //           this.reset();
  //         },
  //         (err) => {
  //           console.log(err.json());
  //         });
  //     }else{
  //       this.ads.addArtical(data).subscribe(
  //         (res) => {
  //           this.fn.notify({
  //             type: 'success',
  //             icon: 'fa fa-exclamation-triangle',
  //             title: 'Error',
  //             message: res.json().data.message
  //           });
  //         },
  //         (err) => {
  //           console.log(err.json());
  //         });
  //     }
    }
  //   return;
  }
  chooseArticalImage(e) {
    this.fs.update(this.articalForm, {image: e.target.files[0]} );
    this.funs.chooseImage(e, this.defaultImg).then((data) => {
      $('img.articalImage').attr('src', data).hide().fadeIn(500);
    });
  }
}
