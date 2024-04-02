import { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { capitalize } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export function Filter<T>({
  table,
  header,
}: {
  table: Table<T>;
  header: keyof T;
}) {
  const column = table.getColumn(header as string);
  if (!column) {
    return null; 
  }

  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();
  const getFacetedUniqueValues = column.getFacetedUniqueValues;
  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(getFacetedUniqueValues().keys()).sort(),
    [getFacetedUniqueValues, firstValue],
  );

  return typeof firstValue === "number" || !column.getCanFilter() ? (
    <></>
  ) : (
    <ItemDropDown
      title={`All ${capitalize(header as string, "_", {
        plural: {
          count: 12,
        },
      })}`}
      headers={sortedUniqueValues.slice(0, 500)}
      checked={(col) => {
        return columnFilterValue === col;
      }}
      onChange={(v, h) => {
        if (v) {
          column.setFilterValue(h);
        } else {
          column.setFilterValue(undefined);
        }
      }}
    />
  );
}

type CollProps = {
  title: string;
  onChange: (v: boolean, h: string) => void;
  headers: string[];
  checked: (col: string) => boolean;
};

function ItemDropDown({ title, onChange, headers, checked }: CollProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto px-4">
          {title} <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {headers.map((h, i) => {
          return (
            <DropdownMenuCheckboxItem
              key={i}
              className="capitalize"
              checked={checked(h)}
              onCheckedChange={(v) => onChange(v, h)}
            >
              {h as string}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
