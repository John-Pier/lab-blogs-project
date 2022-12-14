import { AsyncPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, Self } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { defaultEditorExtensions, TUI_EDITOR_EXTENSIONS, TuiEditorModule, TuiEditorTool } from '@taiga-ui/addon-editor';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiErrorModule } from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit';
import { Observable, takeUntil, tap } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    NgIf,
    TuiInputModule,
    TuiErrorModule,
    TuiEditorModule,
    TuiFieldErrorPipeModule,
    AsyncPipe,
    ReactiveFormsModule,
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
  formGroup: FormGroup | undefined;

  @Output()
  private readonly onFormChange = new EventEmitter<any>();

  readonly builtInTools = [TuiEditorTool.Undo, TuiEditorTool.Img];

  constructor(@Self() @Inject(TuiDestroyService) private readonly destroy$: Observable<boolean>) {}

  ngOnInit() {
    this.formGroup?.valueChanges
      .pipe(
        tap(values => {
          this.onFormChange.next(values);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
