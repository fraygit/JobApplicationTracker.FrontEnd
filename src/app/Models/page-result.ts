export class PagedResult<T> {
    results: T[] = [];
    totalCount: number = 0;
    pageSize: number = 0;
    pageNumber: number = 0;
}
