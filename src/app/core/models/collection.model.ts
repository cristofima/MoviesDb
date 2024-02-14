import { Movie } from "./movie.model";

export interface Collection {
  id: number;
  name: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  voteAverage: number;
  movies: Movie[];
}
