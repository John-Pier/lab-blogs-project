import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderModule } from '../header/header.module';
import { MainComponent } from './components';
import { MainRouterModule } from './main-router.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRouterModule, HeaderModule],
})
export class MainModule {}
