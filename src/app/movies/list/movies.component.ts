import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../shared/movies.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieFilter } from '../../models/movie-filter';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: any[] = [];
  pageNumber = 1;

  formGroup: FormGroup;

  moviesFilter: MovieFilter

  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    let today = new Date();

    this.formGroup = this.formBuilder.group({
      language: ['', []],
      year: ['', [
        Validators.min(1960), Validators.max(today.getFullYear())
      ]]
    });
  }

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
    this.moviesService.getMovies(this.pageNumber, this.moviesFilter).subscribe(data => {
      this.movies = data;
    });
  }

  public filterMovies() {
    this.moviesFilter = {
      language: this.formGroup.controls.language.value,
      year: this.formGroup.controls.year.value
    };

    this.loadMovies();
  }

}
