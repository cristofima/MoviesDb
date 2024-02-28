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
  @Input() sizeformat: 'small' | 'medium' | 'large' = 'large';

  posterSize = 'w342';
  fontSize = '1em';
  dateKey = 'releaseDate';
  titleFontSize = 15;
  bottomPosition = '-15px';
  minImgHeight = '223px';

  ngOnInit(): void {
    if(this.sizeformat === 'small'){
      this.posterSize = 'w154';
      this.fontSize = '0.9em';
      this.titleFontSize = 13;
      this.bottomPosition = '-20px';
    }else if(this.sizeformat === 'medium'){
      this.posterSize = 'w185';
      this.fontSize = '0.93em';
      this.bottomPosition = '-20px';
    }else if(this.sizeformat === 'large'){
      this.minImgHeight = '457px';
    }

    if('firstAirDate' in this.media){
      this.dateKey = 'firstAirDate';
    }
  }
}
