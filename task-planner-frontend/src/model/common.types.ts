

export type SortOrder = 'asc' | 'desc';

export interface SortObject {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageableObject {
  offset: number;
  paged: boolean;
  sort: SortObject;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  last: boolean;
  first: boolean;
  numberOfElements?: number;
  sort?: SortObject;
  pageable?: PageableObject;
  empty: boolean;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: SortOrder;
}