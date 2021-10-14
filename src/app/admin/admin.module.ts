import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material.module';

import { DelayDisplayDirective } from './delay-display.directive';

@NgModule({
  declarations: [AdminComponent, DelayDisplayDirective],
  imports: [CommonModule, FlexLayoutModule, AdminRoutingModule, MaterialModule],
})
export class AdminModule {}
