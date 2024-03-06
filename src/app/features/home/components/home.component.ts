import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HomeService } from '../services/home.service';
import { MinimalMedia } from '@/core/models/base-media.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  trendingMediaToday: MinimalMedia[] = [];
  trendingMediaThisWeek: MinimalMedia[] = [];

  upcomingMovies: MinimalMedia[] = [];
  upcomingTV: MinimalMedia[] = [];

  popularStreaming: MinimalMedia[] = [];
  popularOnTV: MinimalMedia[] = [];
  popularInTheaters: MinimalMedia[] = [];

  activeTrending = 1;
  activeUpcoming = 1;
  activePopular = 1;

  constructor(private homeService: HomeService, private titleService: Title) {
    this.titleService.setTitle("Home | Movies Db");
  }

  ngOnInit() {
    this.loadTrendingToday();
    this.loadTrendingThisWeek();
    this.loadUpcomingMovies();
    this.loadUpcomingTV();
    this.loadPopularStreaming();
    this.loadPopularOnTV();
    this.loadPopularInTheaters();
  }

  private async loadTrendingToday(){
    this.trendingMediaToday = await this.homeService.getTrendingMedia('day').toPromise();
  }

  private async loadTrendingThisWeek(){
    this.trendingMediaThisWeek = await this.homeService.getTrendingMedia('week').toPromise();
  }

  private async loadUpcomingMovies(){
    this.upcomingMovies = await this.homeService.getUpcomingMedia('movie').toPromise();
  }

  private async loadUpcomingTV(){
    this.upcomingTV = await this.homeService.getUpcomingMedia('tv').toPromise();
  }

  private async loadPopularStreaming(){
    this.popularStreaming = await this.homeService.getPopularStreaming().toPromise();
  }

  private async loadPopularOnTV(){
    this.popularOnTV = await this.homeService.getPopularMedia('tv').toPromise();
  }

  private async loadPopularInTheaters(){
    this.popularInTheaters = await this.homeService.getPopularMedia('theater').toPromise();
  }

}
