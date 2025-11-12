import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorPipe',
})
export class ColorPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (!value) {
      return '';
    }
    value = value.toLowerCase().replaceAll(' ', '-');
    return value;
  }
}
