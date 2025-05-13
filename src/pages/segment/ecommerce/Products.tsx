
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useSegment } from '@/contexts/SegmentContext';
import apiService from '@/services/apiService';
import { DataTable } from '@/components/ui/data-table';
import { Product } from '@/components/ecommerce/types';
import { columns } from '@/components/ecommerce/ProductColumn';
import AddProductDialog from '@/components/ecommerce/AddProductDialog';
import EditProductDialog from '@/components/ecommerce/EditProductDialog';
import DeleteProductDialog from '@/components/ecommerce/DeleteProductDialog';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false);
  const { toast } = useToast();
  const { segmentName } = useSegment();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    },
    {
      name: 'E-commerce',
      href: '/segment/ecommerce/products',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M3 3H5L5.4 5M7 13H17L21 5H8.1M6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V5M6 19H22M6 5H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    },
    {
      name: 'CRM',
      href: '/segment/crm/contacts',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H4C2.93913 15 1.92172 15.4214 1.17157 16.1716C0.421427 16.9217 0 17.9391 0 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 8H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 5V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    },
    {
      name: 'Configurações',
      href: '/settings',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M14.7 6.3A1 1 0 0 1 16.1 8.4L18.5 10.8A1 1 0 0 1 19 12V12A1 1 0 0 1 18.5 13.2L16.1 15.6A1 1 0 0 1 14.7 17.7M9.3 17.7A1 1 0 0 1 7.9 15.6L5.5 13.2A1 1 0 0 1 5 12V12A1 1 0 0 1 5.5 10.8L7.9 8.4A1 1 0 0 1 9.3 6.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.20001 8.20001C7.84001 7.06 7.06 6.28 5.92 5.92C4.78 5.56 3.64 6.22 3.28 7.36C2.92 8.5 3.58 9.64 4.72 10C5.86 10.36 7 9.64 7.36 8.5C7.54733 8.36267 7.84733 8.06267 8.20001 8.20001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.8 15.8C16.16 16.94 16.94 17.72 18.08 18.08C19.22 18.44 20.36 17.78 20.72 16.64C21.08 15.5 20.42 14.36 19.28 14C18.14 13.64 17 14.36 16.64 15.5C16.4527 15.6373 16.1527 15.9373 15.8 15.8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await apiService.getProducts();
        // Ensure all products have valid status values
        const typedProducts = productsData.map(product => ({
          ...product,
          status: product.status as "active" | "inactive" | "out_of_stock"
        }));
        setProducts(typedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Erro ao carregar produtos",
          description: "Não foi possível carregar os produtos. Por favor, tente novamente.",
          variant: "destructive",
        });
      }
    };

    fetchProducts();
  }, [toast]);

  const handleAddProduct = async (product: Product) => {
    try {
      await apiService.addProduct(product);
      setProducts(prev => [...prev, product]);
      setIsAddProductOpen(false);
      toast({
        title: "Produto adicionado",
        description: "O produto foi adicionado com sucesso.",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Erro ao adicionar produto",
        description: "Não foi possível adicionar o produto. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProduct = async (product: Product) => {
    try {
      await apiService.updateProduct(product);
      setProducts(prev =>
        prev.map(p => (p.id === product.id ? product : p))
      );
      setIsEditProductOpen(false);
      toast({
        title: "Produto atualizado",
        description: "O produto foi atualizado com sucesso.",
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Erro ao atualizar produto",
        description: "Não foi possível atualizar o produto. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await apiService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      setIsDeleteProductOpen(false);
      toast({
        title: "Produto excluído",
        description: "O produto foi excluído com sucesso.",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Erro ao excluir produto",
        description: "Não foi possível excluir o produto. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        <PageContainer>
          <Helmet>
            <title>Produtos | Sistema</title>
          </Helmet>

          <PageHeader
            title="Produtos"
            description={`Gerencie seus produtos para o segmento de ${segmentName}`}
            action={
              <Button onClick={() => setIsAddProductOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Produto
              </Button>
            }
          />

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <DataTable 
                columns={columns(
                  (product: Product) => {
                    setSelectedProduct(product);
                    setIsEditProductOpen(true);
                  },
                  (product: Product) => {
                    setSelectedProduct(product);
                    setIsDeleteProductOpen(true);
                  }
                )} 
                data={filteredProducts}
                onRowClick={(product) => {
                  setSelectedProduct(product);
                  setIsEditProductOpen(true);
                }}
                emptyMessage="Nenhum produto encontrado."
              />
            </CardContent>
          </Card>

          <AddProductDialog
            open={isAddProductOpen}
            onOpenChange={setIsAddProductOpen}
            onAddProduct={handleAddProduct}
          />

          {selectedProduct && (
            <EditProductDialog
              open={isEditProductOpen}
              onOpenChange={setIsEditProductOpen}
              product={selectedProduct}
              onUpdateProduct={handleUpdateProduct}
            />
          )}

          {selectedProduct && (
            <DeleteProductDialog
              open={isDeleteProductOpen}
              onOpenChange={setIsDeleteProductOpen}
              product={selectedProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          )}
        </PageContainer>
      </div>
    </div>
  );
};

export default Products;
