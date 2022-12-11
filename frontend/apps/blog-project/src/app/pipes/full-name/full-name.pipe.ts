import { Pipe, PipeTransform } from '@angular/core';
import { ShortUserDto } from '../../models';

@Pipe({
  standalone: true,
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  transform(value: ShortUserDto): string {
    if (!value) {
      return '...';
    }
    const { firstName, secondName } = value;
    return `${secondName} ${firstName}`;
  }
}
