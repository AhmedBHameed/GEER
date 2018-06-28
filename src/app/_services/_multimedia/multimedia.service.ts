import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  constructor() { }

  // e is the input type="file" | def default vaalue;
  chooseImage(e, def) {
    let base64 = null;
    if (e.target.files && e.target.files[0] && e.target.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      return new Promise((resolve, reject) => {
        reader.onload = (e) => {
          base64 = e.target['result'];
          resolve(base64);
        };
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(def);
      });
    }
  }
}
