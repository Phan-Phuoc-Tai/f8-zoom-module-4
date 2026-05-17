export type Product = {
  id: string;
  name: string;
  price: number;
  salePrice: number;
  description: string;
  shortDescription: string;
  thumbnail: string;
  status: boolean;
  categoryId: number;
  category: {
    name: string;
    id: number;
  };
  images: string[];
  updatedAt?: string;
};
