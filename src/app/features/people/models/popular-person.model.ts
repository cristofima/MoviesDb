export interface PopularPerson {
    id: number;
    name: string;
    gender: number;
    profilePath: string;
    knownFor: string[];
}

export interface PaginationPopularPeopleModel {
    page: number;
    results: PopularPerson[];
    totalPages: number;
    totalResults: number;
}