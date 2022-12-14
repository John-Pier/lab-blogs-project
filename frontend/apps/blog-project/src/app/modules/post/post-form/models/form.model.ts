import { FormControl } from '@angular/forms';
import { PostDto } from '../../../../models';

export type PostFormControls = keyof Pick<PostDto, 'label' | 'description' | 'preview' | 'content'>;
export type PostFormModel = Record<PostFormControls, FormControl<string | null>>;
