import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../_services/global.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],

})
export class FooterComponent implements OnInit {
  constructor(public gs: GlobalService) { }

  ngOnInit() {  }

}
