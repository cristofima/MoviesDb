import { TV } from "src/app/core/models/tv.model";
import { BaseMediaUtil } from "./base-media.util";

export class TVUtil {

    public static getFullTVData(data: any, extractExtraData = true) {
        let tv: TV = {
            id: data.id,
            title: data.name,
            overview: data.overview,
            tagline: data.tagline,
            posterPath: data.poster_path,
            backdropPath: data.backdrop_path,
            status: data.status,
            voteAverage: data.vote_average,
            genres: data.genres,
            mediaType: 'tv',
            firstAirDate: data.first_air_date ? new Date(data.first_air_date) : null,
            type: data.type
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