import { Column } from "@tanstack/react-table";
import type { Table as ITable } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { tableDisplayHeader } from "@/lib/utils";

type CollProps<T> = {
  title: string;
  onChange: (v: boolean, col: Column<T, unknown>) => void;
  table: ITable<T>;
  headers: Headers<T>;
  checked: (col: Column<T, unknown>) => boolean;
};
export function CollTableDropDown<T>({
  title,
  onChange,
  table,
  headers,
  checked,
}: CollProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto px-4">
          {title} <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={checked(column)}
                onCheckedChange={(v) => onChange(v, column)}
              >
                {
                  tableDisplayHeader<T>(
                    headers,
                    column.id as keyof T,
                  ) as React.ReactNode
                }
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
type Headers<T> = {
  title: string;
  accessorKey: keyof T;
}[];
