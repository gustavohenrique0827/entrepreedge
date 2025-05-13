
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, Plus, Search } from 'lucide-react';

const Products = () => {
  // Sample product data
  const products = [
    { id: 1, name: 'Smartphone Galaxy X20', price: 1299.99, stock: 45, category: 'Eletrônicos' },
    { id: 2, name: 'Notebook UltraSlim', price: 3499.99, stock: 12, category: 'Eletrônicos' },
    { id: 3, name: 'Tênis Runner Pro', price: 299.99, stock: 78, category: 'Esportes' },
    { id: 4, name: 'Cafeteira Elétrica', price: 189.99, stock: 23, category: 'Casa' },
    { id: 5, name: 'Monitor Curvo 32"', price: 1999.99, stock: 8, category: 'Eletrônicos' }
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Gerenciamento de Produtos"
        description="Cadastre e gerencie todos os produtos da sua loja online"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo Produto
          </Button>
        }
      />

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar produtos..." className="pl-8" />
            </div>
            <Button variant="outline" className="sm:w-[120px]">
              Filtrar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" /> 
            <span>Lista de Produtos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Nome</th>
                  <th className="py-3 px-4 text-right">Preço</th>
                  <th className="py-3 px-4 text-center">Estoque</th>
                  <th className="py-3 px-4 text-left">Categoria</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b">
                    <td className="py-3 px-4 text-left">{product.name}</td>
                    <td className="py-3 px-4 text-right">R$ {product.price.toFixed(2)}</td>
                    <td className="py-3 px-4 text-center">{product.stock}</td>
                    <td className="py-3 px-4 text-left">{product.category}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">Editar</Button>
                        <Button variant="destructive" size="sm">Excluir</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default Products;
