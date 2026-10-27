export interface Food {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}
export interface CartItem extends Food { quantity: number; }
