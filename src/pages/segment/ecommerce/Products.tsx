
import React, { useState, useEffect } from 'react';
import { useSegment } from '@/contexts/SegmentContext';
import { SegmentPageLayout } from '@/components/segment/SegmentPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormLayout } from '@/components/segment/FormLayout';
import { DataTable } from '@/components/segment/DataTable';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Search, Plus, Edit, Trash, Image, Tag, DollarSign } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Dados simulados de produtos
const initialProducts = [
  {
    id: 'prod-001',
    name: 'Smartphone X Pro',
    price: 1299.99,
    sku: 'SP-X-001',
    category: 'Eletrônicos',
    stock: 45,
    status: 'Ativo',
    imageUrl: 'https://placehold.co/100x100',
    description: 'Smartphone de última geração com câmera de alta resolução e bateria de longa duração.'
  },
  {
    id: 'prod-002',
    name: 'Notebook Ultra Slim',
    price: 2499.99,
    sku: 'NB-US-002',
    category: 'Informática',
    stock: 15,
    status: 'Ativo',
    imageUrl: 'https://placehold.co/100x100',
    description: 'Notebook ultrafino com processador de alta performance e SSD rápido.'
  },
  {
    id: 'prod-003',
    name: 'Fones de Ouvido Bluetooth',
    price: 199.99,
    sku: 'FO-BT-003',
    category: 'Acessórios',
    stock: 100,
    status: 'Ativo',
    imageUrl: 'https://placehold.co/100x100',
    description: 'Fones de ouvido com conexão bluetooth, bateria de longa duração e cancelamento de ruído.'
  },
  {
    id: 'prod-004',
    name: 'Smart TV 55"',
    price: 3299.99,
    sku: 'TV-55-004',
    category: 'Eletrônicos',
    stock: 8,
    status: 'Ativo',
    imageUrl: 'https://placehold.co/100x100',
    description: 'Smart TV com tela 4K, HDR e sistema operacional inteligente.'
  },
  {
    id: 'prod-005',
    name: 'Mouse Gamer RGB',
    price: 149.99,
    sku: 'MS-GM-005',
    category: 'Periféricos',
    stock: 0,
    status: 'Esgotado',
    imageUrl: 'https://placehold.co/100x100',
    description: 'Mouse gamer com sensor de alta precisão, iluminação RGB personalizável e botões programáveis.'
  }
];

// Definição das colunas da tabela de produtos
const productColumns = [
  { accessorKey: 'name', header: 'Produto' },
  { accessorKey: 'sku', header: 'SKU' },
  { 
    accessorKey: 'price', 
    header: 'Preço', 
    cell: (info: any) => window.currencyFormatter.format(info.price) 
  },
  { accessorKey: 'category', header: 'Categoria' },
  { accessorKey: 'stock', header: 'Estoque' },
  { 
    accessorKey: 'status', 
    header: 'Status', 
    cell: (info: any) => {
      const statusClasses = {
        'Ativo': 'bg-green-100 text-green-800',
        'Esgotado': 'bg-red-100 text-red-800',
        'Inativo': 'bg-gray-100 text-gray-800'
      };
      const statusClass = statusClasses[info.status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800';
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
          {info.status}
        </span>
      );
    }
  }
];

// Componente para exibir detalhes do produto
interface ProductDetailsProps {
  product: any;
  onClose: () => void;
  onSave: (product: any) => void;
  onDelete: (id: string) => void;
}

