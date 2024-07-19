export interface CartItem {
  id: number;
  image: string;
  title: string;
  category: string;
  price: string;
  quantity: number;
  stock: number;
  description: string;
}

export type AddToCartProps = {
  onAddToCart: (quantity: number) => void;
  product: CartItem;
};
