import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class PipesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return (value.length > args) ? value.substr(0, args)+' ...' : value.substr(0, args);
  }

}