import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
})
export class FileSizePipe implements PipeTransform {
  // template, .html  {{ file.size | fileSize }}
  transform(size: number): string {
    return (size / (1024 * 1024)).toFixed(2) + 'MB';
  }

  // with parameters
  // transform(size: number, extension: string = 'MB'): string {
  //   return (size / (1024 * 1024)).toFixed(2) + extension;
  // }
  // {{ file.size | fileSize:'megabyte' }}
  // {{ value | pipe:arg1:arg2 }}
}
