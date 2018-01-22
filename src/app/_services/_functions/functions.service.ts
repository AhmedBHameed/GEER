import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

declare var $: any;
declare var window: any;
@Injectable()
export class FunctionsService {
  public url = environment.backendUrl;
  constructor(private http: Http) {}
  notify(data) {
      $.notify({
      // options
      icon: data.icon,
      title: data.title,
      message: data.message,
      url: data.url || null,
      target: data.target || null
    }, {
      // settings
      element: 'body',
      position: null,
      type: data.type,
      allow_dismiss: true,
      newest_on_top: false,
      showProgressbar: false,
      placement: {
        from: "bottom",
        align: "left"
      },
      offset: 20,
      spacing: 10,
      z_index: 1031,
      delay: 5000,
      timer: 1000,
      url_target: '_blank',
      mouse_over: 'pause',
      animate: {
        enter: 'animated fadeInUp',
        exit: 'animated fadeOutDown'
      },
      onShow: null,
      onShown: null,
      onClose: null,
      onClosed: null,
      icon_type: 'class',
      template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span></br> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>' 
    });
  }

  makeRequest(page = null, type = null, data = null) {
    let header = new Headers(),
      opt;
    if (type === 'Post') {
      header.append('Accept', 'application/json');
      header.append('Content-Type', 'application/json');
      opt = new RequestOptions({
        headers: header,
        url: this.url + page,
        method: RequestMethod[type],
        body: this.stringify(data)
      });
    }
    if (type === 'Get') {
      header.append('Accept', 'application/json');
      opt = new RequestOptions({
        headers: header,
        url: this.url + page + '?query=' + window.encodeURI(data.query.replace(/\r?\n?↵?\s+/g, '')),
        method: RequestMethod[type]
      });
    }
    return this.http.request(new Request(opt));
  }
  makeBinaryRequest(page = null, type = null, data = null) {
    let header = new Headers(),
      opt;
    if (type === 'Post') {
      header.append('Accept', 'application/json');
      // header.append("Content-Type", "multipart/form-data; charset=utf-8; boundary=\"------WebKitFormBoundary\"");
      opt = new RequestOptions({
        headers: header,
        url: this.url + page,
        method: RequestMethod[type],
        body: data
      });
    }
    if (type === 'Get') {
      header.append('Accept', 'application/json');
      opt = new RequestOptions({
        headers: header,
        url: this.url + page,
        method: RequestMethod[type]
      });
    }
    return this.http.request(new Request(opt));
  }
  delay(callback: any, timeout: number) {
    if(typeof callback != 'function') throw new Error('Delay parameters must be ( Callback function, number of Delay in ms)');
    window.setTimeout(callback, timeout);
  }
  hasError(respond: any): boolean {
    if (respond.errors) {
        this.notify({
            type: 'danger',
            icon: 'fa fa-exclamation-triangle',
            title: 'Request Error!!',
            message: respond.errors[0].message
        });
        return true;
    }
    return false;
  }
  showErrorNote(error: any) {
    this.notify({
        type: 'danger',
        icon: 'fa fa-exclamation-triangle',
        title: 'Request Error!!',
        message: error.message
    });
  }
  showSuccessNote(message) {
    this.notify({
        type: 'success',
        icon: 'fa fa-flag',
        title: 'Login Status',
        message: message
    });
  }
  getToken(): any {
    let token = window.localStorage.getItem('geertoken') || window.sessionStorage.getItem('geertoken');
    if(typeof token == 'string'){
      let tokenCondition = token.split(".");
      if(tokenCondition.length == 3){
        return token;
      }else{
        throw new Error('Invalid token!');
      }
    }else{
      return false;
    }
  }
  isAuthUser(authType: string = 'user') {
    let cradentials = this.getToken(), type = window.localStorage.getItem('type') || window.sessionStorage.getItem('type');
    if(typeof cradentials == 'string' && type != authType){
      return true;
    }else{
      return false;
    }
  }
  stringify(queryObj: any) {
    return JSON.stringify(queryObj)
                .replace(/\\n/g, '')
                .replace(/\\&/g, '')
                .replace(/\\r/g, '')
                .replace(/\\t/g, '')
                .replace(/\\b/g, '')
                .replace(/\\f/g, '');
  }
  chooseImage(e, def) { // e is the input type="file" | def default vaalue;
    let base64 = null;
    if (e.target.files && e.target.files[0] && e.target.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      return new Promise((resolve, reject) => {
        reader.onload = (e) => {
          base64 = e.target['result'];
          resolve(base64);
        };
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(def);
      });
    }
  }
  getIndex(arrayObject:any, ofRow:any){
    if(typeof arrayObject != 'object'){
      throw new Error('Invalid object. search index should be in object only');
    }
    for(let i =0; i< arrayObject.length; i++){
      for(let key in arrayObject[i]){
        if(!ofRow.hasOwnProperty(key)) continue;
        if(arrayObject[i][key] == ofRow[key]){
          return i;
        }
      }
    }
    return null;
  }
  dateAs(format: string = 'YYYY-MM-DD') {
    return moment(new Date()).format(format);
  }

  // private makeRequestJsonp(page=null, data=null){ // this is jsonp request
  //     let header = new Headers(), opt;
  //   header.append('Accept', 'application/json');
  //   header.append('X-CSRF-Token', localStorage.getItem('token'));
  //       opt = new RequestOptions({headers: header,
  //                                       url: this.url+page+'/cb=JSONP_CALLBACK',
  //                                       method: RequestMethod.Get,
  //                                     });
  //     return this.jsonp.request(new Request(opt));
  //   }
  //   test(){
  //     return this.makeRequestJsonp('adcanaccesstwo', {"token":localStorage.getItem('token')});
  // }
}
