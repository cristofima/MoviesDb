import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TMDbService {

  private apiKey = environment.apiKey;
  private language: string;

  constructor(private http: HttpClient) {
    this.language = localStorage.getItem('language') || 'en-US';
  }

  public getQuery(query: string, params: string = '') {
    const url = `https://api.themoviedb.org/3/${query}`;

    params = `?api_key=${this.apiKey}&language=${this.language}&${params}`;

    return this.http.get(`${url}${params}`);
  }
}
