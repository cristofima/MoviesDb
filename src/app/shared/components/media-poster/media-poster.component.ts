import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/models/movie.model';
import { TV } from 'src/app/core/models/tv.model';

@Component({
  selector: 'app-media-poster',
  templateUrl: './media-poster.component.html',
  styleUrls: ['./media-poster.component.scss']
})
export class MediaPosterComponent implements OnInit {

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
