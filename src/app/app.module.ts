import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { GlobalHttpInterceptor } from "./core/interceptors/global-http.interceptor";

import { NgHttpCachingConfig, NgHttpCachingLocalStorage, NgHttpCachingModule } from "ng-http-caching";

import { PageNotFoundComponent } from "./shared/components/error-pages/page-not-found/page-not-found.component";
import { SharedModule } from "./shared/shared.module";

import { NgCircleProgressModule } from "ng-circle-progress";
import { AppLanguagesModule } from "./app-languages.module";

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
    NgCircleProgressModule.forRoot({
      outerStrokeWidth: 12,
      titleColor: "white",
      unitsColor: "white",
      backgroundColor: "#081c22",
      animationDuration: 300,
      titleFontWeight: "700",
      unitsFontWeight: "700",
      animation: true,
      showSubtitle: false,
      showZeroOuterStroke: false,
      showInnerStroke: false
    }),
    AppLanguagesModule.forRoot(),
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
