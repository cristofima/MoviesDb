import { TVMinimalWithSeasons } from '@/core/models/tv.model';
import { TMDbService } from '@/core/services/tmdb.service';
import { TVUtil } from '../utils/tv.util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
