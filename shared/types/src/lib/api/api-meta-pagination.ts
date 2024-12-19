export type ApiMetaPagination = {
  page?: number; // The current page being viewed
  itemsPerPage?: number; // Number of items to display per page
  totalItems?: number; // Total number of items across all pages
  totalPages?: number; // Total number of pages
  hasPreviousPage?: boolean; // Indicates if there is a page before the current page
  hasNextPage?: boolean; // Indicates if there is a page after the current page
};
