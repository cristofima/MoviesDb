import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { PageNotFoundComponent } from './error-pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: "movies", component: MoviesComponent },
  { path: "", pathMatch: "full", redirectTo: "movies" },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
