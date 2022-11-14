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

export type InitialProductState = {
  products: Products[];

  activeImg: string;
};

export type Search = {
  text: string;
  searchAllCategories: boolean;
};

export type InitialSearchState = {
  searchText: string;
  searchAllCategories: boolean;
  searchResult: Products[];
  selectedCategory: string;
};
