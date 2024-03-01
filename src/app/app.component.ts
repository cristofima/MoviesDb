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
  laguages = [
    { name: 'English', code: 'en-US' },
    { name: 'Spanish', code: 'es-MX' }
  ];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem('language') || 'en-US';
    this.translate.use(this.selectedLanguage);
  }

  onLanguageChange(code: string) {
    if(!code && this.selectedLanguage !== code) return;

    this.selectedLanguage = code;
    localStorage.setItem('language', code);
    window.location.reload();
  }
}
