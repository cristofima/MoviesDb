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
            if(mediaType === 'Movie') {
                let searchArr = ['Characters', 'Director', 'Screenplay'];
                people = data[creditsKey].crew
                    .filter((crew: any) => searchArr.includes(crew.job))
                    .map((crew: any) => {
                        return {
                            id: crew.id,
                            name: crew.name,
                            job: crew.job
                        };
                    });
            }else{
                people = data[creditsKey].crew
                    .filter((crew: any) => crew.department === 'Production' && crew.jobs.length === 1 && crew.jobs[0].job === 'Executive Producer')
                    .map((crew: any) => {
                        return {
                            id: crew.id,
                            name: crew.name,
                            job: 'Creator'
                        };
                    });
            }
            
            people.sort((a: Crew, b: Crew) => a.job.localeCompare(b.job));
        }

        let keywords: string[] = [];
        let keywordsKey = mediaType === 'Movie' ? 'keywords' : 'results';
        if (data.keywords && data.keywords[keywordsKey]) {
            keywords = data.keywords[keywordsKey].map((keyword: any) => keyword.name);
        }

        let productionCompany: Company;
        let companyKey = mediaType === 'Movie' ? 'production_companies' : 'networks';
        if (data[companyKey]) {
            productionCompany = (data[companyKey] as any[]).filter((c: any) => c.logo_path).map((company: any) => {
                return {
                    id: company.id,
                    name: company.name,
                    logoPath: company.logo_path
                };
            })[0];
        }

        return { trailerKey, recommendations, people, topBilledCast, keywords, productionCompany };
    }
}