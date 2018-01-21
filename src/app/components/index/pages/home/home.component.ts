import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private title: Title, private router: ActivatedRoute) { }

  ngOnInit() {
    this.title.setTitle(this.router.snapshot.data['title']);

  }

}
