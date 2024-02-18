import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { GlobalHttpInterceptor } from "./core/interceptors/global-http.interceptor";

import { NgxSpinnerModule } from "ngx-spinner";
import { NgHttpCachingConfig, NgHttpCachingLocalStorage, NgHttpCachingModule } from "ng-http-caching";

import { PageNotFoundComponent } from "./shared/components/error-pages/page-not-found/page-not-found.component";
import { SharedModule } from "./shared/shared.module";
import { NgCircleProgressModule } from "ng-circle-progress";

const ngHttpCachingConfig: NgHttpCachingConfig = {
  store: new NgHttpCachingLocalStorage()
};

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgHttpCachingModule.forRoot(ngHttpCachingConfig),
    NgxSpinnerModule,
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
    }),
    SharedModule
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
