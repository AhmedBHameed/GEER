import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// Those three modules related to apollo library
// import { ApolloModule } from 'apollo-angular';
// import { HttpLinkModule } from 'apollo-angular-link-http';
// import { ApolloClient } from './_client/client';

// Routes of the suite
import { APP_ROUTES_PROVIDER } from './_routes/app.routes';

// Framework Components
import {
  TinymceComponent,
  PaginationComponent,
  NavbarComponent,
  FooterComponent
} from './_framework/framework.module';

// Pipes
import {
  PipesPipe,
  StriptagsPipe
} from './_pipes/pipes.module';

// Import Global service to include all static information for the front-end
import { GlobalService } from './_services/global.service';
import { FunctionsService } from './_services/_functions/functions.service';

// All Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/index/pages/home/home.component';

// Home folder
import { CarouselComponent } from './components/index/pages/home/carousel/carousel.component';
import { NewpostsComponent } from './components/index/pages/home/newposts/newposts.component';
import { LastcommantsComponent } from './components/index/pages/home/lastcommants/lastcommants.component';

// Template folder
import { BannerComponent } from './components/index/banner/banner.component';
import { TitleComponent } from './components/template/title/title.component';

// category folder
import { CategoryComponent } from './components/index/pages/category/category.component';
// post folder
import { PostComponent } from './components/index/pages/category/post/post.component';
// import { CommentsComponent } from './components/index/pages/category/post/comments/comments.component';
// login folder
import { LogginComponent } from './components/loggin/loggin.component';
// index folder
import { IndexComponent } from './components/index/index.component';

import { ProfileComponent } from './profile/profile.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

import { RegesterComponent } from './components/index/pages/regester/regester.component';
import { BreadcrumbComponent } from './components/template/breadcrumb/breadcrumb.component';
import { AllcategoriesComponent } from './components/index/pages/category/allcategories/allcategories.component';
import { GetpostComponent } from './components/index/pages/category/post/getpost/getpost.component';

// admin pages
import { AdIndexComponent } from './adComponents/ad-pages/ad-index.component';
import { AdHomeComponent } from './adComponents/ad-pages/ad-home/ad-home.component';
import { AdControllpanelComponent } from './adComponents/ad-pages/ad-controllpanel/ad-controllpanel.component';
import { AdSettingComponent } from './adComponents/ad-pages/ad-setting/ad-setting.component';
import { AdCategoriesComponent } from './adComponents/ad-pages/ad-categories/ad-categories.component';
import { AdAddarticalComponent } from './adComponents/ad-pages/ad-addartical/ad-addartical.component';
import { AdAllarticalsComponent } from './adComponents/ad-pages/ad-allarticals/ad-allarticals.component';

// import { DisqusModule } from 'ngx-disqus';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CategoryComponent,
    ProfileComponent,
    LandingpageComponent,
    BannerComponent,
    CarouselComponent,
    TitleComponent,
    NewpostsComponent,
    LastcommantsComponent,
    FooterComponent,
    PostComponent,
    LogginComponent,
    IndexComponent,
    RegesterComponent,
    BreadcrumbComponent,
    AllcategoriesComponent,
    GetpostComponent,
    AdIndexComponent,
    AdHomeComponent,
    AdControllpanelComponent,
    AdSettingComponent,
    AdCategoriesComponent,
    AdAddarticalComponent,
    TinymceComponent,
    AdAllarticalsComponent,
    PaginationComponent,
    PipesPipe,
    StriptagsPipe
  ],
  imports: [
    // DisqusModule.forRoot('disqus_shortname'),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpModule,
    APP_ROUTES_PROVIDER,
    JsonpModule,
    HttpClientModule
  ],
  providers: [ GlobalService, FunctionsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
