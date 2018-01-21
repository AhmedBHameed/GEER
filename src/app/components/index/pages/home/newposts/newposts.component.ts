import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../../../../../_services/_functions/functions.service';
import { DataService } from '../../../../../_services/data.service';
import { PipesPipe } from '../../../../../_pipes/pipes.pipe';
import { StriptagsPipe } from '../../../../../_pipes/striptags.pipe';

@Component({
  selector: 'app-newposts',
  templateUrl: './newposts.component.html',
  styleUrls: ['./newposts.component.css'],
  providers: [ DataService ]
})
export class NewpostsComponent implements OnInit {
  title = 'New Posts';
  newPosts: any;
  toShow: boolean = false;
  url: string;
  constructor(private fn:FunctionsService, private ds: DataService) { }

  ngOnInit() {
    this.url = this.fn.url;
    this.ds.getNewPostsData().subscribe(
      data => {
        if (data.json().success){
          this.newPosts = data.json().data;
          this.toShow = true;
        }
          // this.postParse();
      },
      (err)=>{
        this.fn.notify({
          type: 'danger',
          icon: 'fa fa-exclamation-triangle',
          title: 'Error',
          message: err.json().message
        });
      });
  }

  // postParse(){
  //   this.newPosts.forEach( (post, i) => this.newPosts[i].po_post = post.po_post.replace(/<.*?>/g,'') )
  // }

}
