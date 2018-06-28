import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateTransform'
})
export class DateTransformPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return moment(value, 'DD-MM-YYYY').format('DD-MMM-YYYY');
  }

}
