export type Products = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type InitialState = {
  products: Products[];
  // SingleProduct: Products;
  activeImg: string;
};
