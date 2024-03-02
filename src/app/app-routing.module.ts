import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/error-pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'movie', loadChildren: () => import('./features/movie/movie.module').then(m => m.MovieModule) },
  { path: 'movies', loadChildren: () => import('./features/movies/movies.module').then(m => m.MoviesModule) },
  { path: 'tv', loadChildren: () => import('./features/tv/tv.module').then(m => m.TvModule) },
  { path: 'tv-shows', loadChildren: () => import('./features/tv-shows/tv-shows.module').then(m => m.TvShowsModule) },
  { path: 'people', loadChildren: () => import('./features/people/people.module').then(m => m.PeopleModule) },
  { path: 'person', loadChildren: () => import('./features/person/person.module').then(m => m.PersonModule) },
  { path: 'error-404', component: PageNotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
