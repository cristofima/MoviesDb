import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MediaFilter } from '@/core/models/media-filter';
import { PaginationModel } from '@/core/models/pagination.model';
import { TMDbService } from '@/core/services/tmdb.service';
import { MediaUtil } from '../utils/media.util';

@Injectable()
export class MediaService extends TMDbService {

  searchMedia(pageNumber = 1, text: string, mediaType: 'movie' | 'tv'): Observable<PaginationModel> {
    if (pageNumber < 1) {
      pageNumber = 1;
    }

    let queryString = `query=${text}&page=${pageNumber}`;

    return this.getQuery(`search/${mediaType}`, queryString).pipe(
      map(data => {
        return MediaUtil.getPaginationMedia(data, mediaType);
      })
    );
  }

  discoverMedia(pageNumber = 1, mediaType: 'movie' | 'tv', filters?: MediaFilter): Observable<PaginationModel> {
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > 500) {
      pageNumber = 500;
    }

    let queryString = `page=${pageNumber}`;
    if (filters && filters.genreId) {
      queryString += `&with_genres=${filters.genreId}`;
    }

    return this.getQuery(`discover/${mediaType}`, queryString).pipe(
      map(data => {
        return MediaUtil.getPaginationMedia(data, mediaType);
      })
    );
  }
}
