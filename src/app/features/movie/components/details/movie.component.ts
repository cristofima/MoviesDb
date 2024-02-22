import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  public movieDetailsCallback: Function;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieDetailsCallback = this.getMovieDetails.bind(this);
  }

  private getMovieDetails(id: number) {
    return this.movieService.getMovieDetails(id).toPromise();
  }
}
