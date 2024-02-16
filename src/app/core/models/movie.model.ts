export interface Movie {
  id: number;
  title: string;
  overview: string;
  tagline: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: Date;
  status: string;
  productionCountry: string;
  originalLanguage: string;
  voteAverage: number;
  runtime: number;
  budget: number;
  revenue: number;
  genres: Genre[];
  certification?: string;
  recommendations?: RecommendedMovie[];
  trailerKey?: string;
  collection?: MinimalCollection;
  people?: Crew[];
  topBilledCast?: Cast[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface RecommendedMovie {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: Date;
  voteAverage: number;
}

export interface MinimalCollection {
  id: number;
  name: string;
  posterPath: string;
  backdropPath: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profilePath: string;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
}