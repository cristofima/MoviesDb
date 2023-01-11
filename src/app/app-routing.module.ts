import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './UI/movies/list/movies.component';
import { MovieDetailsComponent } from './UI/movies/details/movie-details.component';
import { PageNotFoundComponent } from './shared/components/error-pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'error-404', component: PageNotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'movies' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
