import { Component } from '@angular/core';

// Services
import { SharedDataService } from '../../_services';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(public sharedData: SharedDataService) {}
}
