
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Column {
  key: string;
  title: string;
  render?: (value: any, record: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  isLoading?: boolean;
  pagination?: {
    pageSize: number;
    currentPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
  };
  searchable?: boolean;
  emptyState?: React.ReactNode;
  onSearch?: (query: string) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  isLoading = false,
  pagination,
  searchable = false,
  emptyState,
  onSearch
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };
  
  const renderPagination = () => {
    if (!pagination) return null;
    
    const { pageSize, currentPage, totalItems, onPageChange } = pagination;
    const totalPages = Math.ceil(totalItems / pageSize);
    
    return (
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Mostrando {(currentPage - 1) * pageSize + 1}-
          {Math.min(currentPage * pageSize, totalItems)} de {totalItems} resultados
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm mx-2">
            Página {currentPage} de {totalPages}
          </div>
          <Button 
            variant="outline" 
            size="icon"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };
  
  const renderEmptyState = () => {
    if (data.length > 0) return null;
    
    if (emptyState) {
      return emptyState;
    }
    
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhum dado encontrado</p>
      </div>
    );
  };
  
  const renderSkeletonRows = () => {
    if (!isLoading) return null;
    
    return Array.from({length: 5}).map((_, i) => (
      <TableRow key={`skeleton-${i}`}>
        {columns.map((column, idx) => (
          <TableCell key={`skeleton-cell-${idx}`}>
            <Skeleton className="h-6 w-full" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };
  
  return (
    <div className="space-y-4">
      {searchable && (
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <Input
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
            <span className="sr-only">Buscar</span>
          </Button>
        </form>
      )}
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              renderSkeletonRows()
            ) : (
              data.length > 0 ? data.map((record, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={`${index}-${column.key}`}>
                      {column.render 
                        ? column.render(record[column.key], record) 
                        : record[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {renderEmptyState()}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
      
      {renderPagination()}
    </div>
  );
};