const ProductDetails = ({ product, onClose, onSave, onDelete }: ProductDetailsProps) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [activeTab, setActiveTab] = useState('general');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };
  
  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="inventory">Estoque</TabsTrigger>
          <TabsTrigger value="images">Imagens</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Nome do Produto</label>
              <Input
                name="name"
                value={editedProduct.name}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Descrição</label>
              <textarea
                name="description"
                value={editedProduct.description}
                onChange={handleChange}
                className="w-full min-h-[100px] p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Preço</label>
                <div className="relative">
                  <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    name="price"
                    type="number"
                    value={editedProduct.price}
                    onChange={handleChange}
                    className="pl-8"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Categoria</label>
                <div className="relative">
                  <Tag className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    name="category"
                    value={editedProduct.category}
                    onChange={handleChange}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">SKU</label>
                <Input
                  name="sku"
                  value={editedProduct.sku}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Estoque</label>
                <Input
                  name="stock"
                  type="number"
                  value={editedProduct.stock}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <select
                name="status"
                value={editedProduct.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
                <option value="Esgotado">Esgotado</option>
              </select>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="images" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <Image className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Clique para fazer upload ou arraste uma imagem
                  </p>
                </div>
                <Button className="mt-2" variant="outline">
                  Selecionar Imagem
                </Button>
              </div>
            </div>
            
            {editedProduct.imageUrl && (
              <div className="relative">
                <img 
                  src={editedProduct.imageUrl} 
                  alt={editedProduct.name} 
                  className="w-full h-auto max-h-[200px] object-contain border rounded-md"
                />
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute top-2 right-2"
                  onClick={() => setEditedProduct({...editedProduct, imageUrl: ''})}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium mb-1 block">URL da Imagem</label>
              <Input
                name="imageUrl"
                value={editedProduct.imageUrl}
                onChange={handleChange}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between mt-6">
        <Button 
          variant="destructive" 
          onClick={() => {
            if (confirm('Tem certeza que deseja excluir este produto?')) {
              onDelete(product.id);
            }
          }}
        >
          <Trash className="h-4 w-4 mr-2" />
          Excluir
        </Button>
        
        <div className="space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(editedProduct)}>
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

// Componente para adicionar novo produto
interface AddProductFormProps {
  onSave: (product: any) => void;
  onCancel: () => void;
}

const AddProductForm = ({ onSave, onCancel }: AddProductFormProps) => {
  const [newProduct, setNewProduct] = useState({
    id: `prod-${Math.floor(Math.random() * 1000)}`,
    name: '',
    price: 0,
    sku: '',
    category: '',
    stock: 0,
    status: 'Ativo',
    imageUrl: '',
    description: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.sku) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome do produto e SKU são obrigatórios",
        variant: "destructive"
      });
      return;
    }
    
    onSave(newProduct);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Nome do Produto *</label>
          <Input
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Preço *</label>
            <div className="relative">
              <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={newProduct.price}
                onChange={handleChange}
                required
                className="pl-8"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">SKU *</label>
            <Input
              name="sku"
              value={newProduct.sku}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Categoria</label>
            <Input
              name="category"
              value={newProduct.category}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Estoque</label>
            <Input
              name="stock"
              type="number"
              min="0"
              value={newProduct.stock}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Descrição</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            className="w-full min-h-[100px] p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">URL da Imagem</label>
          <Input
            name="imageUrl"
            value={newProduct.imageUrl}
            onChange={handleChange}
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" onClick={onCancel} type="button">
          Cancelar
        </Button>
        <Button type="submit">
          Adicionar Produto
        </Button>
      </div>
    </form>
  );
};

export default function Products() {
  const { segmentName } = useSegment();
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      setProducts(initialProducts);
      setFilteredProducts(initialProducts);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredProducts(
        products.filter(product => 
          product.name.toLowerCase().includes(query) || 
          product.sku.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, products]);
  
  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };
  
  const handleSaveProduct = (editedProduct: any) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === editedProduct.id ? editedProduct : product
      )
    );
    
    setIsDetailsOpen(false);
    toast({
      title: "Produto atualizado",
      description: `O produto ${editedProduct.name} foi atualizado com sucesso.`,
    });
  };
  
  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    setIsDetailsOpen(false);
    toast({
      title: "Produto excluído",
      description: "O produto foi excluído com sucesso.",
      variant: "destructive"
    });
  };
  
  const handleAddProduct = (newProduct: any) => {
    setProducts(prev => [newProduct, ...prev]);
    setIsAddingProduct(false);
    toast({
      title: "Produto adicionado",
      description: `O produto ${newProduct.name} foi adicionado com sucesso.`,
    });
  };
  
  return (
    <SegmentPageLayout 
      title="Cadastro de Produtos" 
      description={`Gerencie seu catálogo de produtos para o segmento de ${segmentName}`}
      action={
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Buscar produto, SKU ou categoria..." 
              className="w-64 pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddingProduct(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Button>
        </div>
      }
    >
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      ) : (
        <DataTable 
          title="Produtos" 
          data={filteredProducts} 
          columns={productColumns} 
          onRowClick={handleProductClick}
          searchable={false}
          emptyMessage="Nenhum produto encontrado. Crie seu primeiro produto clicando em 'Novo Produto'."
        />
      )}
      
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Produto</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <ProductDetails 
              product={selectedProduct} 
              onClose={() => setIsDetailsOpen(false)} 
              onSave={handleSaveProduct}
              onDelete={handleDeleteProduct}
            />
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Produto</DialogTitle>
          </DialogHeader>
          <AddProductForm 
            onSave={handleAddProduct}
            onCancel={() => setIsAddingProduct(false)}
          />
        </DialogContent>
      </Dialog>
    </SegmentPageLayout>
  );
}
