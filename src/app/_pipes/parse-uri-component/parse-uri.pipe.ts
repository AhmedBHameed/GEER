import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseUri'
})
export class ParseUriPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return decodeURIComponent(value);
  }

}
