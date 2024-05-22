
import {Table} from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

interface TablePaginationProps<T> {
  table: Table<T>;
}

export function TablePagination<T>({table}: TablePaginationProps<T>) {
    const currentPage = table.getState().pagination.pageIndex;
    const totalPages = table.getPageCount();
    const startPage = Math.max(currentPage - 1, 0);
    const endPage = Math.min(startPage + 3, totalPages - 1);
  return (
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium whitespace-nowrap">Rows per page</p>
            <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize}/>
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium whitespace-nowrap">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#"
                                            isActive={!table.getCanPreviousPage()}
                                            onClick={() => table.previousPage()}
                        />
                    </PaginationItem>
                    {Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx).map(page => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                isActive={currentPage === page}
                                onClick={() => table.setPageIndex(page)}
                            >
                                {page + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#"
                                        isActive={!table.getCanNextPage()}
                                        onClick={() => table.nextPage()}

                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
      </div>
  );
}
