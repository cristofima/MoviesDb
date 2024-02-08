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
  similarMovies?: SimilarMovie[];
  trailerKey?: string;
  collection?: MinimalCollection;
}

export interface Genre {
  id: number;
  name: string;
}

export interface SimilarMovie {
  id: number;
  title: string;
  posterPath: string;
}

export interface MinimalCollection {
  id: number;
  name: string;
  posterPath: string;
  backdropPath: string;
}
