import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/core/services/movies.service';
import { Title } from '@angular/platform-browser';
import { Movie } from 'src/app/core/models/movie.model';
import { PaginationModel } from 'src/app/core/models/pagination.model';
import { MovieFilter } from 'src/app/core/models/movie-filter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies: Movie[] = [];
  pageNumber = 1;
  pageSize = 20;

  search = '';
  private prevSearch = '';
  maxResults = 0;

  private filters: MovieFilter;

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

      if (params.has('genreId')) {
        let genreId = Number(params.get('genreId'));
        if (!isNaN(genreId)) {
          this.filters = new MovieFilter();
          this.filters.genreId = genreId;
        }
      }

      this.loadMovies();
    });
  }

  public async paginateMovies() {
    let pagination: PaginationModel;
    if (!this.search || !this.search.trim()) {
      pagination = await this.moviesService.discoverMovies(this.pageNumber, this.filters).toPromise();
    } else {
      pagination = await this.moviesService.searchMovies(this.pageNumber, this.search).toPromise();
    }

    this.movies = pagination.results;
    this.setMaxResults(pagination.totalPages);
  }

  public async searchMovies() {
    this.pageNumber = 1;
    this.filters = null;
    if (!this.search || !this.search.trim() || this.prevSearch == this.search.trim()) return;

    this.prevSearch = this.search = this.search.trim();

    let pagination = await this.moviesService.searchMovies(this.pageNumber, this.search).toPromise();
    this.movies = pagination.results;
    this.setMaxResults(pagination.totalPages);
  }

  public async loadMovies() {
    this.pageNumber = 1;
    let pagination = await this.moviesService.discoverMovies(this.pageNumber, this.filters).toPromise();
    this.movies = pagination.results;
    this.setMaxResults(pagination.totalPages);
  }

  private setMaxResults(totalPages: number) {
    if (totalPages >= 500) {
      this.maxResults = this.pageSize * 500;
    } else {
      this.maxResults = this.pageSize * totalPages;
    }
  }

}
