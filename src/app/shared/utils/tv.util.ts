import { TV } from '@/core/models/tv.model';
import { BaseMediaUtil } from './base-media.util';

export class TVUtil {

    public static getFullTVData(data: any, extractExtraData = true) {
        let tv: TV = {
            id: data.id,
            title: data.name,
            originalTitle: data.original_name,
            overview: data.overview,
            tagline: data.tagline,
            posterPath: data.poster_path,
            backdropPath: data.backdrop_path,
            status: data.status,
            voteAverage: data.vote_average,
            genres: data.genres,
            mediaType: 'tv',
            firstAirDate: data.first_air_date ? new Date(data.first_air_date) : null,
            type: data.type,
            lastAirDate: data.last_air_date ? new Date(data.last_air_date) : null
        };

        if (extractExtraData) {
            let productionCountryCode = data.origin_country && data.origin_country[0];
            let originCountryCode = data.production_companies && data.production_companies[0]?.origin_country;

            const extraData = this.getExtraTVData(data, originCountryCode, productionCountryCode);
            tv.certification = extraData.certification;
            tv.recommendations = extraData.recommendations;
            tv.trailerKey = extraData.trailerKey;
            tv.people = extraData.people;
            tv.topBilledCast = extraData.topBilledCast;
            tv.keywords = extraData.keywords;
            tv.network = extraData.productionCompany;

            tv.lastEpisodeToAir = data.last_episode_to_air && {
                id: data.last_episode_to_air.id,
                name: data.last_episode_to_air.name,
                airDate: data.last_episode_to_air.air_date ? new Date(data.last_episode_to_air.air_date) : null,
                episodeNumber: data.last_episode_to_air.episode_number,
                episodeType: data.last_episode_to_air.episode_type,
                seasonNumber: data.last_episode_to_air.season_number
            }

            if(data.seasons && tv.lastEpisodeToAir) {
                let lastSeason = data.seasons.find((season: any) => season.season_number === tv.lastEpisodeToAir.seasonNumber);
                if(lastSeason){
                    tv.lastSeason = {
                        id: lastSeason.id,
                        name: lastSeason.name,
                        overview: lastSeason.overview,
                        seasonNumber: lastSeason.season_number,
                        episodeCount: lastSeason.episode_count,
                        airDate: lastSeason.air_date ? new Date(lastSeason.air_date) : null,
                        posterPath: lastSeason.poster_path,
                        voteAverage: lastSeason.vote_average
                    }
                }
            }
        }

        return tv;
    }

    private static getExtraTVData(data: any, originCountryCode = 'US', productionCountryCode = 'US') {
        let certification: string;
        if (data.content_ratings && data.content_ratings.results) {
            certification = this.getTVCertification(data.content_ratings.results, originCountryCode);
            if (!certification) {
                if (originCountryCode !== productionCountryCode) {
                    certification = this.getTVCertification(data.content_ratings.results, productionCountryCode);
                } else {
                    certification = this.getTVCertification(data.content_ratings.results, 'US');
                }
            }
        }

        return {...BaseMediaUtil.getCommonExtraData(data, 'TV'), certification };
    }

    private static getTVCertification(results: any[], countryCode: string) {
        let certification =  results.find((contentRating: any) => contentRating.iso_3166_1 === countryCode && contentRating.rating !== 'NR')?.rating || '';

        return certification;
    }
}