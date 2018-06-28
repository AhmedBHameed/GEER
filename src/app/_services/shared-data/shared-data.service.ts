import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class SharedDataService {
   // User data
   userData: any = {
      username: '',
      id: '',
   };
   isAdmin: boolean = false;
   // Settings object
   settings: any = {};
   // Categories links for navbar
   categories: Array<any> = [];
   // Nav bar items or links
   navigationLinks: Array<any>;
   // Articals object
   updateArtical: any = {
      articalObj: null,
      onPage: null
   }

   constructor() { }

   reformNavigationLinks(arrayOfCategories: Array<any>): void {
      this.categories = arrayOfCategories;
      this.navigationLinks = [];
      arrayOfCategories.forEach( (cat: any) => {
         this.navigationLinks.push({routerLink: ',category,' + cat.id , caption: cat.category});
      });
   }
}
