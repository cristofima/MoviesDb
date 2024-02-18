import { Cast, Company, Crew, MinimalCollection, Movie, RecommendedMovie } from "src/app/core/models/movie.model";
import { LanguageUtil } from "./language.util";
import { PaginationModel } from "src/app/core/models/pagination.model";

export class MovieUtil {

    public static getPaginationMovies(data: any): PaginationModel {
        let movies = data['results'].map((movie: any) => {
            return {
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                posterPath: movie.poster_path,
                voteAverage: movie.vote_average
            };
        });

        return {
            page: data['page'],
            results: movies,
            totalPages: data['total_pages'],
            totalResults: data['total_results']
        };
    }

    public static getFullMovieData(data: any, extractExtraData = true) {
        let movie: Movie = {
            id: data.id,
            title: data.title,
            overview: data.overview,
            tagline: data.tagline,
            posterPath: data.poster_path,
            backdropPath: data.backdrop_path,
            releaseDate: data.release_date,
            status: data.status,
            originCountry: data.production_companies && data.production_companies[0]?.origin_country,
            originalLanguage: LanguageUtil.getLanguage(data.original_language),
            voteAverage: data.vote_average,
            runtime: data.runtime,
            budget: data.budget,
            revenue: data.revenue,
            genres: data.genres
        };

        let productionCountryCode = data.production_countries && data.production_countries[0]?.iso_3166_1;

        if (extractExtraData) {
            const extraData = this.getExtraMovieData(data, movie.originCountry, productionCountryCode);
            movie.certification = extraData.certification;
            movie.collection = extraData.collection;
            movie.recommendations = extraData.recommendations;
            movie.trailerKey = extraData.trailerKey;
            movie.people = extraData.people;
            movie.topBilledCast = extraData.topBilledCast;
            movie.keywords = extraData.keywords;
            movie.productionCompanies = extraData.productionCompanies;
        }

        return movie;
    }

    private static getExtraMovieData(data: any, originCountryCode = 'US', productionCountryCode = 'US') {
        let certification: string;
        if (data.release_dates && data.release_dates.results) {
            certification = this.getMovieCertification(data.release_dates.results, originCountryCode);
            if (!certification && originCountryCode !== productionCountryCode) {
                certification = this.getMovieCertification(data.release_dates.results, productionCountryCode);
            }
        }

        let trailerKey: string;
        if (data.videos && data.videos.results) {
            trailerKey = data.videos.results.filter((video: any) => video.type === 'Trailer')[0]?.key;
        }

        let recommendations: RecommendedMovie[] = [];
        if (data.recommendations && data.recommendations.results) {
            recommendations = data.recommendations.results.map((movie: any) => {
                return {
                    id: movie.id,
                    title: movie.title,
                    posterPath: movie.poster_path,
                    releaseDate: movie.release_date,
                    voteAverage: movie.vote_average
                }
            });
        }

        let collection: MinimalCollection;
        if (data.belongs_to_collection) {
            collection = {
                backdropPath: data.belongs_to_collection.backdrop_path,
                id: data.belongs_to_collection.id,
                name: data.belongs_to_collection.name,
                posterPath: data.belongs_to_collection.poster_path
            };
        }

        let people: Crew[] = [];
        let topBilledCast: Cast[] = [];
        if (data.credits && data.credits.cast) {
            topBilledCast = data.credits.cast.filter(cast => cast.order <= 8 && cast.known_for_department === 'Acting')
                .map((cast: any) => {
                    return {
                        id: cast.id,
                        name: cast.name,
                        character: cast.character,
                        profilePath: cast.profile_path
                    };
                });
        }

        if (data.credits && data.credits.crew) {
            people = data.credits.crew.filter(crew => ['Characters', 'Director', 'Screenplay'].includes(crew.job))
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
        if (data.production_companies) {
            productionCompanies = data.production_companies.filter((c: any) => c.logo_path).map((company: any) => {
                return {
                    id: company.id,
                    name: company.name,
                    logoPath: company.logo_path
                };
            });
        }

        return { certification, trailerKey, recommendations, collection, people, topBilledCast, keywords, productionCompanies };
    }

    private static getMovieCertification(results: any[], countryCode: string) {
        let certification: string;
        results.find((release: any) => {
            if (release.iso_3166_1 === countryCode) {
                // Type 3 is for Theatrical certification and 4 for Digital
                certification = release.release_dates.find((r: any) => r.type == 4)?.certification;
                if (!certification) certification = release.release_dates.find((r: any) => r.type == 3)?.certification;
                if (!certification) certification = release.release_dates.find((r: any) => r.certification)?.certification;

                // NR means Not Rated
                if (certification && certification === 'NR') certification = '';
                return true;
            }
        });

        return certification;
    }
}