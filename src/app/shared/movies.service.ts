import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  private getQuery(query: string, params: string = '') {
    const url = `https://api.themoviedb.org/3/${query}`;

    const apiKey = '00d7fb865750066f0bee922febb0d108';

    params = `?${params}&api_key=${apiKey}`;

    return this.http.get(`${url}${params}`);
  }

  getMovies(pageNumber = 1) {
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > 500) {
      pageNumber = 500;
    }

    return this.getQuery('discover/movie', `page=${pageNumber}`).pipe(
      map(data => data['results'])
    );
  }

  getMovieDetails(movieId: number) {
    return this.getQuery(`movie/${movieId}`);
  }

  getMovieVideos(movieId: number) {
    return this.getQuery(`movie/${movieId}/videos`);
  }

  getSimilarMovies(movieId: number) {
    return this.getQuery(`movie/${movieId}/similar`);
  }
}
