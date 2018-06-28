import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { AdIndexComponent } from './ad-pages/ad-index.component';
import { AdHomeComponent } from './ad-pages/ad-home/ad-home.component';
import { AdControllpanelComponent } from './ad-pages/ad-controllpanel/ad-controllpanel.component';
import { AdSettingComponent } from './ad-pages/ad-setting/ad-setting.component';
import { AdCategoriesComponent } from './ad-pages/ad-categories/ad-categories.component';
import { AdAddarticalComponent } from './ad-pages/ad-addartical/ad-addartical.component';
import { AdAllarticalsComponent } from './ad-pages/ad-allarticals/ad-allarticals.component';

// Shared components
import { NavbarComponent } from '../_framework/navbar/navbar.component';

// Framework components
import { TinymceComponent } from '../_framework/tinymce/tinymce.component';
import { PaginationComponent } from '../_framework/pagination/pagination.component';

@NgModule({
  declarations: [
    AdIndexComponent,
    AdHomeComponent,
    AdControllpanelComponent,
    AdSettingComponent,
    AdCategoriesComponent,
    AdAddarticalComponent,
    AdAllarticalsComponent,
    NavbarComponent,
    TinymceComponent,
    PaginationComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    NgxPaginationModule
  ],
  exports: [
    NavbarComponent,
    NgxPaginationModule
  ]
})
export class AdminModule { }
