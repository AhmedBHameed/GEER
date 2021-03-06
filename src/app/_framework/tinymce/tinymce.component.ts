import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { environment } from '../../../environments/environment';

import { codesampleLanguages } from './supported-languages';

declare var tinymce: any;
@Component({
  selector: 'tinymce',
  templateUrl: './tinymce.component.html',
  styleUrls: [ './tinymce.component.css' ],
  providers: [{ 
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TinymceComponent),
    multi: true
  }]
})
export class TinymceComponent implements OnDestroy, ControlValueAccessor {
  onChange: any = (v: any) => {};
  onTouched: any = (v: any) => {};

  tinyMCE: any = tinymce;

  tinyMCEInit(initContent: string) {
    if (this.tinyMCE) {
      this.tinyMCE.baseURL = window.location.origin + '/assets/tinymce';
      this.tinyMCE.init({
          skin_url: window.location.origin + '/assets/tinymce/skins/lightgray/',
          selector: '.tinymce',
          height: 500,
          theme: 'modern',
          branding: false,
          browser_spellcheck: true,
          plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars code fullscreen',
            'insertdatetime media nonbreaking save table contextmenu directionality',
            'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help'
          ],
          toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify',
          toolbar2: 'bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons | codesample help',
          codesample_languages: codesampleLanguages,
          codesample_content_css: '/assets/css/prism.css',
          setup: (editor: any) => {
            editor.on('Change keyup dirty', () => {
              this.onChange(encodeURIComponent(editor.getContent()));
            });
          },
          file_browser_callback: (field_name, url, type, win) => {
            window.onmessage = (event) => {
              var evt = evt || window.event;
              win.document.getElementById(field_name).value = evt.data;
              this.tinyMCE.activeEditor.windowManager.close();
            };
  
            this.tinyMCE.activeEditor.windowManager.open({
              title : 'Image Manager',
              width : 520,
              height : 400,
              url : environment.imageManager,
            },
            {
              window : win,
              input : field_name
            });
            return false;
          }
      });
    }
    this.tinyMCE.activeEditor.setContent(decodeURIComponent(initContent));
  }
  /**
   * Summary: Destroy tinyMCE.
   * 
   * Description: Destroy tinyMCE after closing modal.
   * 
   * @version       1.0.0
   * @access        public
   *
   * @return {void}
  **/
  ngOnDestroy() {
    this.tinyMCE.remove();
  }

  // Allows Angular to update the model [form <-- To].
  writeValue(value: string): void {
    this.tinyMCEInit(value);
  }

  // Allows Angular to register a function to call when the model [componenet --> NgModel] changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: () => void): void { this.onChange = fn; }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

}