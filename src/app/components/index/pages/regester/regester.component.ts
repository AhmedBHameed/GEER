import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../_services/auth.service';

import { newRegister } from './newregister.interface';

declare var $:any;
declare var CryptoJS: any;
@Component({
  selector: 'app-regester',
  templateUrl: './regester.component.html',
  styleUrls: ['./regester.component.css'],
  providers: [ AuthService ]
})
export class RegesterComponent implements OnInit {
  title: string = 'New registration';
  class: string = 'fa fa-pencil';

  loading: boolean = false;
  msg: string;

  form: FormGroup;
  submitted: boolean;
  registration: newRegister;
  defaultAvatar: string = '';
  respond: any;

  constructor(private fb: FormBuilder, private as: AuthService, private router: Router, private headTitle: Title, private ar: ActivatedRoute){ }


  ngOnInit() {
    this.headTitle.setTitle(this.ar.snapshot.data['title']);
    this.form = this.fb.group({
      us_username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      us_email: new FormControl('', Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*")])),
      us_password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      us_retype_password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      us_image: new FormControl(''),
      us_gender: new FormControl('', Validators.required),
      us_about: new FormControl(''),
      us_policies: new FormControl(false, Validators.pattern('true')),
      us_reg_date: new FormControl( new Date().toISOString().substr(0, new Date().toISOString().indexOf('T')) )
    })
  }

  chooseImage(e){
    if (e.target.files && e.target.files[0] && e.target.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e : any) => {        
        $('.imagePreview').attr('src', e.target.result).hide().fadeIn(300);
        this.defaultAvatar = e.target.result;
      }
    }else{
      this.defaultAvatar = '';
      $('.imagePreview').attr('src', 'assets/img/avatar/non-avatar.jpg').hide().fadeIn(300);
    }
  }

  fieldsCheck(){
    if(this.form.value['us_password'] === this.form.value['us_retype_password']){
      this.form.value['us_password'] = CryptoJS.SHA256(this.form.value['us_password']).toString();
      delete this.form.value.us_retype_password;
      return true;
    }else{
      this.msg = "Passwords not matches!";
      $('.loginError').hide().fadeIn(300);
    }
  }

  save(model: newRegister, isValid: boolean){
    this.submitted = true;
    if(isValid == true && this.fieldsCheck()){
      delete this.form.value.us_policies;
      this.form.value['us_image'] = this.defaultAvatar;
      this.loading = true;
      $('.loginError, .loginSuccessful').hide();
      this.as.signIn(model).subscribe(
        (data) => {
          this.respond = data.json();
          if(typeof this.respond.error != 'undefined'){
            this.loading = false;
            $('.loginError').hide().fadeIn(300);
            this.msg = this.respond.error;
          }else{
            this.msg = this.respond.successful;
            this.loading = false;
            localStorage.setItem('token', this.respond.token);
            setTimeout( ()=>{ this.router.navigate(['']) }, 3000);
            $('.loginSuccessful').hide().fadeIn(300);
          }
        })
        // console.log(model, isValid);
    }
  }
  
}
