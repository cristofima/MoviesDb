import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss']
})
export class MovieCreateComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      title: ['', [
        Validators.required, Validators.minLength(3), Validators.maxLength(40)
      ]],
      releaseDate: ['', [
        Validators.required
      ]],
      overview: ['', [
        Validators.required
      ]],
      runtime: ['', [
        Validators.required, Validators.min(60)
      ]],
      revenue: ['', [
        Validators.required, Validators.min(1)
      ]],
      voteAverage: ['', [
        Validators.required, Validators.min(0), Validators.max(10)
      ]],
      genres: ['', [
        Validators.required
      ]],
      adult: [false, []]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    let title = this.formGroup.controls.title.value
    let releaseDate = this.formGroup.controls.releaseDate.value;
    let overview = this.formGroup.controls.overview.value;
    let runtime = this.formGroup.controls.runtime.value;
    let revenue = this.formGroup.controls.revenue.value;
    let voteAverage = this.formGroup.controls.voteAverage.value;
    let genres = this.formGroup.controls.genres.value;
    let adult = this.formGroup.controls.adult.value;

    let movieData = {
      title: title,
      releaseDate: releaseDate,
      overview: overview,
      runtime: runtime,
      revenue: revenue,
      voteAverage: voteAverage,
      genres: genres,
      adult: adult
    };

    console.log(movieData);
  }
}
