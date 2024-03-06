import { BaseMedia, Company } from "./base-media.model";

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
    lastSeason?: {
        id: number;
        name: string;
        overview: string;
        airDate: Date;
        episodeCount: number;
        seasonNumber: number;
        posterPath: string;
        voteAverage: number;
    }
}