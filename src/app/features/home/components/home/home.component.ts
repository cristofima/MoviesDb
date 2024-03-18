import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HomeService } from '@/features/home/services/home.service';

interface TabsAction {
  buttonName: string;
  callback: Function;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tabsActionTrending: TabsAction[] = [];
  tabsActionUpcoming: TabsAction[] = [];
  tabsActionPopular: TabsAction[] = [];

  constructor(private homeService: HomeService, private titleService: Title) {
    this.titleService.setTitle("Home | Movies Db");
  }

  ngOnInit() {
    this.tabsActionTrending = [
      {
        buttonName: 'Today',
        callback: this.loadTrendingToday.bind(this)
      },
      {
        buttonName: 'ThisWeek',
        callback: this.loadTrendingThisWeek.bind(this)
      }
    ];

    this.tabsActionUpcoming = [
      {
        buttonName: 'Movies',
        callback: this.loadUpcomingMovies.bind(this)
      },
      {
        buttonName: 'TVShows',
        callback: this.loadUpcomingTV.bind(this)
      }
    ];

    this.tabsActionPopular = [
      {
        buttonName: 'Streaming',
        callback: this.loadPopularStreaming.bind(this)
      },
      {
        buttonName: 'OnTV',
        callback: this.loadPopularOnTV.bind(this)
      },
      {
        buttonName: 'InTheaters',
        callback: this.loadPopularInTheaters.bind(this)
      }
    ];
  }

  private async loadTrendingToday(){
    return await this.homeService.getTrendingMedia('day').toPromise();
  }

  private async loadTrendingThisWeek(){
    return await this.homeService.getTrendingMedia('week').toPromise();
  }

  private async loadUpcomingMovies(){
    return await this.homeService.getUpcomingMedia('movie').toPromise();
  }

  private async loadUpcomingTV(){
    return await this.homeService.getUpcomingMedia('tv').toPromise();
  }

  private async loadPopularStreaming(){
    return await this.homeService.getPopularStreaming().toPromise();
  }

  private async loadPopularOnTV(){
    return await this.homeService.getPopularMedia('tv').toPromise();
  }

  private async loadPopularInTheaters(){
    return await this.homeService.getPopularMedia('theater').toPromise();
  }

}
