export interface PopularPerson {
    id: number;
    name: string;
    gender: string;
    profilePath: string;
    knownFor: string[];
}

export interface PaginationPopularPeopleModel {
    page: number;
    results: PopularPerson[];
    totalPages: number;
    totalResults: number;
}