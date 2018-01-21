import { Component, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
import { FunctionsService } from '../../../../../_services/_functions/functions.service';
import { DataService } from '../../../../../_services/data.service';
import { PipesPipe } from '../../../../../_pipes/pipes.pipe';

declare var tour:any;
declare var $:any;
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [ DataService ]
})

export class CarouselComponent implements OnInit, AfterViewInit {
  $: any;
	carouselData:any;
  toShow = false;
  url:string;
  title = 'Hot Topics';
  carouselElements: any;
  //strip_tags() {
  //  this.carouselData.forEach(function (ele) {
  //    ele.post = ele.post.replace(/<.*?>/g, '');
  //  }.bind(this));
  //}

  //toHTML(){
  //  var domPraser = new DOMParser();
  //  this.carouselData.forEach(function(ele, i){
  //    ele.post = domPraser.parseFromString(ele.post, "text/html").querySelector('body').childNodes;
  //  }.bind(this))
  //  console.log(this.carouselData[4].post)
  //
  //  setTimeout(function(){
  //    this.el.nativeElement.querySelectorAll('.appendText').forEach(function(element, i){
  //      this.carouselData[i].post.forEach(function(ele){
  //        element.appendChild(ele);
  //      })
  //    }.bind(this))
  //  }.bind(this), 500)
  //}
  constructor(private fn: FunctionsService, private element: ElementRef, private dataService:DataService) {
  }

  ngOnInit() {
    this.url = this.fn.url;
    this.dataService.getCarouselData().subscribe(
      (data) => {
        this.carouselData = data.json().data;
      },
      (error)=> {console.log(error)}
    );
    
  }
  ngAfterViewInit(){
    tour('.tour').apply({"showArrows": false});
  }
}
