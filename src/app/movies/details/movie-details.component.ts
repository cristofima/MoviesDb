import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../shared/movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: any;
  similarMovies;

  constructor(private moviesService: MoviesService, private actRouter: ActivatedRoute) { }

  ngOnInit() {
    this.actRouter.params.subscribe(params => {
      this.loadMovieDetails(params['id']);
      this.loadSimilarMovies(params['id']);
    });
  }

  private loadMovieDetails(movieId: number) {
    this.moviesService.getMovieDetails(movieId).subscribe(data => {
      this.movie = data;
    });
  }

  private loadSimilarMovies(movieId: number) {
    this.moviesService.getSimilarMovies(movieId).subscribe(data => {
      this.similarMovies = data;
    });
  }

}
