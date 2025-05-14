
// If this file doesn't exist already, we'll create it with the correct type definitions

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
  status: 'active' | 'out_of_stock' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface AddProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
  status: 'active' | 'out_of_stock' | 'inactive';
}

// For the Products.tsx component that uses the Product type
