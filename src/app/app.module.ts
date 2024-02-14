import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { GlobalHttpInterceptor } from "./core/interceptors/global-http.interceptor";

import { TimePipe } from "./shared/pipes/time.pipe";
import { BorderClassPipe } from "./shared/pipes/border-class.pipe";
import { CertificationPipe } from './shared/pipes/certification.pipe';
import { VideoUrlPipe } from './shared/pipes/video-url.pipe';

import { ToastrModule } from 'ngx-toastr';
import { NgCircleProgressModule } from "ng-circle-progress";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgHttpCachingConfig, NgHttpCachingLocalStorage, NgHttpCachingModule } from "ng-http-caching";

import { HomeComponent } from "./UI/home/home.component";
import { MovieDetailsComponent } from "./UI/details/movie/movie.component";
import { CollectionDetailsComponent } from './UI/details/collection/collection.component';
import { PageNotFoundComponent } from "./shared/components/error-pages/page-not-found/page-not-found.component";
import { GenericDetailsComponent } from './shared/components/generic-details/generic-details.component';

const ngHttpCachingConfig: NgHttpCachingConfig = {
  store: new NgHttpCachingLocalStorage()
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    MovieDetailsComponent,
    TimePipe,
    BorderClassPipe,
    CertificationPipe,
    VideoUrlPipe,
    CollectionDetailsComponent,
    GenericDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgHttpCachingModule.forRoot(ngHttpCachingConfig),
    NgbPaginationModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true
    }),
    NgCircleProgressModule.forRoot({
      radius: 90,
      outerStrokeWidth: 12,
      innerStrokeWidth: 8,
      outerStrokeColor: "#D8CFCD",
      innerStrokeColor: "#D8CFCD",
      animationDuration: 300,
      animation: true,
      showSubtitle: false,
      unitsFontSize: "40",
      titleFontSize: "40",
      showZeroOuterStroke: false
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
