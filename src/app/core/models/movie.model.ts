import { BaseMedia, Company } from "./base-media.model";

export interface Movie extends BaseMedia {
  releaseDate: Date;
  originCountry: string;
  originalLanguage: string;
  runtime: number;
  budget: number;
  revenue: number;
  collection?: MinimalCollection;
  productionCompanies?: Company[];
}

export interface MinimalCollection {
  id: number;
  name: string;
  posterPath: string;
  backdropPath: string;
}