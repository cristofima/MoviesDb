import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/list/movies.component';

import { GlobalHttpInterceptor } from './services/global-http.interceptor';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './error-pages/page-not-found/page-not-found.component';
import { MovieDetailsComponent } from './movies/details/movie-details.component';
import { TimePipe } from './pipes/time.pipe';
import { BorderClassPipe } from './pipes/border-class.pipe';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { MovieCreateComponent } from './movies/create/movie-create.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    PageNotFoundComponent,
    MovieDetailsComponent,
    MovieCreateComponent,
    TimePipe,
    BorderClassPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPaginationModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#D8CFCD",
      innerStrokeColor: "#D8CFCD",
      animationDuration: 300,
      animation: true,
      showSubtitle: false,
      unitsFontSize: '30',
      titleFontSize: '30',
      showZeroOuterStroke: false
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: GlobalHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
