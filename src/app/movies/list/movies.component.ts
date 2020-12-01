import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../shared/movies.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieFilter } from '../../models/movie-filter';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: any[] = [];
  pageNumber = 1;
  genres: any[] = [];

  formGroup: FormGroup;

  moviesFilter: MovieFilter

  private readonly notifierService: NotifierService;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute,
    private formBuilder: FormBuilder, notifierService: NotifierService) {
    let today = new Date();

    this.notifierService = notifierService;
    this.formGroup = this.formBuilder.group({
      language: ['', []],
      genreId: ['', []],
      voteAverageGte: ['', [
        Validators.min(0), Validators.max(100)
      ]],
      year: ['', [
        Validators.min(1960), Validators.max(today.getFullYear())
      ]]
    });
  }

  ngOnInit() {
    this.loadParams();
  }

  private loadParams() {
    this.moviesService.getGenres().subscribe((res: any[])=>{
      this.genres = res;
    });

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

  public loadMovies(hasFilter?: boolean) {
    this.moviesService.getMovies(this.pageNumber, this.moviesFilter).subscribe(data => {
      this.movies = data;
      if (hasFilter) {
        this.notifierService.notify('success', 'Filtros aplicados');
      }
    });
  }

  public filterMovies() {
    this.pageNumber = 1;
    this.moviesFilter = {
      language: this.formGroup.controls.language.value,
      year: this.formGroup.controls.year.value,
      genreId: this.formGroup.controls.genreId.value,
      voteAverageGte: this.formGroup.controls.voteAverageGte.value
    };

    this.loadMovies(true);
  }

}
