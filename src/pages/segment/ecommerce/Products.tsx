
import React, { useState, useEffect } from 'react';
import { SegmentPageLayout } from '@/components/segment/SegmentPageLayout';
import { DataTable } from '@/components/segment/DataTable';
import { FormLayout } from '@/components/segment/FormLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, Package, Edit, Trash, Images, Tag, Bookmark } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Mock data for products
const initialProducts = [
  {
    id: '1',
    name: 'Notebook Pro',
    sku: 'NB-PRO-2023',
    price: 4599.90,
    category: 'Eletrônicos',
    stock: 25,
    description: 'Notebook de alta performance para trabalho e jogos',
    image: 'https://placehold.co/400x300?text=Notebook'
  },
  {
    id: '2',
    name: 'Smartphone X',
    sku: 'SP-X-2023',
    price: 2199.90,
    category: 'Celulares',
    stock: 45,
    description: 'Smartphone com câmera de alta resolução e processador rápido',
    image: 'https://placehold.co/400x300?text=Smartphone'
  },
  {
    id: '3',
    name: 'Monitor Curvo 32"',
    sku: 'MON-C32-2023',
    price: 1899.90,
    category: 'Eletrônicos',
    stock: 15,
    description: 'Monitor curvo com resolução 4K e alta taxa de atualização',
    image: 'https://placehold.co/400x300?text=Monitor'
  },
];

// Categories for products
const categories = [
  'Eletrônicos',
  'Celulares',
  'Computadores',
  'Acessórios',
  'Áudio e Vídeo',
  'Games',
  'Casa Inteligente'
];

