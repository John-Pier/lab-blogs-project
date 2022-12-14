import { Component, Inject, Input, OnInit, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { defaultEditorExtensions, TUI_EDITOR_EXTENSIONS, TuiEditorTool } from '@taiga-ui/addon-editor';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { Observable } from 'rxjs';
import { PostFormModel } from '../../models';

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
  formGroup: FormGroup<PostFormModel> | undefined;

  readonly builtInTools = [TuiEditorTool.Undo, TuiEditorTool.Img];

  constructor(@Self() @Inject(TuiDestroyService) private readonly destroy$: Observable<boolean>) {}

  ngOnInit() {}
}
