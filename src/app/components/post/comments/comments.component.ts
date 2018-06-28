import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FunctionsService } from '../../../_services/_functions/functions.service';
import { DataService } from '../../../_services/data.service';
import { AuthService } from '../../../_services/auth.service';

declare var $: any;
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [ DataService, AuthService ]
})
export class CommentsComponent implements OnInit {
  title: string = "Comments";
  title2: string = "Add comment";
  comments       : any = null;
  toShow    : boolean;
  msg       : string;
  notification    : string;
  url: string;
  postId         : any;
  // { itemsPerPage: perPage, currentPage: p, totalItems: totalRows };
  
  currentPage     : number = 1;
  perPage         : number = 15;
  opt = {
    itemsPerPage  : this.perPage,
    currentPage   : this.currentPage,
    totalItems    : 0
  }
  page: number = 1;

  addingComment  : boolean = false;
  userData       : any;
  form           : FormGroup;
  submitted      : boolean = false;
  constructor(private router: Router, private fn:FunctionsService, private auth: AuthService, private dataService: DataService, private el: ElementRef, private id: ActivatedRoute, private fb: FormBuilder) { }

  pagination(e){
    this.dataService.getCommentsData(this.postId,e,this.perPage).subscribe(
      (data) => {
        this.comments = data.json();
        this.opt.totalItems = this.comments.pop().totalRows;
      }
    );
    this.opt.currentPage = e;
  }

  addComment(isValid, el){
    // console.log(el);
    let word = new RegExp(/\w+/,"g");
    if(isValid && word.test(this.form.value.co_comment)){
      this.form.value.post_id = this.postId;
      this.form.value.user_id = this.userData.us_user_id;      
      this.form.value.co_comment = this.form.value.co_comment.replace(/\s{2,}/g,' ');
      this.dataService.postComment(this.form.value).subscribe(
        (res)=>{
          let respond = res.json();
          this.notification = respond.success;
          if(this.comments.length == 0){
            this.opt.totalItems++;
            this.toShow = true;
            this.submitted = false;
          }
          this.comments.unshift(respond.data);
          this.submitted = true;
        });
    }
  }


  ngOnInit() {
    console.log(this.router.url);
    
    this.postId = this.id.snapshot.params['id'];
    this.url = this.fn.url;
    this.dataService.getCommentsData(this.postId,this.page,this.perPage).subscribe(
      (data) => {
        this.comments = data.json();
        if(typeof this.comments[0].error == "string"){
          this.toShow = false;
          this.msg = this.comments[0].error;
          this.comments = [];         
        }else{
          this.toShow = true;
          this.opt.totalItems = this.comments.pop().totalRows;          
        }
      });
    // ============ add comment section ==============
      if(this.fn.getToken()){
        // this.auth.getUserDataforComment().subscribe(
        //   (res)=>{
        //     let response = res.json();
        //     if(typeof response.success == "string")
        //       this.addingComment = true;
        //       this.userData = response.userdata;            
        //   });
        this.form = this.fb.group({
          co_comment: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
          token: new FormControl(localStorage.getItem('token'))
        });
      }


  }
}
