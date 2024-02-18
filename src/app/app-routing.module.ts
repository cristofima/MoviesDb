import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/error-pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./UI/home/home.module').then(m => m.HomeModule) },
  { path: 'movie', loadChildren: () => import('./UI/details/movie/movie.module').then(m => m.MovieModule) },
  { path: 'collection', loadChildren: () => import('./UI/details/collection/collection.module').then(m => m.CollectionModule) },
  { path: 'error-404', component: PageNotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
