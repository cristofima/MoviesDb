import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  getLanguage(){
    return localStorage.getItem('language') || 'en-US';
  }
}
