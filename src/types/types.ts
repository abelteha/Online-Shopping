import { boolean } from "yup";

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
  searchResult: Products[];
  searchButtonPressed: boolean;
};

export type InitialFormikSignInState = {
  email: string;
  password: string;
};
export type InitialFormikSignUPState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
};

export type SignUpResponse = {
  idToken: string;
  email: string;
  kind: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
};
export type SignUporInRequest = {
  email: string;
  password: string;
  returnSecureToken: boolean;
};

export type ForgotPasswordRequest = {
  requestType: string;
  email: string;
};

export type SignInResponse = {
  kind: string;
  displayName: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
};

export type InitialAuthState = {
  isAuthenticated: boolean;
  timeToExpire: number | null;
  isEditing: boolean;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  data: SignInResponse | SignUpResponse | null;
  token: string | null;
  user: null;
};

export type InitialUserState = {
  uid: string;
  userName: string;
  isEditingPaymentForm: boolean;
  email: string | null;
  image: string;
  cart: any[];
  itemExistInCart: boolean;
  totalCartItems: number;
  successfullTransaction: boolean;
};
export type InitialFormikCheckOutState = {
  cardHolderName: string;
  cardNumber: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type imagesFetchType = {
  name: string;
  url: string;
};

export type cart = {
  itemName: string;
  itemImage: string;
  itemAmount: number;
  itemPrice: number;
  uid: string;
};

export type UserRegister = {
  name: string;
  nationality: string;
  email: string;
  cart: cart[];
  totalNumberOfItem: number;
};
