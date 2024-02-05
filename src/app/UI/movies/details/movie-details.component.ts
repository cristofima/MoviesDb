import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { MoviesService } from 'src/app/core/services/movies.service';
import { Movie } from 'src/app/shared/models/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;

  constructor(private moviesService: MoviesService, private actRouter: ActivatedRoute,
    private spinner: NgxSpinnerService, private titleService: Title) { }

  ngOnInit() {
    this.spinner.show();
    this.actRouter.params.subscribe(params => {
      this.loadData(params['id']);
    });
  }

  private loadData(movieId: number) {
    this.loadMovieDetails(movieId);
    this.spinner.hide();
  }

  private loadMovieDetails(movieId: number) {
    this.moviesService.getMovieDetails(movieId).subscribe(data => {
      this.movie = data;
      this.titleService.setTitle(`${this.movie.title} | Movies Db`);
    });
  }

}
