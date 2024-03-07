import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from "@angular/core";

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

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localePt from '@angular/common/locales/pt';
import localeFr from '@angular/common/locales/fr';
import localeDe from '@angular/common/locales/de';
import localeIt from '@angular/common/locales/it';
import localeRu from '@angular/common/locales/ru';

const ngHttpCachingConfig: NgHttpCachingConfig = {
  store: new NgHttpCachingLocalStorage()
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

registerLocaleData(localeEs, 'es-MX');
registerLocaleData(localePt, 'pt-PT');
registerLocaleData(localeFr, 'fr-FR');
registerLocaleData(localeDe, 'de-DE');
registerLocaleData(localeIt, 'it-IT');
registerLocaleData(localeRu, 'ru-RU');

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
