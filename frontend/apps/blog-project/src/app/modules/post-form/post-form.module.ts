import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiEditorModule } from '@taiga-ui/addon-editor';
import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit';
import { PostFormComponent } from './components';

@NgModule({
  declarations: [PostFormComponent],
  imports: [
    CommonModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiButtonModule,
    TuiEditorModule,
  ],
  exports: [PostFormComponent],
})
export class PostFormModule {}
