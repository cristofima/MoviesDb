import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Movie } from 'src/app/core/models/movie.model';
import { Collection } from 'src/app/core/models/collection.model';
import { Observable } from 'rxjs';
import { MovieUtil } from 'src/app/shared/utils/movie.util';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MovieFilter } from '../models/movie-filter';
import { PaginationModel } from '../models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class TMDbService {

  private apiKey = environment.apiKey

  constructor(private http: HttpClient) { }

  private getQuery(query: string, params: string = '') {
    const url = `https://api.themoviedb.org/3/${query}`;

    params = `?api_key=${this.apiKey}&${params}`;

    return this.http.get(`${url}${params}`);
  }

  searchMovies(pageNumber = 1, text: string): Observable<PaginationModel> {
    if (pageNumber < 1) {
      pageNumber = 1;
    }

    let queryString = `query=${text}&page=${pageNumber}`;

    return this.getQuery('search/movie', queryString).pipe(
      map(data => {
        return MovieUtil.getPaginationMovies(data);
      })
    );
  }

  discoverMovies(pageNumber = 1, filters?: MovieFilter): Observable<PaginationModel> {
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > 500) {
      pageNumber = 500;
    }

    let queryString = `page=${pageNumber}`;
    if (filters) {
      if (filters.year) {
        queryString += `&primary_release_year=${filters.year}`;
      }

      if (filters.genreId) {
        queryString += `&with_genres=${filters.genreId}`;
      }

      if (filters.voteAverageGte) {
        queryString += `&vote_average.gte=${filters.voteAverageGte / 10}`;
      }
    }

    return this.getQuery('discover/movie', queryString).pipe(
      map(data => {
        return MovieUtil.getPaginationMovies(data);
      })
    );
  }

  getMovieDetails(movieId: number): Observable<Movie> {
    return this.getQuery(`movie/${movieId}`, 'append_to_response=release_dates,recommendations,videos,credits,keywords')
      .pipe(
        map((data: any) => {
          return MovieUtil.getFullMovieData(data);
        })
      );
  }

  getCollectionDetails(collectionId: number): Observable<Collection> {
    return this.getQuery(`collection/${collectionId}`)
      .pipe(
        map((data: any) => {
          let voteAverage = 0;
          data.parts.forEach((el: any) => {
            voteAverage += el.vote_average;
          });

          voteAverage /= data.parts.length;

          return {
            id: data.id,
            name: data.name,
            overview: data.overview,
            posterPath: data.poster_path,
            backdropPath: data.backdrop_path,
            movies: data.parts.map((p: any) => MovieUtil.getFullMovieData(p, false)),
            voteAverage: voteAverage
          };
        })
      )
  }
}
