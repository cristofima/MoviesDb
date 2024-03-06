import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from "@angular/core";
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { GlobalHttpInterceptor } from "./core/interceptors/global-http.interceptor";

import { NgHttpCachingConfig, NgHttpCachingLocalStorage, NgHttpCachingModule } from "ng-http-caching";

import { PageNotFoundComponent } from "./shared/components/error-pages/page-not-found/page-not-found.component";
import { SharedModule } from "./shared/shared.module";

import { NgCircleProgressModule } from "ng-circle-progress";
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { SettingsService } from "./core/services/settings.service";

const ngHttpCachingConfig: NgHttpCachingConfig = {
  store: new NgHttpCachingLocalStorage()
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

registerLocaleData(localeEs, 'es-MX');

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
    TranslateModule.forRoot({
      defaultLanguage: 'en-US',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingsService) => settingsService.getLanguage()
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
