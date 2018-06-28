import { Component, AfterViewInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

declare var $: any;
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements AfterViewInit {
  @Input() settings: any;
  baseUrl: string = environment.backendUrl;
  constructor() { }
  
  ngAfterViewInit() {
    $(".banner .typing").typed({
      strings: ["Hello.", "Looking for a good CMS.", "Then you are in the right place.", "Feel free dealling with our GEER services..."],
      typeSpeed: 80,
    });
  }
}
