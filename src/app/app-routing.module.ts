import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  { path: "movies", component: MoviesComponent },
  { path: "", pathMatch: "full", redirectTo: "movies" },
  { path: "**", pathMatch: "full", redirectTo: "movies" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
