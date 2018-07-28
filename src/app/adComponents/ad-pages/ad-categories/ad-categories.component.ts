import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GqlQueryInterface, GraphtyService } from 'graphty';

// Services
import { FormsService, ValidatorsService } from '../../../_services/_forms';
import { BaseApis } from '../../../_services/base-apis';

// Graphql queries
import { gqlCategories } from '../../../_gql_queries';

import { FunctionsService } from '../../../_services/_functions/functions.service';
import { RequestsService } from '../../../_services/requests.service';
import { GlobalService } from '../../../_services/global.service';

@Component({
   selector: 'app-ad-categories',
   templateUrl: './ad-categories.component.html',
   styleUrls: ['./ad-categories.component.scss'],
   providers: [FormsService]
})
export class AdCategoriesComponent extends BaseApis implements OnInit {
   categoryForm: FormGroup;
   submitType: string = "Add";
   index: number;
   submitted: boolean = false;
   constructor(protected injector: Injector, private fs: FormsService, private graf: GraphtyService) {
      super(injector);
   }

   ngOnInit() {
      this.categoryForm = this.fs.group([
         { key: 'id', defaultValue: '' },
         { key: 'category', defaultValue: '', validators: [ValidatorsService.required(), ValidatorsService.minLength(3)] },
         { key: 'date', defaultValue: '' }
      ]);

      let categories: GqlQueryInterface = this.graf.stagnation({
         fun: {
            name: 'getCategories'
         },
         ret: ['id', 'category', 'date']
      });
      if (!this.sharedData.categories.length) {
         this.httpService.post(categories).subscribe(
            (res: any) => {
               this.sharedData.categories = res.getCategories;
            },
            (err: any) => {
               this.notiService.message(err.json().errors[0].message);
            });
      }
   }

   addCategory(newCategory: any, isValid) {
      this.submitted = true;
      let AddUpdateCategory: GqlQueryInterface;
      if (!isValid) return false;
      if (this.submitType === 'Add') {
         AddUpdateCategory = this.graf.mutation({
            fun: {
               name: 'addCategory',
               args: { category: newCategory.category, token: this.authService.getToken() }
            },
            ret: ['id', 'category', 'date', 'ack{ok,message}']
         });
      } else {
         AddUpdateCategory = this.graf.mutation({
            fun: {
               name: 'updateCategory',
               args: { id: newCategory.id, category: newCategory.category, token: this.authService.getToken() }
            },
            ret: ['id', 'category', 'date', 'ack{ok,message}']
         });
      }
      this.httpService.post(AddUpdateCategory).subscribe(
         (res: any) => {
            if (this.submitType === 'Add') {
               this.sharedData.categories.push(res.addCategory);
               this.notiService.message('New category successfully added');
            } else {
               this.sharedData.categories[this.index] = res.updateCategory;
               this.notiService.message('Category successfully updated');
            }
            this.cancel();
         },
         (err: any) => {
            this.notiService.message(err.json().errors[0].message);
         });
   }

   delete(id, index) {
      let deleteCategory: GqlQueryInterface = this.graf.mutation({
         fun: {
            name: 'deleteCategory',
            args: { id: id, token: this.authService.getToken() }
         },
         ret: ['ack {ok,message}']
      });

      this.httpService.post(deleteCategory).subscribe(
         (res: any) => {
            this.notiService.message(this.sharedData.categories[index].category + ' category successfully deleted');
            this.sharedData.categories = this.fs.removeRow(this.sharedData.categories, index);
         },
         (err: any) => {
            this.notiService.message(err.json().errors[0].message);
         });
   }

   update(data, index) {
      this.index = index;
      this.submitType = 'Update';
      this.categoryForm = this.fs.update(this.categoryForm, data);
   }
   cancel() {
      this.submitted = false;
      this.categoryForm = this.fs.reset(this.categoryForm);
      this.submitType = 'Add';
   }
}
