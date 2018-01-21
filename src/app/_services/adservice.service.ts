import { Injectable } from '@angular/core';
import { FunctionsService } from './_functions/functions.service';

@Injectable()
export class AdService {
  settingsData : any;
  globalVariable: any= null;
  constructor(private fn: FunctionsService) {  }

  appendToken(object:any={}){
    object['token'] = this.fn.getToken();
    return object;
  }
  getAdSettings(){
    return this.fn.makeRequest("adsettings/getsettings", 'Post', {"token":this.fn.getToken()});
  }
  setAdSettings(data){
    data["token"] = this.fn.getToken();
    return this.fn.makeRequest("adsettings/setsettings", 'Post', data);
  }
  // ================================Categories================================================
  getAdCategories(){
    return this.fn.makeRequest("adcategories/getcategories", 'Post', {"token":this.fn.getToken()});
  }
  deleteAdCategory(id){
    return this.fn.makeRequest("adcategories/deletecategory/"+id, "Post", {"token":this.fn.getToken()});
  }
  setAdcategory(data){
    data = this.appendToken(data);
    return this.fn.makeRequest("adcategories/setcategory", 'Post', data);
  }
  modifyAdcategory(data){
    data = this.appendToken(data);
    return this.fn.makeRequest("adcategories/modifycategory", 'Post', data);
  }
  // ================================Add Artical================================================
  addArtical(data){
    data["token"] = this.fn.getToken();
    return this.fn.makeRequest('adarticals/add', 'Post', data);
  }
  modifyArtical(data){
    data["token"] = this.fn.getToken();
    return this.fn.makeRequest('adarticals/modify', 'Post', data);
  }
  // ================================Show Artical================================================
  getArticals(options:any){
    options['token'] = this.fn.getToken();
    return this.fn.makeRequest('adarticals/get', 'Post', options);
  }
  changeStatus(options:any){
    return this.fn.makeRequest('adarticals/changeStatus', 'Post', this.appendToken(options) );
  }

}
