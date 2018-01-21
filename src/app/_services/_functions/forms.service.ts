import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Injectable()
export class FormsService {
  form: any ={};
  constructor(private fb: FormBuilder) { }

  private build(obj){
    return this.fb.group(obj);
  }
  
  group(object){
    if(typeof object != 'object'){
      throw new Error('Invalid object. form can\'t be build');
    }
      for(let field in object){
        if(Array.isArray(object[field]['validators'])){
          this.form[object[field]["key"]] = new FormControl(object[field]['defaultValue'], Validators.compose( object[field]['validators'] ) );
        }else{
          this.form[object[field]["key"]] = new FormControl(object[field]['defaultValue']);
        }
      }
    return this.build(this.form);
  }
  set(object, updatedForm:any=null){
    if(typeof object != 'object'){
      throw new Error('Invalid object. form can\'t be set');
    }
    if(typeof updatedForm != null){
      for(let field in updatedForm) {
        if(!object.controls.hasOwnProperty(field) || updatedForm[field] == null ) continue;
        object.controls[field].setValue(updatedForm[field]);
      }
    }
    return object;
  }
  update(object, updatedForm:any=null){
    if(typeof object != 'object'){
      throw new Error('Invalid object. form can\'t be update');
    }
    if(typeof updatedForm != null){
      for(let field in updatedForm){
        if(!object.controls.hasOwnProperty(field) || updatedForm[field] == null ) continue;
        object.controls[field].patchValue(updatedForm[field]);
      }
    }
    return object;
  }
  reset(formGroup: FormGroup) {
    if (typeof formGroup != 'object') {
      throw new Error('Invalid object. form reset faild!');
    }
    // tslint:disable-next-line:forin
    for (let field in formGroup.controls) {
      formGroup.controls[field].patchValue('');
    }
    return formGroup;
  }
  addField(myForm: FormGroup, newName: string, object: any): any {
    myForm.addControl(newName, new FormControl(object[0].defaultValue, object[0].validators) );
    return myForm;
  }
  removeRow(formInfoCluster: any , index: number) {
    if(typeof formInfoCluster != 'object') return formInfoCluster;
    formInfoCluster.splice(index, 1);
    return formInfoCluster;
  }

}
