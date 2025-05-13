
import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from './types';

// Helper to format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  out_of_stock: 'bg-red-100 text-red-800'
};

export type ProductColumn = {
  accessorKey: keyof Product | string;
  header: string;
  cell?: (info: { getValue: () => any; row: any }) => React.ReactNode;
};

export const columns = (
  onEdit: (product: Product) => void,
  onDelete: (product: Product) => void
): ProductColumn[] => [
  {
    accessorKey: 'name',
    header: 'Produto',
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: (info) => {
      const value = info.getValue();
      return value.length > 50 ? `${value.substring(0, 50)}...` : value;
    }
  },
  {
    accessorKey: 'price',
    header: 'Preço',
    cell: (info) => formatCurrency(info.getValue()),
  },
  {
    accessorKey: 'stock',
    header: 'Estoque',
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => {
      const status = info.getValue();
      const statusLabel = {
        'active': 'Ativo',
        'inactive': 'Inativo',
        'out_of_stock': 'Sem estoque'
      }[status] || status;
      
      return (
        <Badge variant="outline" className={statusColors[status]}>
          {statusLabel}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: (info) => {
      const product = info.row;
      return (
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" title="Editar" onClick={(e) => {
            e.stopPropagation();
            onEdit(product);
          }}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Excluir" onClick={(e) => {
            e.stopPropagation();
            onDelete(product);
          }}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
