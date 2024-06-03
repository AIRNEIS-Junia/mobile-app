export type ProductCategory = {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductType = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  quantity: number;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  category: ProductCategory;
  productTypes: ProductType[];
};

export type Products = Product[];