// Type for product
interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    sku: '',
    price: 0,
    category: '',
    stock: 0,
    description: '',
    image: 'https://placehold.co/400x300?text=Produto'
  });
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  useEffect(() => {
    // Simulate loading data from an API
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Try to get data from localStorage first
        const storedProducts = localStorage.getItem('ecommerce_products');
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        } else {
          // Use initial data if nothing is stored
          setProducts(initialProducts);
          localStorage.setItem('ecommerce_products', JSON.stringify(initialProducts));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: 'Erro ao carregar produtos',
          description: 'Não foi possível carregar a lista de produtos.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddProduct = () => {
    setFormMode('add');
    setCurrentProduct(null);
    setFormData({
      name: '',
      sku: '',
      price: 0,
      category: '',
      stock: 0,
      description: '',
      image: 'https://placehold.co/400x300?text=Produto'
    });
    setFormError('');
    setIsDialogOpen(true);
  };
  
  const handleEditProduct = (product: Product) => {
    setFormMode('edit');
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      price: product.price,
      category: product.category,
      stock: product.stock,
      description: product.description,
      image: product.image
    });
    setFormError('');
    setIsDialogOpen(true);
  };
  
  const handleDeleteProduct = (product: Product) => {
    if (window.confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) {
      const updatedProducts = products.filter(p => p.id !== product.id);
      setProducts(updatedProducts);
      localStorage.setItem('ecommerce_products', JSON.stringify(updatedProducts));
      toast({
        title: 'Produto excluído',
        description: `O produto "${product.name}" foi excluído com sucesso.`
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    
    // Validate form
    if (!formData.name.trim()) {
      setFormError('O nome do produto é obrigatório.');
      return;
    }
    
    if (!formData.sku.trim()) {
      setFormError('O SKU do produto é obrigatório.');
      return;
    }
    
    if (formData.price <= 0) {
      setFormError('O preço do produto deve ser maior que zero.');
      return;
    }
    
    if (!formData.category) {
      setFormError('A categoria do produto é obrigatória.');
      return;
    }
    
    if (formData.stock < 0) {
      setFormError('O estoque não pode ser negativo.');
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let updatedProducts: Product[];
      
      if (formMode === 'add') {
        const newProduct: Product = {
          ...formData,
          id: Date.now().toString()
        };
        updatedProducts = [...products, newProduct];
      } else {
        updatedProducts = products.map(p => 
          p.id === currentProduct?.id ? { ...formData, id: p.id } : p
        );
      }
      
      setProducts(updatedProducts);
      localStorage.setItem('ecommerce_products', JSON.stringify(updatedProducts));
      
      setIsSuccess(true);
      setIsSaving(false);
      
      // Close dialog after success
      setTimeout(() => {
        setIsDialogOpen(false);
      }, 1500);
    } catch (error) {
      console.error('Error saving product:', error);
      setFormError('Ocorreu um erro ao salvar o produto. Tente novamente.');
      setIsSaving(false);
    }
  };
  
  const columns = [
    {
      accessorKey: 'name',
      header: 'Produto',
      cell: (info: { image: string; name: string; sku: string }) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md overflow-hidden">
            <img 
              src={info.image} 
              alt={info.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{info.name}</div>
            <div className="text-xs text-muted-foreground">SKU: {info.sku}</div>
          </div>
        </div>
      )
    },
    {
      accessorKey: 'price',
      header: 'Preço',
      cell: (info: { price: number }) => (
        <div>
          {new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL'
          }).format(info.price)}
        </div>
      )
    },
    {
      accessorKey: 'category',
      header: 'Categoria'
    },
    {
      accessorKey: 'stock',
      header: 'Estoque',
      cell: (info: { stock: number }) => (
        <div className={`font-medium ${info.stock > 10 ? 'text-green-600' : info.stock > 0 ? 'text-amber-600' : 'text-red-600'}`}>
          {info.stock} unid.
        </div>
      )
    },
    {
      accessorKey: 'actions',
      header: 'Ações',
      cell: (info: Product) => (
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleEditProduct(info);
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteProduct(info);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];
  
  return (
    <SegmentPageLayout
      title="Cadastro de Produtos"
      description="Gerencie seu catálogo de produtos - adicione, edite e organize seu estoque."
      action={
        <Button onClick={handleAddProduct}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Produto
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-center gap-3">
            <div className="bg-green-500/20 p-2 rounded-full">
              <Package className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-green-800 dark:text-green-300">Total de Produtos</div>
              <div className="text-2xl font-bold text-green-900 dark:text-green-200">{products.length}</div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-full">
              <Tag className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-blue-800 dark:text-blue-300">Categorias</div>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-200">
                {new Set(products.map(p => p.category)).size}
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg flex items-center gap-3">
            <div className="bg-amber-500/20 p-2 rounded-full">
              <Bookmark className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-amber-800 dark:text-amber-300">Itens em Estoque</div>
              <div className="text-2xl font-bold text-amber-900 dark:text-amber-200">
                {products.reduce((total, p) => total + p.stock, 0)}
              </div>
            </div>
          </div>
        </div>
        
        <DataTable
          title="Lista de Produtos"
          data={products}
          columns={columns}
          onRowClick={handleEditProduct}
          onAddNew={handleAddProduct}
          searchable={true}
          pagination={true}
        />
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>
              {formMode === 'add' ? 'Adicionar novo produto' : 'Editar produto'}
            </DialogTitle>
            <DialogDescription>
              {formMode === 'add' 
                ? 'Preencha os detalhes do novo produto' 
                : 'Atualize as informações do produto'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="flex flex-col space-y-4 md:col-span-1">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto*</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nome do produto"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU (Código)*</Label>
                  <Input 
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    placeholder="Código único do produto"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$)*</Label>
                    <Input 
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="stock">Estoque*</Label>
                    <Input 
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={handleInputChange}
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria*</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4 md:col-span-1">
                <div className="space-y-2">
                  <Label>Imagem do Produto</Label>
                  <div className="bg-muted rounded-md overflow-hidden w-full mb-2">
                    <AspectRatio ratio={4/3}>
                      <img 
                        src={formData.image} 
                        alt="Imagem do produto"
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Função simulada",
                        description: "Em um ambiente real, esta ação abriria um seletor de imagens.",
                      });
                    }}
                  >
                    <Images className="mr-2 h-4 w-4" />
                    Escolher imagem
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descrição detalhada do produto"
                    rows={4}
                  />
                </div>
              </div>
            </div>
            
            {formError && (
              <div className="bg-destructive/15 p-3 rounded-md text-destructive text-sm mb-4">
                {formError}
              </div>
            )}
            
            {isSuccess && (
              <div className="bg-green-100 p-3 rounded-md text-green-800 text-sm mb-4">
                Produto {formMode === 'add' ? 'adicionado' : 'atualizado'} com sucesso!
              </div>
            )}
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {formMode === 'add' ? 'Adicionar produto' : 'Salvar alterações'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </SegmentPageLayout>
  );
}
