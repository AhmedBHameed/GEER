import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RoutesRoutingModule
  ],
  exports: [
    RoutesRoutingModule
  ],
  declarations: []
})
export class RoutesModule { }
