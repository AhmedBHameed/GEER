import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import { environment } from '../../../environments/environment';

declare let window: any;
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public baseUrl = environment.backendUrl;
  constructor(private http: Http) { }

  private stringify(queryObj: any) {
    return JSON.stringify(queryObj)
      .replace(/\\n/g, '')
      .replace(/\\&/g, '')
      .replace(/\\r/g, '')
      .replace(/\\t/g, '')
      .replace(/\\b/g, '')
      .replace(/\\f/g, '');
  }
  private makeRequest(page = null, type = null, data = null) {
    let header = new Headers(),
      opt;
    if (type === 'Post') {
      header.append('Accept', 'application/json');
      header.append('Content-Type', 'application/json');
      opt = new RequestOptions({
        headers: header,
        url: this.baseUrl + page,
        method: RequestMethod[type],
        body: this.stringify(data)
      });
    }
    if (type === 'Get') {
      header.append('Accept', 'application/json');
      opt = new RequestOptions({
        headers: header,
        url: this.baseUrl + page + '?query=' + window.encodeURI(data.query.replace(/\r?\n?↵?\s+/g, '')),
        method: RequestMethod[type]
      });
    }
    return this.http.request(new Request(opt));
  }
  private makeBinaryRequest(page = null, type = null, data = null) {
    let header = new Headers(),
      opt;
    if (type === 'Post') {
      header.append('Accept', 'application/json');
      // header.append("Content-Type", "multipart/form-data; charset=utf-8; boundary=\"------WebKitFormBoundary\"");
      opt = new RequestOptions({
        headers: header,
        url: this.baseUrl + page,
        method: RequestMethod[type],
        body: data
      });
    }
    if (type === 'Get') {
      header.append('Accept', 'application/json');
      opt = new RequestOptions({
        headers: header,
        url: this.baseUrl + page,
        method: RequestMethod[type]
      });
    }
    return this.http.request(new Request(opt));
  }
  hasError(respond: any): boolean {
    return respond.errors ? true : false;
  }
  get(graphqlQuery) {
    return this.makeRequest('graphql', 'Get', graphqlQuery);
  }
  post(graphqlQuery) {
    return this.makeRequest('graphql', 'Post', graphqlQuery);
  }
  packBinaryForm(GrqphQLQueryObj: any, objOfBinaries: any) {
    const requestObject: any = new FormData();
    requestObject.append('queryJsonAsString', this.stringify(GrqphQLQueryObj));
    // tslint:disable-next-line:forin
    for (let key in objOfBinaries) {
      requestObject.append(key, objOfBinaries[key]);
    }
    return this.makeBinaryRequest('graphql', 'Post', requestObject);
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
