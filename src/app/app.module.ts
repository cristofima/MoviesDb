import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/list/movies.component';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './error-pages/page-not-found/page-not-found.component';
import { MovieDetailsComponent } from './movies/details/movie-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    PageNotFoundComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
