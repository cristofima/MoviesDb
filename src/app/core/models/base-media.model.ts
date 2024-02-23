export interface MinimalMedia {
    id: number;
    title: string;
    posterPath: string;
    mediaType: 'movie' | 'tv';
}

export interface BaseMedia extends MinimalMedia {
    overview: string;
    tagline: string;
    backdropPath: string;
    status: string;
    voteAverage: number;
    genres: Genre[];
    certification?: string;
    recommendations?: RecommendedMedia[];
    trailerKey?: string;
    people?: Crew[];
    topBilledCast?: Cast[];
    keywords?: string[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface Cast {
    id: number;
    name: string;
    character: string;
    profilePath: string;
    episodeCount?: number;
}

export interface Crew {
    id: number;
    name: string;
    job: string;
}

export interface Company {
    id: number;
    name: string;
    logoPath: string;
}

export interface RecommendedMedia {
    id: number;
    title: string;
    posterPath: string;
    releaseDate: Date;
    voteAverage: number;
    mediaType: 'movie' | 'tv';
}
