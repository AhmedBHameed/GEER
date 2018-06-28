import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../../../_services/_functions/functions.service';
import { TitleComponent } from '../../template/title/title.component';
import { DataService } from '../../../_services/data.service';

@Component({
  selector: 'app-lastcommants',
  templateUrl: './lastcommants.component.html',
  styleUrls: ['./lastcommants.component.css'],
  providers: [ DataService ]
})
export class LastcommantsComponent implements OnInit {
  title = ' Last 10 Comments';
  lastCommantsData: any;
  url: string;
  toShow: boolean = false;
  constructor(private fn:FunctionsService, private dataService: DataService) { }

  ngOnInit() {
    this.url = this.fn.url;
    this.dataService.getLastCommantsData().subscribe(
      data => {
        this.lastCommantsData = data.json();
        if(this.lastCommantsData)
        {
          this.toShow = true;
        }
      }
    )
  }

}
