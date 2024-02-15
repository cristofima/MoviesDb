export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: Date;
  voteAverage: number;
  runtime: number;
  budget: number;
  revenue: number;
  genres: Genre[];
  certification?: string;
  recommendations?: RecommendedMovie[];
  trailerKey?: string;
  collection?: MinimalCollection;
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
