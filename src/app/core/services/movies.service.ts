import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MovieFilter } from '../../shared/models/movie-filter';

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

  getGenres(){
    return this.getQuery('genre/movie/list').pipe(
      map(data => data['genres'])
    );
  }

  getMovies(pageNumber = 1, filter?: MovieFilter) {
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > 500) {
      pageNumber = 500;
    }

    let queryString = `page=${pageNumber}`;
    if (filter) {
      if(filter.language){
        queryString += `&language=${filter.language}`;
      }

      if(filter.year){
        queryString += `&primary_release_year=${filter.year}`;
      }

      if(filter.genreId){
        queryString += `&with_genres=${filter.genreId}`;
      }

      if(filter.voteAverageGte){
        queryString += `&vote_average.gte=${filter.voteAverageGte / 10}`;
      }
    }

    return this.getQuery('discover/movie', queryString).pipe(
      map(data => data['results'])
    );
  }

  getMovieDetails(movieId: number) {
    return this.getQuery(`movie/${movieId}`);
  }

  getMovieVideos(movieId: number) {
    return this.getQuery(`movie/${movieId}/videos`).pipe(
      map(data => data['results'])
    );
  }

  getSimilarMovies(movieId: number) {
    return this.getQuery(`movie/${movieId}/similar`).pipe(
      map(data => data['results'])
    );
  }
}
