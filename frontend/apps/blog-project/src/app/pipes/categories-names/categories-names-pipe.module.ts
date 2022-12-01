import { NgModule } from '@angular/core';
import { CategoriesNamesPipe } from './categories-names.pipe';

@NgModule({
  declarations: [CategoriesNamesPipe],
  exports: [CategoriesNamesPipe],
})
export class CategoriesNamesPipeModule {}
