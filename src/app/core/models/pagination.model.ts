import { MinimalMedia } from "./base-media.model";

export interface PaginationModel {
  page: number;
  results: MinimalMedia[];
  totalPages: number;
  totalResults: number;
}