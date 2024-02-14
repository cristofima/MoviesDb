import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './UI/home/home.component';
import { MovieDetailsComponent } from './UI/details/movie/movie.component';
import { CollectionDetailsComponent } from './UI/details/collection/collection.component';
import { PageNotFoundComponent } from './shared/components/error-pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'collection/:id', component: CollectionDetailsComponent },
  { path: 'error-404', component: PageNotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
