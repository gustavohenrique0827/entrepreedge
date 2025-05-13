
import React, { useState, useEffect } from 'react';
import { SegmentPageLayout } from '@/components/segment/SegmentPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSegment } from '@/contexts/SegmentContext';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/segment/DataTable';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, PlusCircle, X, Edit, Trash2, Image, ChevronUp, ChevronDown, Copy, Eye, Save, FileCheck } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data for products
const generateMockProducts = () => {
  const categories = ['Eletrônicos', 'Roupas', 'Acessórios', 'Casa', 'Beleza', 'Esportes'];
  const status = ['Ativo', 'Inativo', 'Esgotado'];
  
  return Array.from({ length: 20 }, (_, i) => ({
    id: `PROD${String(i + 101).padStart(3, '0')}`,
    name: `Produto ${i + 1}`,
    description: `Descrição detalhada do produto ${i + 1}. Este é um exemplo de descrição.`,
    price: Math.floor(Math.random() * 1000) + 20,
    costPrice: Math.floor(Math.random() * 800) + 10,
    sku: `SKU-${String(i + 101).padStart(4, '0')}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    stock: Math.floor(Math.random() * 100),
    status: status[Math.floor(Math.random() * status.length)],
    images: [
      '/placeholder-product.jpg',
      '/placeholder-product-2.jpg'
    ],
    featured: i < 3,
    weight: Math.floor(Math.random() * 5) + 0.2,
    dimensions: {
      length: Math.floor(Math.random() * 30) + 5,
      width: Math.floor(Math.random() * 20) + 5,
      height: Math.floor(Math.random() * 15) + 2
    },
    variations: i % 3 === 0 ? [
      { name: 'Cor', options: ['Vermelho', 'Azul', 'Preto'] },
      { name: 'Tamanho', options: ['P', 'M', 'G'] }
    ] : [],
    dateCreated: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
  }));
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const statusStyleMap: Record<string, string> = {
  'Ativo': 'bg-green-100 text-green-800 border-green-300',
  'Inativo': 'bg-gray-100 text-gray-800 border-gray-300',
  'Esgotado': 'bg-red-100 text-red-800 border-red-300',
};

// Local storage key
const PRODUCTS_STORAGE_KEY = 'ecommerce_products';

const Products = () => {
  const { segmentName } = useSegment();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Form state for new/edit product
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    costPrice: '',
    sku: '',
    category: '',
    stock: '',
    status: 'Ativo',
    featured: false,
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    }
  });
  
  // Load products from local storage or generate mock data
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        
        // Try to load from localStorage first
        const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
        
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        } else {
          // Generate mock data if nothing in localStorage
          const mockProducts = generateMockProducts();
          setProducts(mockProducts);
          
          // Save to localStorage
          localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(mockProducts));
        }
      } catch (error) {
        console.error('Error loading products:', error);
        toast({
          title: 'Erro ao carregar produtos',
          description: 'Não foi possível carregar a lista de produtos.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  // Save products to local storage whenever they change
  useEffect(() => {
    if (products.length > 0 && !isLoading) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    }
  }, [products, isLoading]);
  
  // Handle row click to show details
  const handleRowClick = (product: any) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
    setIsEditMode(false);
  };
  
  // Handle edit product
  const handleEditProduct = () => {
    if (!selectedProduct) return;
    
    setFormData({
      name: selectedProduct.name,
      description: selectedProduct.description,
      price: selectedProduct.price.toString(),
      costPrice: selectedProduct.costPrice.toString(),
      sku: selectedProduct.sku,
      category: selectedProduct.category,
      stock: selectedProduct.stock.toString(),
      status: selectedProduct.status,
      featured: selectedProduct.featured,
      weight: selectedProduct.weight?.toString() || '',
      dimensions: {
        length: selectedProduct.dimensions?.length?.toString() || '',
        width: selectedProduct.dimensions?.width?.toString() || '',
        height: selectedProduct.dimensions?.height?.toString() || ''
      }
    });
    
    setIsEditMode(true);
  };
  
  // Handle delete product
  const handleDeleteProduct = () => {
    if (!selectedProduct) return;
    
    const updatedProducts = products.filter(p => p.id !== selectedProduct.id);
    setProducts(updatedProducts);
    setIsDeleteDialogOpen(false);
    setIsDetailsOpen(false);
    
    toast({
      title: 'Produto excluído',
      description: `O produto "${selectedProduct.name}" foi excluído com sucesso.`,
    });
  };
  
  // Handle form change
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      featured: checked
    }));
  };
  
  // Handle save product (for both new and edit)
  const handleSaveProduct = () => {
    // Basic validation
    if (!formData.name || !formData.price || !formData.stock) {
      toast({
        title: 'Dados incompletos',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }
    
    // Format data
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      costPrice: parseFloat(formData.costPrice),
      stock: parseInt(formData.stock),
      weight: formData.weight ? parseFloat(formData.weight) : 0,
      dimensions: {
        length: formData.dimensions.length ? parseFloat(formData.dimensions.length) : 0,
        width: formData.dimensions.width ? parseFloat(formData.dimensions.width) : 0,
        height: formData.dimensions.height ? parseFloat(formData.dimensions.height) : 0,
      }
    };
    
    if (isEditMode && selectedProduct) {
      // Update existing product
      const updatedProducts = products.map(p => 
        p.id === selectedProduct.id ? { ...selectedProduct, ...productData } : p
      );
      
      setProducts(updatedProducts);
      setSelectedProduct({ ...selectedProduct, ...productData });
      
      toast({
        title: 'Produto atualizado',
        description: `O produto "${formData.name}" foi atualizado com sucesso.`,
      });
    } else {
      // Create new product
      const newProduct = {
        id: `PROD${String(Math.floor(Math.random() * 9000) + 1000)}`,
        ...productData,
        images: ['/placeholder-product.jpg'],
        variations: [],
        dateCreated: new Date().toISOString()
      };
      
      setProducts([newProduct, ...products]);
      
      toast({
        title: 'Produto criado',
        description: `O produto "${formData.name}" foi criado com sucesso.`,
      });
    }
    
    // Reset and close
    setIsEditMode(false);
    setFormData({
      name: '',
      description: '',
      price: '',
      costPrice: '',
      sku: '',
      category: '',
      stock: '',
      status: 'Ativo',
      featured: false,
      weight: '',
      dimensions: {
        length: '',
        width: '',
        height: ''
      }
    });
  };
  
  // Reset form for new product
  const handleNewProduct = () => {
    setSelectedProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      costPrice: '',
      sku: '',
      category: '',
      stock: '',
      status: 'Ativo',
      featured: false,
      weight: '',
      dimensions: {
        length: '',
        width: '',
        height: ''
      }
    });
    setIsEditMode(true);
    setIsDetailsOpen(true);
  };
  
  // Column definitions
  const columns = [
    { accessorKey: 'id', header: 'Código' },
    { accessorKey: 'name', header: 'Nome' },
    { 
      accessorKey: 'price', 
      header: 'Preço',
      cell: (info: any) => formatCurrency(info.getValue())
    },
    { accessorKey: 'category', header: 'Categoria' },
    { accessorKey: 'stock', header: 'Estoque' },
    { 
      accessorKey: 'status', 
      header: 'Status',
      cell: (info: any) => {
        const status = info.getValue();
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyleMap[status] || ''}`}>
            {status}
          </span>
        );
      }
    }
  ];
  
  return (
    <SegmentPageLayout 
      title="Cadastro de Produtos"
      description={`Gerenciamento de produtos para o segmento de ${segmentName}`}
      action={
        <Button onClick={handleNewProduct}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Produto
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Produtos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={products} 
            onRowClick={handleRowClick}
            searchable={true}
            emptyMessage="Nenhum produto cadastrado."
          />
        </CardContent>
      </Card>
      
      {/* Product Details/Edit Sheet */}
      <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <SheetContent className="w-full sm:max-w-[540px] overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle>
              {isEditMode 
                ? (selectedProduct ? 'Editar Produto' : 'Novo Produto')
                : 'Detalhes do Produto'
              }
            </SheetTitle>
            <SheetDescription>
              {isEditMode 
                ? 'Preencha os detalhes do produto abaixo.'
                : selectedProduct?.description
              }
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-4">
            {/* View Mode */}
            {!isEditMode && selectedProduct ? (
              <div className="space-y-6">
                {/* Product Images */}
                <div className="flex gap-2 my-4 overflow-x-auto pb-2">
                  {selectedProduct.images?.map((img: string, idx: number) => (
                    <div key={idx} className="relative min-w-[100px] h-[100px] rounded-md overflow-hidden border">
                      <img 
                        src={img || '/placeholder-product.jpg'} 
                        alt={`${selectedProduct.name} - Imagem ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Nome</p>
                    <p className="text-sm">{selectedProduct.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Código</p>
                    <p className="text-sm">{selectedProduct.id}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Preço de Venda</p>
                    <p className="text-sm">{formatCurrency(selectedProduct.price)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Preço de Custo</p>
                    <p className="text-sm">{formatCurrency(selectedProduct.costPrice)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">SKU</p>
                    <p className="text-sm">{selectedProduct.sku}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Categoria</p>
                    <p className="text-sm">{selectedProduct.category}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Estoque</p>
                    <p className="text-sm">{selectedProduct.stock} unidades</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyleMap[selectedProduct.status] || ''}`}>
                      {selectedProduct.status}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Peso</p>
                    <p className="text-sm">{selectedProduct.weight} kg</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Dimensões</p>
                    <p className="text-sm">
                      {selectedProduct.dimensions?.length}cm × {selectedProduct.dimensions?.width}cm × {selectedProduct.dimensions?.height}cm
                    </p>
                  </div>
                  
                  <div className="col-span-2">
                    <p className="text-sm font-medium">Destaque</p>
                    <p className="text-sm">{selectedProduct.featured ? 'Sim' : 'Não'}</p>
                  </div>
                </div>
                
                {selectedProduct.variations && selectedProduct.variations.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Variações</p>
                    <div className="space-y-2">
                      {selectedProduct.variations.map((variation: any, idx: number) => (
                        <div key={idx} className="bg-muted/50 p-2 rounded-md">
                          <p className="text-sm font-medium">{variation.name}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {variation.options.map((option: string, optIdx: number) => (
                              <span key={optIdx} className="px-2 py-1 bg-background text-xs rounded-md">
                                {option}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="pt-4 space-x-2 flex justify-between">
                  <div>
                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirmar exclusão</DialogTitle>
                          <DialogDescription>
                            Tem certeza que deseja excluir o produto "{selectedProduct.name}"? Esta ação não pode ser desfeita.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancelar
                          </Button>
                          <Button variant="destructive" onClick={handleDeleteProduct}>
                            Excluir
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setIsDetailsOpen(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Fechar
                    </Button>
                    <Button size="sm" onClick={handleEditProduct}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              /* Edit/New Mode */
              <ScrollArea className="h-[calc(100vh-10rem)]">
                <div className="space-y-6 pr-4">
                  <Tabs defaultValue="basic">
                    <TabsList className="mb-4">
                      <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
                      <TabsTrigger value="details">Detalhes</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="basic" className="space-y-4">
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="name">Nome do Produto *</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleFormChange} 
                            placeholder="Nome do produto" 
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="description">Descrição</Label>
                          <Textarea 
                            id="description" 
                            name="description" 
                            value={formData.description} 
                            onChange={handleFormChange} 
                            placeholder="Descrição detalhada do produto"
                            rows={3}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="price">Preço de Venda *</Label>
                            <Input 
                              id="price" 
                              name="price" 
                              value={formData.price} 
                              onChange={handleFormChange} 
                              placeholder="0,00"
                              type="number"
                              step="0.01"
                              min="0"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="costPrice">Preço de Custo</Label>
                            <Input 
                              id="costPrice" 
                              name="costPrice" 
                              value={formData.costPrice} 
                              onChange={handleFormChange} 
                              placeholder="0,00"
                              type="number"
                              step="0.01"
                              min="0"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="stock">Estoque *</Label>
                            <Input 
                              id="stock" 
                              name="stock" 
                              value={formData.stock} 
                              onChange={handleFormChange} 
                              placeholder="0"
                              type="number"
                              min="0"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="sku">SKU</Label>
                            <Input 
                              id="sku" 
                              name="sku" 
                              value={formData.sku} 
                              onChange={handleFormChange} 
                              placeholder="SKU-0000"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="category">Categoria</Label>
                            <Input 
                              id="category" 
                              name="category" 
                              value={formData.category} 
                              onChange={handleFormChange} 
                              placeholder="Categoria do produto"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="status">Status</Label>
                            <Select name="status" value={formData.status} onValueChange={(value) => {
                              setFormData(prev => ({ ...prev, status: value }));
                            }}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Ativo">Ativo</SelectItem>
                                <SelectItem value="Inativo">Inativo</SelectItem>
                                <SelectItem value="Esgotado">Esgotado</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 pt-2">
                          <Checkbox 
                            id="featured" 
                            checked={formData.featured}
                            onCheckedChange={handleCheckboxChange}
                          />
                          <Label htmlFor="featured" className="cursor-pointer">
                            Destacar produto
                          </Label>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="details" className="space-y-4">
                      <div>
                        <Label>Dimensões</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <div>
                            <Label htmlFor="dimensions.length" className="text-xs">Comprimento (cm)</Label>
                            <Input 
                              id="dimensions.length" 
                              name="dimensions.length" 
                              value={formData.dimensions.length} 
                              onChange={handleFormChange} 
                              placeholder="0"
                              type="number"
                              min="0"
                              step="0.1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="dimensions.width" className="text-xs">Largura (cm)</Label>
                            <Input 
                              id="dimensions.width" 
                              name="dimensions.width" 
                              value={formData.dimensions.width} 
                              onChange={handleFormChange} 
                              placeholder="0"
                              type="number"
                              min="0"
                              step="0.1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="dimensions.height" className="text-xs">Altura (cm)</Label>
                            <Input 
                              id="dimensions.height" 
                              name="dimensions.height" 
                              value={formData.dimensions.height} 
                              onChange={handleFormChange} 
                              placeholder="0"
                              type="number"
                              min="0"
                              step="0.1"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="weight">Peso (kg)</Label>
                        <Input 
                          id="weight" 
                          name="weight" 
                          value={formData.weight} 
                          onChange={handleFormChange} 
                          placeholder="0,00"
                          type="number"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      
                      <div>
                        <Label className="block mb-2">Imagens do Produto</Label>
                        <div className="border border-dashed border-gray-300 p-4 rounded-lg text-center bg-muted/20">
                          <div className="flex flex-col items-center gap-2">
                            <Image className="h-8 w-8 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Arraste imagens ou clique para fazer upload
                            </p>
                            <Button variant="outline" size="sm" disabled>
                              Selecionar arquivos
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 text-xs text-muted-foreground">
                        * Campos obrigatórios
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="pt-4 space-x-2 flex justify-end">
                    <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveProduct}>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Produto
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </SegmentPageLayout>
  );
};

export default Products;
