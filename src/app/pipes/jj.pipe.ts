import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jj'
})
export class JjPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.toUpperCase();
  }

}
