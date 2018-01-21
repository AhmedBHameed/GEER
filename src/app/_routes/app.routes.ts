import { ModuleWithProviders } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

import { HomeComponent } from '../components/index/pages/home/home.component';
import { CategoryComponent } from '../components/index/pages/category/category.component';
import { AllcategoriesComponent } from '../components/index/pages/category/allcategories/allcategories.component';
import { PostComponent } from '../components/index/pages/category/post/post.component';
import { GetpostComponent } from '../components/index/pages/category/post/getpost/getpost.component';
import { LogginComponent } from '../components/loggin/loggin.component';
import { IndexComponent } from '../components/index/index.component';
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

const APP_ROUTES: Routes = [
  {path: 'landingpage', component: LandingpageComponent },
  {path: '', component: IndexComponent, data: { breadcrumb: 'Home'}, children: [
        {path: '', component: HomeComponent, data: { title: 'Home Page' }},
        {path: 'category/:cat', component: CategoryComponent, data: { breadcrumb: 'Categories'}, children: [
          {path: '', component: AllcategoriesComponent, data: { title: 'Categoies Page' }},
          {path: 'post/:id', component: PostComponent, data: { breadcrumb: 'Post'}, children: [
            {path: '', component: GetpostComponent}
          ]}
        ]},
        {path: 'post/:id', component: PostComponent, data: { breadcrumb: 'Hot Posts'}, children: [
            {path: '', component: GetpostComponent }
        ]},
        {path: 'profile/:id', component: ProfileComponent},
        {path: 'signin', component: RegesterComponent, data: { title: 'GEER: New Registeration' } }
      ]},
  {path: 'admin', component: AdIndexComponent, children: [
    {path: '', component: AdHomeComponent, data: { title: 'Admin-Home'}},
    {path: 'settings', component: AdSettingComponent, data: { title: 'Admin-Settings'}},
    {path: 'categories', component: AdCategoriesComponent, data: { title: 'Admin-Settings'}},
    {path: 'addartical', component: AdAddarticalComponent, data: { title: 'Admin-Add Artical'}},
    {path: 'allarticals', component: AdAllarticalsComponent, data: { title: 'Admin-All Artical'}}
    
  ]},
  {path: 'login', component: LogginComponent },
  {path: '**', component: LandingpageComponent }
];

export const APP_ROUTES_PROVIDER: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
