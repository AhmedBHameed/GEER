import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

declare var $:any;
@Component({
  selector: 'tags-input',
  templateUrl: './tagsinput.component.html',
  styleUrls: ['./tagsinput.component.css']
})
export class TagsinputComponent implements OnInit, OnDestroy {
  @Input() defaultTags:Array<any>
  @Input() idname:string;
  @Output() onAddingTags = new EventEmitter<any>();
  tags:Array<any>=[];
  constructor() { }

  ngOnInit() {
    $('.tagsInput').tagsinput('items');
    $('.tagsInput').tagsinput({
      confirmKeys: [13, 44]
    });

    $('.tagsInput').tagsinput({
      maxChars: 15
    });
    this.events();
  }
  events(){
    
    $('.tagsInput').on({
      'itemAdded': (event) => {
        this.tags.push(event.item);
        this.onAddingTags.emit( this.tags );
      },
      'itemRemoved': (event) => {
        let index = this.tags.indexOf(event.item);
        this.tags.splice(index,1);
        this.onAddingTags.emit( this.tags );
      }
    });
  }
  ngOnDestroy(){
    this.tags = null;
    $('.tagsInput').tagsinput('destroy');
  }



}
