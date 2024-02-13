import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/core/services/movies.service';
import { Title } from '@angular/platform-browser';
import { Movie } from 'src/app/shared/models/movie.model';
import { PaginationModel } from 'src/app/shared/models/pagination.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];
  pageNumber = 1;

  search = '';
  maxResults = 0;

  constructor(private moviesService: MoviesService, private actRoute: ActivatedRoute, private titleService: Title) {
    this.titleService.setTitle("Movies Db");
  }

  ngOnInit() {
    this.loadParams();
  }

  private loadParams() {
    this.actRoute.queryParamMap.subscribe(params => {
      if (params.has('page')) {
        let num = Number(params.get('page'));
        if (!isNaN(num)) {
          this.pageNumber = num;
        }
      } else {
        this.pageNumber = 1;
      }

      this.loadMovies();
    });
  }

  public async paginateMovies() {
    let pagination: PaginationModel;
    if (!this.search || !this.search.trim()) {
      pagination = await this.moviesService.discoverMovies(this.pageNumber).toPromise();
    } else {
      pagination = await this.moviesService.searchMovies(this.pageNumber, this.search).toPromise();
    }

    this.movies = pagination.results;
    this.maxResults = pagination.totalResults;
  }

  public async searchMovies() {
    this.pageNumber = 1;
    if (!this.search || !this.search.trim()) return;

    let pagination = await this.moviesService.searchMovies(this.pageNumber, this.search).toPromise();
    this.movies = pagination.results;
    this.maxResults = pagination.totalResults;
  }

  public async loadMovies() {
    let pagination = await this.moviesService.discoverMovies(this.pageNumber).toPromise();
    this.movies = pagination.results;
    this.maxResults = pagination.totalResults;
  }

}
