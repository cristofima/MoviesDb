import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Collection } from 'src/app/core/models/collection.model';
import { Movie } from 'src/app/core/models/movie.model';
import { TMDbService } from 'src/app/core/services/tmdb.service';
import { MovieUtil } from 'src/app/shared/utils/movie.util';

@Injectable()
export class MovieService extends TMDbService {

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
