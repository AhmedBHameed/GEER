import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphtyService } from './graphty.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    GraphtyService
  ]
})
export class GraphtyModule { }
