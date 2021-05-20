import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { GlobalHttpInterceptor } from "./core/interceptors/global-http.interceptor";

import { TimePipe } from "./shared/pipes/time.pipe";
import { BorderClassPipe } from "./shared/pipes/border-class.pipe";

import { NotifierModule } from "angular-notifier";
import { NgCircleProgressModule } from "ng-circle-progress";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";

import { MoviesComponent } from "./UI/movies/list/movies.component";
import { MovieDetailsComponent } from "./UI/movies/details/movie-details.component";
import { PageNotFoundComponent } from "./shared/components/error-pages/page-not-found/page-not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    PageNotFoundComponent,
    MovieDetailsComponent,
    TimePipe,
    BorderClassPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPaginationModule,
    NgxSpinnerModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: "right",
        },
        vertical: {
          position: "top",
        },
      },
      behaviour: {
        autoHide: 3000,
      },
    }),
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#D8CFCD",
      innerStrokeColor: "#D8CFCD",
      animationDuration: 300,
      animation: true,
      showSubtitle: false,
      unitsFontSize: "30",
      titleFontSize: "30",
      showZeroOuterStroke: false,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
