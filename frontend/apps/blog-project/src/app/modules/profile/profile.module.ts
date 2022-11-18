import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './components';
import { ProfileRouterModule } from './profile-router.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileRouterModule],
})
export class ProfileModule {}
