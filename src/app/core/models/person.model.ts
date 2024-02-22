import { MinimalMedia } from "./base-media.model";

export interface Person {
    id: number;
    name: string;
    biography: string;
    birthday: Date;
    age: number;
    deathday?: Date;
    gender: string;
    knownForDepartment: string;
    placeOfBirth: string;
    profilePath: string;
    knownCredits: number;
    knownFor: MinimalMedia[];
    externalIds?: {
        facebookId: string;
        instagramId: string;
        twitterId: string;
        tiktokId: string;
        youtubeId: string;
    },
    creditsList: PersonCredit[];
}

export interface PersonCredit {
    year: number;
    credits: {
        id: number;
        title: string;
        releaseDate: Date;
        character?: string;
        jobs?: {
            episodeCount: number;
            job: string;
        }[];
        mediaType: 'movie' | 'tv';
    }[]
}