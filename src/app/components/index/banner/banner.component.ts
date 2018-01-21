import { Component, OnInit, Input } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @Input() config: any;
  constructor() { }
  ngOnInit() {
    $(".banner .typing").typed({
      strings: ["Hello.", "Looking for a good CMS.", "Then you are in the right place.", "Feel free dealling with our GEER services..."],
      typeSpeed: 80,
    });
  }
}
