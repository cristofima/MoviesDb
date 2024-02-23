import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService, private titleService: Title) {
    this.titleService.setTitle("Movies Db");
  }

  ngOnInit() {
    
  }

  searchMedia() {
    
  }

}
