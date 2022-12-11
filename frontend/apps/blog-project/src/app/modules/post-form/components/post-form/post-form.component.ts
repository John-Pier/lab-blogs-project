import { Component, EventEmitter, Inject, Input, OnInit, Output, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { defaultEditorExtensions, TUI_EDITOR_EXTENSIONS, TuiEditorTool } from '@taiga-ui/addon-editor';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { Observable, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'bp-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.less'],
  providers: [
    TuiDestroyService,
    {
      provide: TUI_EDITOR_EXTENSIONS,
      useValue: defaultEditorExtensions,
    },
  ],
})
export class PostFormComponent implements OnInit {
  @Input()
  title: string = '';
  @Input()
  formGroup: FormGroup<any> | undefined;

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

  // public invalidateForm() {
  //   console.log('invalidateForm');
  // }
}
