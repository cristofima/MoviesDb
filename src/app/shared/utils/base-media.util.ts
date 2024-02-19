import { Cast, Company, Crew, RecommendedMedia } from "src/app/core/models/base-media.model";

export class BaseMediaUtil {

    public static getCommonExtraData(data: any, mediaType: 'Movie' | 'TV') {
        let trailerKey: string;
        if (data.videos && data.videos.results) {
            trailerKey = data.videos.results.filter((video: any) => video.type === 'Trailer')[0]?.key;
        }

        let recommendations: RecommendedMedia[] = [];
        if (data.recommendations && data.recommendations.results) {
            recommendations = data.recommendations.results.map((r: any) => {
                return {
                    id: r.id,
                    title: r.title || r.name,
                    posterPath: r.poster_path,
                    releaseDate: r.release_date,
                    voteAverage: r.vote_average,
                    mediaType: r.media_type
                }
            });
        }

        let people: Crew[] = [];
        let topBilledCast: Cast[] = [];
        let creditsKey = mediaType === 'Movie' ? 'credits' : 'aggregate_credits';
        if (data[creditsKey] && data[creditsKey].cast) {
            topBilledCast = data[creditsKey].cast.filter(cast => cast.order <= 8 && cast.known_for_department === 'Acting')
                .map((cast: any) => {
                    return {
                        id: cast.id,
                        name: cast.name,
                        character: cast.character,
                        profilePath: cast.profile_path
                    };
                });
        }

        if (data[creditsKey] && data[creditsKey].crew) {
            let searchArr = mediaType === 'Movie' ? ['Characters', 'Director', 'Screenplay'] : ['Creator', 'Director', 'Writer'];
            people = data[creditsKey].crew.filter(crew => searchArr.includes(crew.job))
                .map((crew: any) => {
                    return {
                        id: crew.id,
                        name: crew.name,
                        job: crew.job
                    };
                }).sort((a: Crew, b: Crew) => a.job.localeCompare(b.job));
        }

        let keywords: string[] = [];
        if (data.keywords && data.keywords.keywords) {
            keywords = data.keywords.keywords.map((keyword: any) => keyword.name);
        }

        let productionCompanies: Company[] = [];
        let companyKey = mediaType === 'Movie' ? 'production_companies' : 'networks';
        if (data[companyKey]) {
            productionCompanies = data[companyKey].filter((c: any) => c.logo_path).map((company: any) => {
                return {
                    id: company.id,
                    name: company.name,
                    logoPath: company.logo_path
                };
            });
        }

        return { trailerKey, recommendations, people, topBilledCast, keywords, productionCompanies };
    }
}