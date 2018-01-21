import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FunctionsService } from '../../../_services/_functions/functions.service';
import { ValidatorsService } from '../../../_services/_functions/validators.service';

import { AdService } from '../../../_services/adservice.service';

@Component({
  selector: 'app-ad-allarticals',
  templateUrl: './ad-allarticals.component.html',
  styleUrls: ['./ad-allarticals.component.css']
})
export class AdAllarticalsComponent implements OnInit {
  articals                   : any;
  trimedArticals             : any;
  opt = {
    itemsPerPage  : 2,
    currentPage   : 1,
    totalItems    : null,
  }
  isStatusChanged            : boolean = true;
  constructor(private ads: AdService, private fn:FunctionsService, private router: Router) { }

  ngOnInit() {
    this.ads.getArticals({"perPage":this.opt.itemsPerPage, "page":this.opt.currentPage-1}).subscribe(
      (data)=>{
        this.articals = data.json().data;
        this.opt.totalItems = (this.articals.pop()).totalItem;
      },
      (err)=>{
        this.fn.notify({
          type: 'danger', 
          icon: 'fa fa-exclamation-triangle',
          title: 'Error',
          message: err.json().message
        });
      });
  }

  clickedPage(e){
    this.opt.currentPage = e;
    // this.router.navigate(['','admin','allarticals', e]);
    
    this.ads.getArticals({"perPage":this.opt.itemsPerPage, "page":this.opt.currentPage-1}).subscribe(
      (data) => {
        this.articals = data.json().data;
        this.opt.totalItems = (this.articals.pop()).totalItem;
      },
      (err) => {
        this.fn.notify({
          type: 'danger',
          icon: 'fa fa-exclamation-triangle',
          title: 'Error',
          message: err.json().message
        });
      });
  }

  publish(e, status:string, postId:string, index:number){
    if(this.isStatusChanged){
      this.isStatusChanged = false
      if(status == 'published'){
        this.articals[index]["po_status"] = 'dreft';
      }else{
        this.articals[index]["po_status"] = 'published';
      }
      this.ads.changeStatus({"status": this.articals[index]["po_status"], "id":postId}).subscribe(
          (res)=>{
            this.isStatusChanged = true;
            this.fn.notify({
              type: 'success',
              icon: 'fa fa-exclamation-triangle',
              title: 'Message',
              message: res.json().data.response
            });
          },
          (err)=>{
            this.fn.notify({
              type: 'danger',
              icon: 'fa fa-exclamation-triangle',
              title: 'Message',
              message: err.json().message
            });
      });
    }
  }

  edite(e, artical, page){
    artical['atPage']= page;
    this.ads.globalVariable = artical;
    this.router.navigate(['','admin','addartical']);
  }

}
