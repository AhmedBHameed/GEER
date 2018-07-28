import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { GraphtyModule } from 'graphty';

// Routes of the suite
import { RoutesModule } from './_routes/routes.module';

// Services
import { HttpService, NotificationsService, SharedDataService, AuthService } from './_services';

// Modules
import { AdminModule } from './adComponents/admin.module';

// Those three modules related to apollo library
// import { ApolloModule } from 'apollo-angular';
// import { HttpLinkModule } from 'apollo-angular-link-http';
// import { ApolloClient } from './_client/client';


// Framework Components
import { FooterComponent } from './_framework/framework.module';

// Pipes
import {
  PipesPipe,
  ParseUriPipe,
  DateTransformPipe,
  SafeHtmlPipe
} from './_pipes/pipes.module';

// Import Global service to include all static information for the front-end
import { GlobalService } from './_services/global.service';
import { FunctionsService } from './_services/_functions/functions.service';

// All Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

// Home folder
import { CarouselComponent } from './components/home/carousel/carousel.component';
import { LastcommantsComponent } from './components/home/lastcommants/lastcommants.component';

// Template folder
import { BannerComponent } from './components/index/banner/banner.component';
import { TitleComponent } from './components/template/title/title.component';

// post folder
import { PostComponent } from './components/post/post.component';
// import { CommentsComponent } from './components/index/pages/category/post/comments/comments.component';
// index folder
import { IndexComponent } from './components/index.component';

import { ProfileComponent } from './profile/profile.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

import { RegesterComponent } from './components/index/pages/regester/regester.component';
import { BreadcrumbComponent } from './components/template/breadcrumb/breadcrumb.component';
import { AllcategoriesComponent } from './components/allcategories/allcategories.component';
// import { DisqusModule } from 'ngx-disqus';

// login folder
import { LogginComponent } from './components/loggin/loggin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    LandingpageComponent,
    BannerComponent,
    CarouselComponent,
    TitleComponent,
    LastcommantsComponent,
    FooterComponent,
    PostComponent,
    LogginComponent,
    IndexComponent,
    RegesterComponent,
    BreadcrumbComponent,
    AllcategoriesComponent,
    PipesPipe,
    ParseUriPipe,
    DateTransformPipe,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    // DisqusModule.forRoot('disqus_shortname'),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RoutesModule,
    JsonpModule,
    HttpClientModule,
    AdminModule,
    GraphtyModule
  ],
  providers: [
    HttpService,
    SharedDataService,
    NotificationsService,
    AuthService,
    FunctionsService,
    GlobalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
