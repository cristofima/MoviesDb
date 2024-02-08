import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { DominantColorService } from 'src/app/core/services/dominant-color.service';
import { MoviesService } from 'src/app/core/services/movies.service';
import { Movie } from 'src/app/shared/models/movie.model';
import { ColorUtil } from 'src/app/shared/utils/color.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;
  posterImgDominantColor: string;
  firstBackgroundImg: string;
  secondBackgroundImg: string;

  constructor(private moviesService: MoviesService, private actRouter: ActivatedRoute,
    private spinner: NgxSpinnerService, private titleService: Title, private dominantColorService: DominantColorService) { }

  ngOnInit() {
    this.spinner.show();
    this.actRouter.params.subscribe(params => {
      this.loadMovieDetails(params['id']);
    });
  }

  private loadMovieDetails(movieId: number) {
    this.moviesService.getMovieDetails(movieId).subscribe(data => {
      this.spinner.hide();
      this.movie = data;
      this.getDominantColor();
      this.titleService.setTitle(`${this.movie.title} | Movies Db`);
    }, () => {
      this.spinner.hide();
    });
  }

  private async getDominantColor() {
    let baseUrl = environment.production ? "https://image.tmdb.org" : "image";
    let imgUrl = `${baseUrl}/t/p/original${this.movie.posterPath}`;
    this.posterImgDominantColor = await this.dominantColorService.getDominantColor(imgUrl);
    this.firstBackgroundImg = `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${this.movie.backdropPath})`;

    let rgbColor = ColorUtil.hexToRgb(this.posterImgDominantColor);
    let rgbString = `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;

    this.secondBackgroundImg = `linear-gradient(to right, rgba(${rgbString}, 1) calc((50vw - 170px) - 340px), rgba(${rgbString}, 0.84) 50%, rgba(${rgbString}, 0.84) 100%)`;
  }

}
