import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components';
import { MainRouterModule } from './main-router.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRouterModule],
})
export class MainModule {}
