import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
id: number;
  name: string;
  status: string;
  constructor(private route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];
    this.name = route.snapshot.params['name'];
    this.status = route.snapshot.params['status'];
  }

  ngOnInit() {
  }

}
