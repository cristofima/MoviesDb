import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  collapsed = true;
  selectedLanguage: string = 'en-US';
  languages = [
    { name: 'English', code: 'en-US' },
    { name: 'Spanish', code: 'es-MX' },
    { name: 'Portuguese', code: 'pt-PT' },
    { name: 'French', code: 'fr-FR' },
    { name: 'German', code: 'de-DE' },
    { name: 'Italian', code: 'it-IT' },
    { name: 'Russian', code: 'ru-RU' },
    { name: 'Chinese', code: 'zh-CN' },
    { name: 'Japanese', code: 'ja-JP' }
  ];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem('language') || 'en-US';
    this.translate.use(this.selectedLanguage);
    this.translateLanguageNames();
  }

  private async translateLanguageNames() {
    for(let i = 0; i < this.languages.length; i++) {
      this.languages[i].name = await this.translate.get(`Languages.${this.languages[i].name}`).toPromise();
    }

    this.languages.sort((a, b) => a.name.localeCompare(b.name));
  }

  onLanguageChange(code: string) {
    if(!code && this.selectedLanguage !== code) return;

    this.selectedLanguage = code;
    localStorage.setItem('language', code);
    window.location.reload();
  }
}
