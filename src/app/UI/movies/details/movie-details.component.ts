import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { MoviesService } from 'src/app/core/services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: any;
  similarMovies: any[] = [];
  videos: any[] = [];

  constructor(private moviesService: MoviesService, private actRouter: ActivatedRoute,
    private sanitizer: DomSanitizer, private spinner: NgxSpinnerService, private titleService: Title) { }

  ngOnInit() {
    this.spinner.show();
    this.actRouter.params.subscribe(params => {
      this.resetData();
      this.loadData(params['id']);
    });
  }

  private loadData(movieId: number) {
    this.loadMovieDetails(movieId);
    this.loadSimilarMovies(movieId);
    this.loadMovieVideos(movieId);
    this.spinner.hide();
  }

  private resetData() {
    this.videos = [];
    this.similarMovies = [];
  }

  private loadMovieDetails(movieId: number) {
    this.moviesService.getMovieDetails(movieId).subscribe(data => {
      this.movie = data;
      this.titleService.setTitle(`${this.movie.title} | Movies Db`);
    });
  }

  private loadSimilarMovies(movieId: number) {
    this.moviesService.getSimilarMovies(movieId).subscribe(data => {
      this.similarMovies = data;
    });
  }

  private loadMovieVideos(movieId: number) {
    this.moviesService.getMovieVideos(movieId).subscribe(data => {
      this.videos = data.filter(function (video) {
        return video.type === "Trailer";
      });
    });
  }

  getVideoUrl(key: string) {
    let url = 'https://www.youtube.com/embed/' + key;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
