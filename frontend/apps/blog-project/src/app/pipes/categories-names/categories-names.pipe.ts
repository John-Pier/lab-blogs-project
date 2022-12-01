import { Pipe, PipeTransform } from '@angular/core';
import { CategoryDto } from '../../models';

@Pipe({
  name: 'categoriesNames',
})
export class CategoriesNamesPipe implements PipeTransform {
  transform(values: CategoryDto[]): string {
    if (!values?.length) {
      return 'Нет категорий';
    }
    return values.map(it => it.name).join(', ');
  }
}
