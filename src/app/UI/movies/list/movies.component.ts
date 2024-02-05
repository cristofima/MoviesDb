import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MovieFilter } from 'src/app/shared/models/movie-filter';
import { MoviesService } from 'src/app/core/services/movies.service';
import { Title } from '@angular/platform-browser';
import { Genre, Movie } from 'src/app/shared/models/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];
  pageNumber = 1;
  genres: Genre[] = [];

  formGroup: UntypedFormGroup;

  moviesFilter: MovieFilter

  constructor(private moviesService: MoviesService, private actRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder, private toastrService: ToastrService, private titleService: Title) {
    this.titleService.setTitle("Movies Db");
    this.initForm();
  }

  private initForm() {
    let today = new Date();

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
    this.moviesService.getGenres().subscribe((res: any[]) => {
      this.genres = res;
    });

    this.actRoute.queryParamMap.subscribe(params => {
      if (params.has('page')) {
        let num = Number(params.get('page'));
        if (!isNaN(num)) {
          this.pageNumber = num;
        }
      } else {
        this.pageNumber = 1;
      }

      let hasFilter = false;

      if (params.has('genreId')) {
        let genreId = Number(params.get('genreId'));
        if (!isNaN(genreId) && genreId > 0) {
          this.formGroup.controls['genreId'].setValue(genreId);
          hasFilter = true;
        }
      }

      if (params.has('year')) {
        let year = Number(params.get('year'));
        if (!isNaN(year) && year > 0) {
          this.formGroup.controls['year'].setValue(year);
          hasFilter = true;
        }
      }

      if (params.has('language')) {
        let language = params.get('language');
        if (language == 'es' || language == 'en') {
          this.formGroup.controls['language'].setValue(language);
          hasFilter = true;
        }
      }

      if (hasFilter) {
        this.filterMovies();
      } else {
        this.loadMovies();
      }
    });
  }

  public loadMovies(hasFilter?: boolean) {
    this.moviesService.getMovies(this.pageNumber, this.moviesFilter).subscribe(data => {
      this.movies = data;
      if (hasFilter) {
        this.toastrService.success('Filters applied');
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
