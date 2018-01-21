import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { FunctionsService } from '../../../_services/_functions/functions.service';
import { FormsService, ValidatorsService } from '../../../_services/_functions/forms';
import { AdService } from '../../../_services/adservice.service';


declare var $: any, tinymce: any;
@Component({
  selector: 'app-ad-addartical',
  templateUrl: './ad-addartical.component.html',
  styleUrls: ['./ad-addartical.component.css'],
  providers: [ FormsService ]
})
export class AdAddarticalComponent implements OnInit{
  articalForm       : FormGroup;
  articalImage      : string;
  submitted         : boolean= false;
  categories        : any;
  post_body         : any=null;
  modeType          : string = 'Add Artical';
  constructor(private router: Router, private fs: FormsService, private fn:FunctionsService, private ads: AdService) {  }

  keyupHandlerFunction(post) {
    this.post_body = post;
    this.articalForm = this.fs.set(this.articalForm, [{
      "key": "po_post",
      "defaultValue": post
    }]);
  }

  reset(){
    this.ads.globalVariable = null;
    if(this.modeType == 'Save'){
      this.router.navigate(['','admin', 'allarticals']);
    }
  }
  send(data, isValid){    
    this.submitted = true;
    if(isValid){
      if(this.modeType == 'Save'){
        data["po_post_id"] = this.ads.globalVariable.po_post_id;
        this.ads.modifyArtical(data).subscribe(
          (res) => {
            this.fn.notify({
              type: 'success',
              icon: 'fa fa-exclamation-triangle',
              title: 'Error',
              message: res.json().data.message
            });
            this.reset();
          },
          (err) => {
            console.log(err.json());
          });
      }else{
        this.ads.addArtical(data).subscribe(
          (res) => {
            this.fn.notify({
              type: 'success',
              icon: 'fa fa-exclamation-triangle',
              title: 'Error',
              message: res.json().data.message
            });
          },
          (err) => {
            console.log(err.json());
          });
      }
    }
    return;
  }
  ngOnInit() {
    this.ads.getAdCategories().subscribe(
      (data)=>{
        this.categories = data.json().data.categories;
      },
      (err)=>{
        this.fn.notify({type: 'danger', 
          icon: 'fa fa-exclamation-triangle',
          title: 'Error',
          message: err.json().message});
    });
    this.articalForm = this.fs.group([
        {"key":"po_title", "defaultValue":"", "validators":[ValidatorsService.required(), ValidatorsService.minLength(3)] },
        {"key":"po_category", "defaultValue":"", "validators":[ValidatorsService.required()] },
        {"key":"po_status", "defaultValue":"dreft"},
        {"key":"po_image", "defaultValue":""},
        {"key":"po_post", "defaultValue":"", "validators":[ValidatorsService.required()]}
    ]);

    if(this.ads.globalVariable != null){
      this.post_body = this.ads.globalVariable;
      this.modeType = 'Save';
      setTimeout(()=>{
        $('img.articalImage').attr('src', this.fn.url+this.ads.globalVariable.po_image).hide().fadeIn(300);
      }, 1000);
      console.log(this.ads.globalVariable);
      this.articalForm = this.fs.set(this.articalForm, [
        {"key":"po_title", "defaultValue":this.ads.globalVariable.po_title },
        {"key":"po_category", "defaultValue":this.ads.globalVariable.po_category},
        {"key":"po_status", "defaultValue":this.ads.globalVariable.po_status},
        {"key":"po_image", "defaultValue":this.ads.globalVariable.po_image},
        {"key":"po_post", "defaultValue":this.ads.globalVariable.po_post}
      ]);
    }else{
      setTimeout(()=>{
        $('img.articalImage').attr('src', '../../../assets/img/default/no-image-available.jpg').hide().fadeIn(300);
      }, 1000);
    }

  }

  chooseArticalImage(e){
    this.fn.chooseImage(e, "../../../assets/img/default/no-image-available.jpg").then( (data)=>{
      this.articalForm.controls['po_image'].setValue(data);
      $('img.articalImage').attr('src', data).hide().fadeIn(300);
    });
  }
}
