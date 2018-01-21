import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionsService } from '../../../../../_services/_functions/functions.service';
import { DataService } from '../../../../../_services/data.service';


@Component({
  selector: 'app-allcategories',
  templateUrl: './allcategories.component.html',
  styleUrls: ['./allcategories.component.css'],
  providers: [ DataService ]
})
export class AllcategoriesComponent implements OnInit {
  categoryPosts: any;
  url          : string;
  msg          : string;
  catId        : string;
  showMsg      :boolean = false;
  title        : string;
  constructor(private fn:FunctionsService, private dataService: DataService, private router: ActivatedRoute) {  }

  ngOnInit() {
    this.url = this.fn.url;
    this.router.params.subscribe(
      (data) => {
        this.catId = data['cat'];
        this.dataService.getCategoryPosts(this.catId).subscribe(
          (data) => {
            this.categoryPosts = data.json();
            if(typeof this.categoryPosts[0].error == 'string'){              
                this.showMsg = true;
                this.msg = this.categoryPosts[0].error;                
              }
            this.title = 'Category of ( ' + this.categoryPosts.pop().ca_category + ' )';
          });
      });
  }
  
}
