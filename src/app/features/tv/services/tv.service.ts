import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TV } from 'src/app/core/models/tv.model';
import { TMDbService } from 'src/app/core/services/tmdb.service';
import { TVUtil } from 'src/app/shared/utils/tv.util';

@Injectable()
export class TvService extends TMDbService {

  getTVDetails(tvId: number): Observable<TV> {
    return this.getQuery(`tv/${tvId}`, 'append_to_response=aggregate_credits,keywords,videos,recommendations,content_ratings')
      .pipe(
        map((data: any) => {
          return TVUtil.getFullTVData(data);
        })
      );
  }
}
