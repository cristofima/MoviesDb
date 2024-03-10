import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import localePt from '@angular/common/locales/pt';
import localeFr from '@angular/common/locales/fr';
import localeDe from '@angular/common/locales/de';
import localeIt from '@angular/common/locales/it';
import localeRu from '@angular/common/locales/ru';
import localeZh from '@angular/common/locales/zh';
import localeJa from '@angular/common/locales/ja';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SettingsService } from "./core/services/settings.service";

registerLocaleData(localeEs, 'es-MX');
registerLocaleData(localePt, 'pt-PT');
registerLocaleData(localeFr, 'fr-FR');
registerLocaleData(localeDe, 'de-DE');
registerLocaleData(localeIt, 'it-IT');
registerLocaleData(localeRu, 'ru-RU');
registerLocaleData(localeZh, 'zh-CN');
registerLocaleData(localeJa, 'ja-JP');

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en-US',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [TranslateModule]
})
export class AppLanguagesModule {
  static forRoot(): ModuleWithProviders<AppLanguagesModule> {
    return {
      ngModule: AppLanguagesModule,
      providers: [
        {
          provide: LOCALE_ID,
          deps: [SettingsService],
          useFactory: (settingsService) => settingsService.getLanguage()
        }
      ]
    }
  }
}
