import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/models/movie.model';
import { TV } from 'src/app/core/models/tv.model';

@Component({
  selector: 'app-movie-poster',
  templateUrl: './movie-poster.component.html',
  styleUrls: ['./movie-poster.component.scss']
})
export class MoviePosterComponent implements OnInit {

  @Input({ required: true }) media: Movie | TV;
  @Input() showSmallFormat = false;

  posterSize = 'w342';
  fontSize = '1em';
  dateKey = 'releaseDate';

  ngOnInit(): void {
    if(this.showSmallFormat){
      this.posterSize = 'w154';
      this.fontSize = '0.9em';
    }

    if('firstAirDate' in this.media){
      this.dateKey = 'firstAirDate';
    }
  }
}
