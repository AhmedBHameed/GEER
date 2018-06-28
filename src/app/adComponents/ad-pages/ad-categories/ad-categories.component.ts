import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Services
import { FormsService, ValidatorsService } from '../../../_services/_forms';
import { BaseApis } from '../../../_services/base-apis';

// Graphql queries
import { gqlCategories } from '../../../_gql_queries/index';

import { FunctionsService } from '../../../_services/_functions/functions.service';
import { RequestsService } from '../../../_services/requests.service';
import { GlobalService } from '../../../_services/global.service';

@Component({
  selector: 'app-ad-categories',
  templateUrl: './ad-categories.component.html',
  styleUrls: ['./ad-categories.component.scss'],
  providers: [ FormsService ]
})
export class AdCategoriesComponent extends BaseApis implements OnInit {
  categoryForm    : FormGroup;
  submitType      : string = "Add";
  index           : number;
  submitted       : boolean = false;
  constructor(protected injector: Injector, private fs: FormsService) {
    super(injector);
  }

  ngOnInit() {
    this.categoryForm = this.fs.group([
        {key: 'id', defaultValue: '' },
        {key: 'category', defaultValue: '', validators: [ValidatorsService.required(), ValidatorsService.minLength(3)] },
        {key: 'date', defaultValue: ''}
    ]);

    if (!this.sharedData.categories.length) {
      this.httpService.post(gqlCategories).subscribe(
        (res: any) => {
          res = res.json();
          if (this.httpService.hasError(res)) {
            this.notiService.message(res);
            return false;
          }
          this.sharedData.categories = res.data.getCategories;
        },
        (err: any) => {
          console.error(err.json().errors[0]);
      });
    }
  }
  addCategory(newCategory: any, isValid) {
    this.submitted = true;
    let gqlAddCategory;
    if (!isValid) return false;
    if (this.submitType === 'Add') {
      gqlAddCategory = {
        query: `
          mutation {
            addCategory(category: "${newCategory.category}", token: "${this.authService.getToken()}"){
              id,
              category,
              date,
              ack {
                ok,
                message
              }
            }
          }
        `
      };
    } else {
      gqlAddCategory = {
        query: `
          mutation {
            updateCategory(id: ${newCategory.id}, category: "${newCategory.category}", token: "${this.authService.getToken()}" ){
              id,
              category,
              date,
              ack {
                ok,
                message
              }
            }
          }
        `
      };
    }
    this.httpService.post(gqlAddCategory).subscribe(
      (res: any) => {
        res = res.json();
        if (this.httpService.hasError(res)) {
          this.notiService.message(res);
          return false;
        }
        if (this.submitType === 'Add') {
          this.sharedData.categories.push(res.data.addCategory);
          this.notiService.message('New category successfully added');
        } else {
          this.sharedData.categories[this.index] = res.data.updateCategory;
          this.notiService.message('Category successfully updated');
        }
        this.cancel();
      },
      (err: any) => {
        console.error(err.json().errors[0]);
    });
  }

  delete(id, index) {
    const gqlDeleteCategory = {
      query: `
        mutation {
          deleteCategory(id: ${id}, token: "${this.authService.getToken()}") {
            ack {
              ok,
              message
            }
          }
        }
      `
    };
    this.httpService.post(gqlDeleteCategory).subscribe(
      (res: any) => {
        res = res.json();
        if (this.httpService.hasError(res)) {
          this.notiService.message(res);
          return false;
        }
        this.notiService.message(this.sharedData.categories[index].category + ' category successfully deleted');
        this.sharedData.categories = this.fs.removeRow(this.sharedData.categories, index);
      },
      (err: any) => {
        console.error(err.json().errors[0]);
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
