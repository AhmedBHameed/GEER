import {
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import {
  environment
} from '../../../environments/environment';


declare var tinymce:any;
@Component({
  selector: 'tinymce',
  templateUrl: './tinymce.component.html',
  styleUrls: [ './tinymce.component.css' ]
})
export class TinymceComponent implements AfterViewInit, OnDestroy {
  @Output() onEditorKeyup = new EventEmitter<any>();
  @Input() content:any;
  editor;

  ngAfterViewInit() {
    console.log();
    
    tinymce.init({
        skin_url: '../../../../assets/skins/lightgray',
        selector: '.tinymce',
        height: 500,
        theme: 'modern',
        plugins: [
          'advlist autolink lists link image charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help'
        ],
        toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify',
        toolbar2: 'bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons | codesample help',
        setup: editor => {
          this.editor = editor;
          editor.on('Change', () => {
            const content = editor.getContent();
            this.onEditorKeyup.emit(content);
          });
          editor.on('Keyup', () => {
            const content = editor.getContent();
            this.onEditorKeyup.emit(content);
          });
        },
        file_browser_callback: (field_name, url, type, win)=>{
          window.onmessage = (event)=>{
            var evt = evt || window.event;
            win.document.getElementById(field_name).value = evt.data;
            tinymce.activeEditor.windowManager.close();
          };

          tinymce.activeEditor.windowManager.open({
            title : 'Image Manager',
            width : 520,
            height : 400,
            url : environment.backendUrl + 'filemanager/',
          },
          {
            window : win,
            input : field_name
          });
          return false;
        }
    });
    if(this.content != null){
      tinymce.activeEditor.setContent(this.content.po_post);
    }
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

}