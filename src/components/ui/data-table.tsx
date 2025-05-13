
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export interface DataTableProps {
  columns: Array<{
    accessorKey: string;
    header: string;
    cell?: (info: any) => React.ReactNode;
  }>;
  data: any[];
  onRowClick?: (row: any) => void;
  emptyMessage?: string;
  title?: string;
}

export function DataTable({
  columns,
  data,
  onRowClick,
  emptyMessage = "Nenhum registro encontrado.",
  title
}: DataTableProps) {
  return (
    <div>
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.accessorKey}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow 
                  key={rowIndex}
                  className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column) => (
                    <TableCell key={`${rowIndex}-${column.accessorKey}`}>
                      {column.cell 
                        ? column.cell({ getValue: () => row[column.accessorKey], row })
                        : row[column.accessorKey]
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
