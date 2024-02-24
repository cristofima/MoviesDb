import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent {
  
  @Input() genreId: number;
}
