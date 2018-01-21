import { Injectable } from '@angular/core';
import { FunctionsService } from './_functions/functions.service';

@Injectable()
export class RequestsService {
  constructor(private funs: FunctionsService) {  }

  get(graphqlQuery) {
    return this.funs.makeRequest('graphql', 'Get', graphqlQuery);
  }
  post(graphqlQuery) {
    return this.funs.makeRequest('graphql', 'Post', graphqlQuery);
  }
  binaryRequest(GrqphQLQueryObj: any, objOfBinaries: any) {
    const requestObject: any = new FormData();
    console.log(this.funs.stringify(GrqphQLQueryObj));
    requestObject.append('queryJsonAsString', this.funs.stringify(GrqphQLQueryObj) );
    // tslint:disable-next-line:forin
    for (let key in objOfBinaries) {
      requestObject.append(key, objOfBinaries[key]);
    }
    return this.funs.makeBinaryRequest('graphql', 'Post', requestObject);
  }

}
