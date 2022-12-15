import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Inject, Input, OnInit, Self } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { defaultEditorExtensions, TUI_EDITOR_EXTENSIONS } from '@taiga-ui/addon-editor';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiErrorModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiInputModule, TuiMultiSelectModule } from '@taiga-ui/kit';
import { Observable } from 'rxjs';
import { CategoryDto } from '../../../models';
import { BlogFormModel } from './models';

@Component({
  standalone: true,
  imports: [
    NgIf,
    TuiInputModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    AsyncPipe,
    ReactiveFormsModule,
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
    TuiDataListWrapperModule,
  ],
  selector: 'bp-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.less'],
  providers: [
    TuiDestroyService,
    {
      provide: TUI_EDITOR_EXTENSIONS,
      useValue: defaultEditorExtensions,
    },
  ],
})
export class BlogFormComponent implements OnInit {
  @Input()
  title: string = '';
  @Input()
  formGroup: FormGroup<BlogFormModel> | undefined;
  @Input()
  categories: CategoryDto[] = [];

  constructor(@Self() @Inject(TuiDestroyService) private readonly destroy$: Observable<boolean>) {}

  ngOnInit() {}

  toCategoryName(category: CategoryDto): string {
    return category.name;
  }
  categoryMatchById(a: CategoryDto, b: CategoryDto): boolean {
    return a.id === b.id;
  }
}
