'use client';
import { ColumnDef, Row } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { IQuiz } from '@/types/quiz';
import { Student } from '@/types/students';
import { Ping } from '../icons/ping';
import Link from 'next/link';
import Delete from '../common/buttons/delete';
export function CustomColumns(): ColumnDef<Student> {
  return {
    header: 'Actions',
    cell: ({ row }: { row: Row<Student> }) => {
      const handleDelete = () => {
        console.log(`Delete quiz with ID: ${row.original.id}`);
      };
      return (
        <div className="flex gap-2 items-center ">
          <Button >
		  <Link href={`/dashboard/student/${row.original.id}`}>
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
