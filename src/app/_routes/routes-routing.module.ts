import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from '../components/home/home.component';
import { AllcategoriesComponent } from '../components/allcategories/allcategories.component';
import { PostComponent } from '../components/post/post.component';
import { LogginComponent } from '../components/loggin/loggin.component';
import { IndexComponent } from '../components/index.component';
import { RegesterComponent } from '../components/index/pages/regester/regester.component';

import { LandingpageComponent } from '../landingpage/landingpage.component';
import { ProfileComponent } from '../profile/profile.component';
// admin pages
import { AdIndexComponent } from '../adComponents/ad-pages/ad-index.component';
import { AdHomeComponent } from '../adComponents/ad-pages/ad-home/ad-home.component';
import { AdSettingComponent } from '../adComponents/ad-pages/ad-setting/ad-setting.component';
import { AdCategoriesComponent } from '../adComponents/ad-pages/ad-categories/ad-categories.component';
import { AdAddarticalComponent } from '../adComponents/ad-pages/ad-addartical/ad-addartical.component';
import { AdAllarticalsComponent } from '../adComponents/ad-pages/ad-allarticals/ad-allarticals.component';

const routes: Routes = [
  {path: 'landingpage', component: LandingpageComponent },
  {path: '', component: IndexComponent, data: { breadcrumb: 'Home'}, children: [
        {path: '', component: HomeComponent, data: { title: 'Home Page' }},
        {path: 'category/:cat', component: AllcategoriesComponent, data: { breadcrumb: 'Categories'}, children: [
          {path: 'artical/:id', component: PostComponent, data: { breadcrumb: 'Post'}}
        ]},
        {path: 'artical/:id', component: PostComponent, data: { breadcrumb: 'Hot Posts'}},
        {path: 'profile/:id', component: ProfileComponent},
        {path: 'signin', component: RegesterComponent, data: { title: 'GEER: New Registeration' } }
      ]},
  {path: 'admin', component: AdIndexComponent, children: [
    {path: '', component: AdHomeComponent, data: { title: 'Admin-Home'}},
    {path: 'settings', component: AdSettingComponent, data: { title: 'Admin-Settings'}},
    {path: 'categories', component: AdCategoriesComponent, data: { title: 'Admin-Settings'}},
    {path: 'artical/:type', component: AdAddarticalComponent, data: { title: 'Admin-Add/Update Artical'}},
    {path: 'allarticals/:page', component: AdAllarticalsComponent, data: { title: 'Admin-All Artical'}}
    
  ]},
  {path: 'login', component: LogginComponent },
  {path: '**', component: LandingpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
