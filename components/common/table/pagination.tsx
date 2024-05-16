import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import {Table} from "@tanstack/react-table";

import {Button} from "@/components/ui/button";
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
  return (
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
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
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
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
                    {table.getPageOptions().map((page,idx) => {
                        // show only 3 pages
                        if (table.getState().pagination.pageIndex < page + 1 && table.getState().pagination.pageIndex < table.getState().pagination.pageIndex + 3     ) return  (
                        <PaginationItem key={idx}>
                            <PaginationLink href="#"
                                            isActive={table.getState().pagination.pageIndex === page}
                                            onClick={() => table.setPageIndex(page)}
                            >
                                {page + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )
                    else return null
                    })}
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
/*
<div className="flex items-center space-x-2">
  <Button
      variant="outline"
      className="hidden h-8 w-8 p-0 lg:flex"
      onClick={() => table.setPageIndex(0)}
      disabled={!table.getCanPreviousPage()}
  >
    <span className="sr-only">Go to first page</span>
    <DoubleArrowLeftIcon className="h-4 w-4"/>
  </Button>
  <Button
      variant="outline"
      className="h-8 w-8 p-0"
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
  >
    <span className="sr-only">Go to previous page</span>
    <ChevronLeftIcon className="h-4 w-4"/>
  </Button>
  <Button
      variant="outline"
      className="h-8 w-8 p-0"
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
  >
    <span className="sr-only">Go to next page</span>
    <ChevronRightIcon className="h-4 w-4"/>
  </Button>
  <Button
      variant="outline"
      className="hidden h-8 w-8 p-0 lg:flex"
      onClick={() => table.setPageIndex(table.getPageCount() - 1)}
      disabled={!table.getCanNextPage()}
  >
    <span className="sr-only">Go to last page</span>
    <DoubleArrowRightIcon className="h-4 w-4"/>
  </Button>
</div>
*/
