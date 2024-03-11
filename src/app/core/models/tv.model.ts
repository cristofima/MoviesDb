import { BaseMedia, Company, MinimalMedia } from "./base-media.model";

export interface TV extends BaseMedia {
    firstAirDate: Date;
    type: string;
    network?: Company;
    lastAirDate: Date;
    lastEpisodeToAir?: {
        id: number;
        name: string;
        airDate: Date;
        episodeNumber: number;
        episodeType: string;
        seasonNumber: number;
    };
    lastSeason?: TVSeason;
}

export interface TVSeason {
    id: number;
    name: string;
    overview: string;
    airDate: Date;
    episodeCount: number;
    seasonNumber: number;
    posterPath: string;
    voteAverage: number;
}

export interface TVMinimalWithSeasons extends MinimalMedia {
    seasons: TVSeason[];
}