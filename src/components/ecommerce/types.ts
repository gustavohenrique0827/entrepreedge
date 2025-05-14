
export type ProductStatus = "active" | "out_of_stock" | "inactive";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}
