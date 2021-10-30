import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separadorMiles',
})
export class SeparadorMilesPipe implements PipeTransform {
  public transform(value: any) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
