import { Injectable } from '@angular/core';
import { Observable, forkJoin  } from 'rxjs';
import { map } from 'rxjs/operators';
import { MinimalMedia } from '@/core/models/base-media.model';
import { TMDbService } from '@/core/services/tmdb.service';

@Injectable()
export class HomeService extends TMDbService {

    getTrendingMedia(frecuency: 'day' | 'week'): Observable<MinimalMedia[]> {
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

    getUpcomingMedia(mediaType: 'movie' | 'tv', nextMonths = 3): Observable<MinimalMedia[]> {
        let today = new Date();
        let gteDate = today.toISOString();

        today.setMonth(today.getMonth() + nextMonths);
        let lteDate = today.toISOString();

        let dateParam = mediaType === 'movie' ? 'primary_release_date' : 'first_air_date';

        return this.getQuery(`discover/${mediaType}`, `watch_region=US&with_release_type=3|2&${dateParam}.gte=${gteDate}&${dateParam}.lte=${lteDate}`)
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

    getPopularMedia(option: 'tv' | 'theater'): Observable<MinimalMedia[]> {
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

    getPopularStreaming(): Observable<MinimalMedia[]> {
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
