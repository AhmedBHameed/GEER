import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'striptags'
})
export class StriptagsPipe implements PipeTransform {

  transform(value: any): any {
    return value.replace(/<(?:.|\n)*?>/gm, '');
  }

}
