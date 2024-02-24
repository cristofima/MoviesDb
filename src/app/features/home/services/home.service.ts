import { Injectable } from '@angular/core';
import { Observable, forkJoin  } from 'rxjs';
import { map } from 'rxjs/operators';
import { MinimalMediaV2 } from 'src/app/core/models/base-media.model';
import { TMDbService } from 'src/app/core/services/tmdb.service';

@Injectable()
export class HomeService extends TMDbService {

    getTrendingMedia(frecuency: 'day' | 'week'): Observable<MinimalMediaV2[]> {
        return this.getQuery(`trending/all/${frecuency}`)
            .pipe(
                map((data: any) => {
                    return data['results'].map((media: any) => {
                        return {
                            id: media.id,
                            title: media.title || media.name,
                            mediaType: media.media_type,
                            posterPath: media.poster_path,
                            voteAverage: media.vote_average,
                            releaseDate: media.release_date || media.first_air_date
                        };
                    });
                })
            );
    }

    getPopularMedia(option: 'tv' | 'theater'): Observable<MinimalMediaV2[]> {
        let endpoint = option === 'tv' ? 'tv/popular' : 'discover/movie';
        let queryParams = option === 'tv' ? '' : 'watch_region=US&with_release_type=3|2';
        let mediaType = option === 'tv' ? 'tv' : 'movie';

        return this.getQuery(endpoint, queryParams)
            .pipe(
                map((data: any) => {
                    return data['results'].map((media: any) => {
                        return {
                            id: media.id,
                            title: media.title || media.name,
                            mediaType: mediaType,
                            posterPath: media.poster_path,
                            voteAverage: media.vote_average,
                            releaseDate: media.release_date || media.first_air_date
                        };
                    });
                })
            );
    }

    getPopularStreaming(): Observable<MinimalMediaV2[]> {
        const callback = (mediaType: 'movie' | 'tv') => 
            this.getQuery(`discover/${mediaType}`, 'watch_region=US&with_watch_monetization_types=flatrate')
                .pipe(
                    map((data: any) => {
                        return data['results'].map((media: any) => {
                            return {
                                id: media.id,
                                title: media.title || media.name,
                                mediaType: mediaType,
                                posterPath: media.poster_path,
                                voteAverage: media.vote_average,
                                popularity: media.popularity,
                                releaseDate: media.release_date || media.first_air_date
                            };
                        });
                    })
                );

        const movies$ = callback('movie');
        const tv$ = callback('tv');

        return forkJoin([movies$, tv$]).pipe(
            map(([movies, tv]) => {
                return (movies as any[]).concat(tv as any[])
                    .sort((a, b) => b.popularity - a.popularity)
                    .slice(0, 20);
            })
        );
    }
}
