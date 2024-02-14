import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MovieFilter } from '../models/movie-filter';
import { environment } from 'src/environments/environment';
import { Genre, MinimalCollection, Movie, SimilarMovie } from 'src/app/core/models/movie.model';
import { Collection } from 'src/app/core/models/collection.model';
import { Observable } from 'rxjs';
import { PaginationModel } from 'src/app/core/models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiKey = environment.apiKey

  constructor(private http: HttpClient) { }

  private getQuery(query: string, params: string = '') {
    const url = `https://api.themoviedb.org/3/${query}`;

    params = `?api_key=${this.apiKey}&${params}`;

    return this.http.get(`${url}${params}`);
  }

  getGenres(): Observable<Genre[]> {
    return this.getQuery('genre/movie/list').pipe(
      map(data => data['genres'])
    );
  }

  searchMovies(pageNumber = 1, text: string): Observable<PaginationModel> {
    if (pageNumber < 1) {
      pageNumber = 1;
    }

    let queryString = `query=${text}&page=${pageNumber}`;

    return this.getQuery('search/movie', queryString).pipe(
      map(data => {
        return this.getPaginationMovies(data);
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
        return this.getPaginationMovies(data);
      })
    );
  }

  private getPaginationMovies(data: any): PaginationModel {
    let movies = data['results'].map((movie: any) => {
      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        voteAverage: movie.vote_average
      };
    });

    return {
      page: data['page'],
      results: movies,
      totalPages: data['total_pages'],
      totalResults: data['total_results']
    };
  }

  getMovieDetails(movieId: number): Observable<Movie> {
    return this.getQuery(`movie/${movieId}`, 'append_to_response=release_dates,similar_movies,videos')
      .pipe(
        map((data: any) => {
          return this.getFullMovieData(data);
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
            movies: data.parts.map(p => this.getFullMovieData(p, false)),
            voteAverage: voteAverage
          };
        })
      )
  }

  private getFullMovieData(data: any, extractExtraData = true) {
    let movie: Movie = {
      id: data.id,
      title: data.title,
      overview: data.overview,
      posterPath: data.poster_path,
      backdropPath: data.backdrop_path,
      releaseDate: data.release_date,
      voteAverage: data.vote_average,
      runtime: data.runtime,
      budget: data.budget,
      revenue: data.revenue,
      genres: data.genres
    };

    if (extractExtraData) {
      const { certification, collection, similarMovies, trailerKey } = this.getExtraMovieData(data);
      movie.certification = certification;
      movie.collection = collection;
      movie.similarMovies = similarMovies;
      movie.trailerKey = trailerKey;
    }

    return movie;
  }

  private getExtraMovieData(data: any) {
    let certification: string;
    if (data.release_dates && data.release_dates.results) {
      data.release_dates.results.find((release: any) => {
        if (release.iso_3166_1 === 'US') {
          // Type 3 is for Theatrical certification and 4 for Digital
          certification = release.release_dates.find((r: any) => r.type == 4)?.certification;
          if (!certification) certification = release.release_dates.find((r: any) => r.type == 3)?.certification;
          if (!certification) certification = release.release_dates.find((r: any) => r.certification)?.certification;

          // NR means Not Rated
          if (certification && certification === 'NR') certification = '';
          return true;
        }
      });
    }

    let trailerKey: string;
    if (data.videos && data.videos.results) {
      trailerKey = data.videos.results.filter((video: any) => video.type === 'Trailer')[0]?.key;
    }

    let similarMovies: SimilarMovie[] = [];
    if (data.similar_movies && data.similar_movies.results) {
      similarMovies = data.similar_movies.results.map((movie: any) => {
        return {
          id: movie.id,
          title: movie.title,
          posterPath: movie.poster_path
        }
      });
    }

    let collection: MinimalCollection;
    if (data.belongs_to_collection) {
      collection = {
        backdropPath: data.belongs_to_collection.backdrop_path,
        id: data.belongs_to_collection.id,
        name: data.belongs_to_collection.name,
        posterPath: data.belongs_to_collection.poster_path
      };
    }

    return { certification, trailerKey, similarMovies, collection };
  }
}
