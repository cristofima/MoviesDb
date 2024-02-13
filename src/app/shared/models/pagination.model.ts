import { Movie } from "./movie.model";

export interface PaginationModel {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
}
