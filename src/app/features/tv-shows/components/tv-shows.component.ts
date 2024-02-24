import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html'
})
export class TvShowsComponent {

  @Input() genreId: number;
}
