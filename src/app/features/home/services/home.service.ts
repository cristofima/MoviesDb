import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieFilter } from 'src/app/core/models/movie-filter';
import { PaginationModel } from 'src/app/core/models/pagination.model';
import { TMDbService } from 'src/app/core/services/tmdb.service';
import { MovieUtil } from 'src/app/shared/utils/movie.util';

@Injectable()
export class HomeService extends TMDbService {

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
}
