"use client";

import { useState } from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
  EyeOpenIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
  SortingFn,
  SortingFns,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/react-table";
import type { Table as ITable } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalize } from "@/lib/utils";
import { TablePagination } from "./pagination";
import Link from "next/link";
import { tableDisplayHeader } from "@/lib/utils";
import { Search } from "lucide-react";
import { compareItems, rankItem } from "@tanstack/match-sorter-utils";
import { CollTableDropDown } from "@/components/common/table/coll-dropdown";
import { Filter } from "@/components/common/table/filter";

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

//@ts-ignore
const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      //@ts-ignore
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      //@ts-ignore
      rowB.columnFiltersMeta[columnId]?.itemRank!,
    );
  }
};
export type Props<T extends { id: string }> = {
  defaultFilter: keyof T;
  headers: Headers<T>;
  data: T[];
  url?: string;
  customColumns?: (() => ColumnDef<T>)[];
  editHandler?: (row: T) => void;
  deleteHandler?: (row: T) => void;
  customOperations?: {
    title: string;
    handler: (row: T) => void;
  }[];
  words_separator?: "-" | "_" | " ";
  fuzzyElements?: (keyof T)[];
};

export function DataTable<T extends { id: string }>({
  data,
  defaultFilter,
  headers,
  customColumns = [],
  editHandler = undefined,
  deleteHandler = undefined,
  customOperations,
  url = "/dashboard",
  words_separator = "_",
  fuzzyElements,
}: Props<T>) {
  const shorterFuzzyElements = fuzzyElements?.slice(0, 3);
  const columns: ColumnDef<T>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          //@ts-ignore
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...headers.map((header): ColumnDef<T> => {
      const isFuzzy = shorterFuzzyElements?.includes(header.accessorKey);
      const obj = isFuzzy && {
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
      };
      return {
        //@ts-ignore
        filterFn: isFuzzy ? "fuzzy" : undefined,
        sortingFn: isFuzzy ? fuzzySort : undefined,
        accessorKey: header.accessorKey,
        header: ({ column }: { column: Column<T, unknown> }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {header.title}
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }: { row: Row<T> }) => (
          <div className="capitalize text-center">
            {row.getValue(header.accessorKey as string)}
          </div>
        ),
      };
    }),
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedCols, setSelectedCols] = useState<keyof T>(defaultFilter);

  const table = useReactTable({
    data,

    columns: columns.concat(...customColumns.map((c) => c()), {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const selectedRow = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(selectedRow.id)}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href={`${url}/${selectedRow.id}`}>
                <DropdownMenuItem className="flex justify-between">
                  <span>View details</span>
                  <EyeOpenIcon />
                </DropdownMenuItem>
              </Link>
              {customOperations &&
                customOperations.map((operation) => (
                  <DropdownMenuItem
                    key={operation.title}
                    className="flex gap-1"
                    onClick={() => operation.handler(selectedRow)}
                  >
                    <span>{capitalize(operation.title, words_separator)}</span>
                  </DropdownMenuItem>
                ))}
              {editHandler && (
                <DropdownMenuItem
                  className="flex justify-between"
                  onClick={() => editHandler(selectedRow)}
                >
                  <span>Edit</span>
                  <Pencil2Icon />
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />
              {deleteHandler && (
                <DropdownMenuItem
                  className="flex justify-between text-red-700"
                  onClick={() => deleteHandler(selectedRow)}
                >
                  <span>Delete</span>
                  <TrashIcon />
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: fuzzyFilter,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  return (
    <div className="space-y-4 overflow-hidden bg-white p-4 rounded-md min-w-[580px]">
      <div className="flex items-center gap-4 justify-between py-4">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-8 max-w-sm"
              type="search"
              placeholder="Search .."
              value={
                (table
                  .getColumn(selectedCols as string)
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn(selectedCols as string)
                  ?.setFilterValue(event.target.value)
              }
            />
          </div>
          <CollTableDropDown<T>
            table={table}
            headers={headers}
            checked={(col) => selectedCols === col.id}
            onChange={(v: boolean, col) => {
              if (v) {
                setSelectedCols(col.id as keyof T);
              }
            }}
            title="Search By"
          />
        </div>
        <div className="flex gap-4">
          {shorterFuzzyElements?.map((e, i) => (
            <Filter<T> header={e} table={table} key={i} />
          ))}
        </div>
        <CollTableDropDown<T>
          table={table}
          headers={headers}
          onChange={(v: boolean, col) => col.toggleVisibility(!!v)}
          title="Columns"
          checked={(column) => column.getIsVisible()}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination<T> table={table} />
    </div>
  );
}

DataTable.displayName = "DataTable";

type Headers<T> = {
  title: string;
  accessorKey: keyof T;
}[];

/* function buildMapFromHeaders<T>(headers: Headers<T>,defaultFilter:keyof T): Map<keyof T, boolean> {
  const generatedObj: { [key in keyof T]: boolean } = {} as any;

  headers.forEach(header => {
    generatedObj[header.accessorKey] = false;
  });

  const map = new Map<keyof T, boolean>(Object.entries(generatedObj) as [keyof T, boolean][]);
  map.set(defaultFilter, true);
  return map;
}
*/
