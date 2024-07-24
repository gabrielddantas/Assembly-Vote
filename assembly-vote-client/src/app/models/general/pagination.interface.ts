export interface IPaginatedData<T> {
  content: T;
  pagination: IPagination;
}

export interface IPagination {
  firstPage: boolean;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  lastPage: boolean;
  numberOfElements: number;
  numberOfPages: number;
  size: number;
  page: number;
  totalNumberOfElements: number;
}
