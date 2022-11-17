import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiAvatarModule, TuiDataListDropdownManagerModule, TuiTabsModule } from '@taiga-ui/kit';
import { MainHeaderComponent } from './components';

@NgModule({
  declarations: [MainHeaderComponent],
  imports: [
    CommonModule,
    TuiAvatarModule,
    TuiHostedDropdownModule,
    TuiButtonModule,
    TuiActiveZoneModule,
    TuiDataListModule,
    TuiTabsModule,
    TuiSvgModule,
    TuiDataListDropdownManagerModule,
  ],
  exports: [MainHeaderComponent],
})
export class HeaderModule {}
