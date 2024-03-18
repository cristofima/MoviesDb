import { TVMinimalWithSeasons } from '@/core/models/tv.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TMDbService } from '@/core/services/tmdb.service';
import { TVUtil } from '@/features/tv/utils/tv.util';

@Injectable()
export class SeasonsService extends TMDbService {

  getSeasons(tvId: number): Observable<TVMinimalWithSeasons> {
    return this.getQuery(`tv/${tvId}`)
      .pipe(
        map((data: any) => {
          return TVUtil.getTVMinimalDetailsWithSeasons(data);
        })
      );
  }
}
