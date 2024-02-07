export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  releaseDate: Date;
  voteAverage: number;
  runtime: number;
  budget: number;
  revenue: number;
  certification: string;
  genres: Genre[];
  similarMovies: SimilarMovie[];
  trailerKey: string;
  collection: MinimalCollection;
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
