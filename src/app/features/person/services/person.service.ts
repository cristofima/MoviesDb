import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person } from 'src/app/core/models/person.model';
import { TMDbService } from 'src/app/core/services/tmdb.service';
import { PersonUtil } from 'src/app/shared/utils/person.utll';

@Injectable()
export class PersonService extends TMDbService {

  getPersonDetails(personId: number): Observable<Person> {
    return this.getQuery(`person/${personId}`, 'append_to_response=combined_credits,external_ids')
      .pipe(
        map((data: any) => {
          let birthday = new Date(data.birthday);
          let deathday = data.deathday ? new Date(data.deathday) : null;

          return {
            id: data.id,
            name: data.name,
            biography: data.biography,
            birthday: birthday,
            age: Math.floor((Math.abs((deathday && deathday.getTime() || Date.now()) - birthday.getTime()) / (1000 * 3600 * 24)) / 365.25),
            deathday: deathday,
            gender: data.gender === 1 ? 'Female' : (data.gender === 2 ? 'Male' : 'Not set / not specified'),
            knownForDepartment: data.known_for_department,
            placeOfBirth: data.place_of_birth,
            profilePath: data.profile_path,
            knownCredits: data.combined_credits.cast.length,
            knownFor: PersonUtil.getKnownForMedia(data),
            creditsList: PersonUtil.getCreditsList(data),
            externalIds: {
              facebookId: data.external_ids.facebook_id,
              instagramId: data.external_ids.instagram_id,
              twitterId: data.external_ids.twitter_id,
              tiktokId: data.external_ids.tiktok_id,
              youtubeId: data.external_ids.youtube_id
            }
          };
        }
      ));
  }
}
