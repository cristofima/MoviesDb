import { PaginationModel } from '@/core/models/pagination.model';

export class MediaUtil {

    public static getPaginationMedia(data: any, mediaType: 'movie' | 'tv'): PaginationModel {
        let movies = data['results'].map((media: any) => {
            return {
                id: media.id,
                title: media.title || media.name,
                posterPath: media.poster_path,
                voteAverage: media.vote_average,
                releaseDate: media.release_date || media.first_air_date,
                mediaType: mediaType
            };
        });

        return {
            page: data['page'],
            results: movies,
            totalPages: data['total_pages'],
            totalResults: data['total_results']
        };
    }
}