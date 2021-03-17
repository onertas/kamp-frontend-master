import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'watAdded'
})
export class WatAddedPipe implements PipeTransform {

  transform(value: number, rate:number): number {
    return value+((value*rate)/100);
  }

}
