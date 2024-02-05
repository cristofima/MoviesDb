import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MovieFilter } from '../../shared/models/movie-filter';
import { environment } from 'src/environments/environment';
import { Genre, Movie, SimilarMovie } from 'src/app/shared/models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiKey = environment.apiKey

  constructor(private http: HttpClient) { }

  private getQuery<T>(query: string, params: string = '') {
    const url = `https://api.themoviedb.org/3/${query}`;

    params = `?api_key=${this.apiKey}&${params}`;

    return this.http.get<T>(`${url}${params}`);
  }

  getGenres() {
    return this.getQuery<Genre>('genre/movie/list').pipe(
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
      if (filter.language) {
        queryString += `&language=${filter.language}`;
      }

      if (filter.year) {
        queryString += `&primary_release_year=${filter.year}`;
      }

      if (filter.genreId) {
        queryString += `&with_genres=${filter.genreId}`;
      }

      if (filter.voteAverageGte) {
        queryString += `&vote_average.gte=${filter.voteAverageGte / 10}`;
      }
    }

    return this.getQuery<Movie[]>('discover/movie', queryString).pipe(
      map(data => {
        return data['results'].map((movie: any) => {
          return {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            posterPath: movie.poster_path,
            voteAverage: movie.vote_average
          };
        });
      })
    );
  }

  getMovieDetails(movieId: number) {
    return this.getQuery<Movie>(`movie/${movieId}`, 'append_to_response=release_dates,similar_movies,videos')
      .pipe(
        map((data: any) => {
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

          let videos: string[] = [];
          if (data.videos && data.videos.results) {
            videos = data.videos.results.filter((video: any) => video.type === 'Trailer').map((video: any) => video.key);
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

          return {
            id: data.id,
            title: data.title,
            overview: data.overview,
            posterPath: data.poster_path,
            backdropPath: data.backdrop_path,
            releaseDate: data.release_date,
            voteAverage: data.vote_average,
            voteCount: data.vote_count,
            runtime: data.runtime,
            budget: data.budget,
            revenue: data.revenue,
            certification: certification,
            genres: data.genres,
            similarMovies: similarMovies,
            videos: videos
          }
        })
      );
  }
}
