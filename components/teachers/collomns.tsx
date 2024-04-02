'use client';
import { ColumnDef, Row } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { Teacher } from '@/types/teachers';
import { Student } from '@/types/students';
import Link from 'next/link';
import Delete from '../common/buttons/delete';
export function CustomColumns(): ColumnDef<Teacher> {
  return {
    header: 'Actions',
    cell: ({ row }: { row: Row<Teacher> }) => {
      const handleDelete = () => {
        console.log(`Delete teacher with ID: ${row.original.id}`);
      };
      return (
        <div className="flex gap-2 items-center ">
          <Button >
		  <Link href={`/dashboard/teacher/${row.original.id}`}>
                  <span>Edit</span>
              </Link>
			  </Button>
			  {/* <Button onClick={handleDelete}>Delete</Button> */}
			  <Delete/>
        </div>
      );
    },
  };
}
