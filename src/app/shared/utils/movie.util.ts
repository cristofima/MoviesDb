import { Movie, MinimalCollection } from "src/app/core/models/movie.model";
import { LanguageUtil } from "./language.util";
import { PaginationModel } from "src/app/core/models/pagination.model";
import { BaseMediaUtil } from "./base-media.util";

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
            genres: data.genres,
            mediaType: 'movie'
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
            movie.productionCompany = extraData.productionCompany;
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

        let collection: MinimalCollection;
        if (data.belongs_to_collection) {
            collection = {
                backdropPath: data.belongs_to_collection.backdrop_path,
                id: data.belongs_to_collection.id,
                name: data.belongs_to_collection.name,
                posterPath: data.belongs_to_collection.poster_path
            };
        }

        return {...BaseMediaUtil.getCommonExtraData(data, 'Movie'), certification, collection };
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