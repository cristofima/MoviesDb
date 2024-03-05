import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TMDbService } from '@/core/services/tmdb.service';
import { PaginationPopularPeopleModel } from '../models/popular-person.model';

@Injectable()
export class PeopleService extends TMDbService {

  getPopularPeople(pageNumber: number): Observable<PaginationPopularPeopleModel> {
    return this.getQuery('person/popular', `page=${pageNumber}`)
      .pipe(
        map((data: any) => {
          let results = data.results.map((person: any) => {
            return {
              id: person.id,
              name: person.name,
              gender: person.gender === 1 ? 'Female' : 'Male',
              profilePath: person.profile_path,
              knownFor: person.known_for.map((media: any) => media.title || media.name)
            };
          });

          return {
            page: data.page,
            totalPages: data.total_pages,
            totalResults: data.total_results,
            results: results
          };
        })
      )
  }
}

