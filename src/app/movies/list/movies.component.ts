import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../shared/movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: any[] = [];
  pageNumber = 1;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadParams();
  }

  private loadParams() {
    this.route.queryParamMap.subscribe(params => {
      if (params.has('page')) {
        var num = Number(params.get('page'));

        if (!isNaN(num)) {
          this.pageNumber = num;
        }

      } else {
        this.pageNumber = 1;
      }

      this.loadMovies();
    });
  }

  public loadMovies() {
    this.moviesService.getMovies(this.pageNumber).subscribe(data => {
      this.movies = data;
    });
  }

}
