import { BaseMedia, Company } from "./base-media.model";

export interface TV extends BaseMedia {
    firstAirDate: Date;
    type: string;
    networks?: Company[];
}