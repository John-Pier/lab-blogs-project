import { FormControl } from '@angular/forms';
import { BlogCreateDto } from '../../../../models';

export type BlogFormControls = keyof BlogCreateDto;
export type BlogFormModel = {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  categories: FormControl<string[] | null>;
};
