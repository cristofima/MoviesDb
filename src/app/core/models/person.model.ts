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
    }
}