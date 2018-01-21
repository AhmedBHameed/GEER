import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsService, ValidatorsService } from '../../../_services/_functions/forms';
import { FunctionsService } from '../../../_services/_functions/functions.service';
import { RequestsService } from '../../../_services/requests.service';
import { GlobalService } from '../../../_services/global.service';

@Component({
  selector: 'app-ad-categories',
  templateUrl: './ad-categories.component.html',
  styleUrls: ['./ad-categories.component.css'],
  providers: [ FormsService, RequestsService ]
})
export class AdCategoriesComponent implements OnInit {
  categories      : any;
  categoryForm    : FormGroup;
  showForm        : boolean = false;
  submitType      : string = "Add";
  index           : number;
  submitted       : boolean = false;
  constructor(
    public funs: FunctionsService,
    private fs: FormsService,
    private req: RequestsService,
    public gs: GlobalService  
  ) { }

  ngOnInit() {
    this.categoryForm = this.fs.group([
        {key: 'id', defaultValue: '' },
        {key: 'category', defaultValue: '', validators: [ValidatorsService.required(), ValidatorsService.minLength(3)] }
    ]);
    const GraphQL_getCategories = {
      query: `
        {
          getCategories {
            id,
            category,
            date
          }
        }
    `};
    this.req.get(GraphQL_getCategories).subscribe(
      res => {
        const respond = res.json();
        if ( this.funs.hasError(respond) ) {
          return;
        }
        this.categories = respond.data.getCategories;
        this.showForm = true;
      },
      err => {
        this.funs.showErrorNote(err.json().errors[0]);
    });
  }
  addCategory(newCategory: any, isValid) {
    this.submitted = true;
    var GraphQL_mutateCategory;
    if (!isValid) return false;
    if (this.submitType == 'Add') {
        GraphQL_mutateCategory = {
        query: `
          mutation {
            addCategory(category: ${newCategory.categories}, token: ${this.funs.getToken()}){
              id,
              category,
              date,
              ack
            }
          }
        `
      };
    } else {
          GraphQL_mutateCategory = {
        query: `
          mutation {
            addCategory(category: ${newCategory.categories}, token: ${this.funs.getToken()}){
              id,
              category,
              date,
              ack
            }
          }
        `
      };
    }
    this.req.post(GraphQL_mutateCategory).subscribe(
      res => {
        const respond = res.json();
        if ( this.funs.hasError(respond) ) {
          return;
        }
        this.categories.push(respond.data.addCategory);
        this.funs.showSuccessNote('New category successfully added');
      },
      err => {
        this.funs.showErrorNote(err.json().errors[0]);
    });
  }
  delete(id, index) {
    const GrpahQL_deleteCategory = {
      query: `
        mutation {
          deleteCategory(id: ${id}) {
            ack
          }
        }
      `
    };
    this.req.get(GrpahQL_deleteCategory).subscribe(
      res => {
        const respond = res.json();
        if ( this.funs.hasError(respond) ) {
          return;
        }
        this.funs.showSuccessNote(this.categories[index].category + ' category successfully deleted');
        this.categories = this.fs.removeRow(this.categories, index);
      },
      err => {
        this.funs.showErrorNote(err.json().errors[0]);
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
