"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paginationProps?: {
    needPagination: boolean;
    totalPages: number;
    currentPage: number;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  paginationProps,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const pageChange = (page: number) => {
    if (paginationProps) {
      // change the state of page
      router.push(`?page=${page}`);
    }
  }

  return (
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
                          header.getContext()
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        {/* Pagination Controls */}
        {paginationProps && paginationProps.needPagination && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length - 1} className="text-left">
                Page {paginationProps.currentPage} of {paginationProps.totalPages}
            </TableCell>

            <TableCell>
              <Button
                variant="outline"
                size="sm"
                disabled={paginationProps.currentPage === 1}
                onClick={() =>
                  pageChange(paginationProps.currentPage - 1)
                }
              >
                Previous
              </Button>

              {Array.from({ length: paginationProps.totalPages }).map(
                (_, i) => (
                  <Link
                    key={i}
                    href={`?page=${i + 1}`}
                    className={`px-3 py-1 border rounded ${
                      paginationProps.currentPage === i + 1
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {i + 1}
                  </Link>
                )
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  pageChange(paginationProps.currentPage + 1)
                }
                disabled={
                  paginationProps.currentPage === paginationProps.totalPages
                }
              >
                Next
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
        )}
      </Table>
    </div>
  );
}
export default DataTable;
