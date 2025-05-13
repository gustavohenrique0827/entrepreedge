
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';

export interface DataTableProps {
  columns: Array<{
    accessorKey: string;
    header: string;
    cell?: (info: any) => any;
  }>;
  data: any[];
  onRowClick?: (row: any) => void;
  onAddNew?: () => void;
  searchable?: boolean;
  pagination?: boolean;
  emptyMessage?: string;
}

export function DataTable({
  columns,
  data,
  onRowClick,
  onAddNew,
  searchable = true,
  pagination = false,
  emptyMessage = "Nenhum registro encontrado."
}: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Filter data based on search query
  const filteredData = searchQuery === "" 
    ? data 
    : data.filter(item => {
        return Object.keys(item).some(key => {
          const value = item[key];
          if (value == null) return false;
          return value.toString().toLowerCase().includes(searchQuery.toLowerCase());
        });
      });
  
  // Get paginated data
  const paginatedData = pagination 
    ? filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredData;
  
  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  
  // Calculate total pages
  const totalPages = pagination ? Math.ceil(filteredData.length / itemsPerPage) : 1;
  
  return (
    <div className="space-y-4">
      {/* Search and Add New */}
      {(searchable || onAddNew) && (
        <div className="flex items-center justify-between">
          {searchable && (
            <div className="relative max-w-xs">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
          
          {onAddNew && (
            <Button onClick={onAddNew}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Novo
            </Button>
          )}
        </div>
      )}
      
      {/* Table */}
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
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, rowIndex) => (
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
      
      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} a{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} de {filteredData.length} registros
          </p>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Página anterior</span>
            </Button>
            
            <div className="text-sm">
              Página {currentPage} de {totalPages}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Próxima página</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
