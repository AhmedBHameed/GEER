import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() option: any;
  @Output() onPageClicked = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {  }
  pagination(e){
    this.option.currentPage = e;
    this.onPageClicked.emit(e);
  }

}
