import { FormControl } from '@angular/forms';
import { BlogCreateDto, CategoryDto } from '../../../../models';

export type BlogFormControls = keyof BlogCreateDto;
export type BlogFormModel = {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  categories: FormControl<CategoryDto[] | null>;
};
