import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionsService } from '../../../../../../_services/_functions/functions.service';
import { DataService } from '../../../../../../_services/data.service';

@Component({
  selector: 'app-getpost',
  templateUrl: './getpost.component.html',
  styleUrls: ['./getpost.component.css'],
  providers: [ DataService ]
})
export class GetpostComponent implements OnInit {
  url: string;
  toShow = false;
  postData: any;
  constructor(private fn:FunctionsService, private ar: ActivatedRoute, private dataService: DataService, private element: ElementRef) { }

  ngOnInit() {
    this.url = this.fn.url;
    this.dataService.getPostData(this.ar.snapshot.params['id']).subscribe(
      (data) => {
        this.postData = data.json();
        this.toShow = true;
      });
  }
}
