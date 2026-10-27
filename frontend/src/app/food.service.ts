import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Food, CartItem } from './models';

const fallbackFoods: Food[] = [
  { id: 1, name: 'Chicken Biryani', category: 'Biryani', price: 220, description: 'Fragrant basmati rice with a warming blend of spices.', image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=700' },
  { id: 2, name: 'Veg Pizza', category: 'Pizza', price: 180, description: 'Classic pizza topped with vegetables and melted cheese.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700' },
  { id: 3, name: 'Classic Burger', category: 'Fast Food', price: 120, description: 'A delicious burger with crisp lettuce and house sauce.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700' },
  { id: 4, name: 'Masala Dosa', category: 'South Indian', price: 90, description: 'Golden, crispy dosa with a savory potato filling.', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=700' },
  { id: 5, name: 'Paneer Tikka', category: 'Vegetarian', price: 160, description: 'Tender paneer cubes marinated with fragrant spices.', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=700' },
  { id: 6, name: 'Chocolate Cake', category: 'Dessert', price: 110, description: 'Rich chocolate cake for the perfect sweet finish.', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700' },
  { id: 7, name: 'French Fries', category: 'Fast Food', price: 80, description: 'Crispy golden fries with a pinch of sea salt.', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=700' },
  { id: 8, name: 'Fresh Lemonade', category: 'Drinks', price: 60, description: 'A refreshing, freshly squeezed lemon drink.', image: 'https://images.unsplash.com/photo-1513558161293-cd8f4fba3f4d?w=700' }
];

@Injectable({ providedIn: 'root' })
export class FoodService {
  private api = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.api}/foods`).pipe(catchError(() => of(fallbackFoods)));
  }

  getCart(): CartItem[] {
    try { return JSON.parse(localStorage.getItem('foodie-cart') || '[]') as CartItem[]; }
    catch { return []; }
  }

  saveCart(items: CartItem[]): void {
    localStorage.setItem('foodie-cart', JSON.stringify(items));
    window.dispatchEvent(new Event('storage'));
  }

  addToCart(food: Food): void {
    const items = this.getCart();
    const existing = items.find(item => item.id === food.id);
    if (existing) existing.quantity += 1;
    else items.push({ ...food, quantity: 1 });
    this.saveCart(items);
  }

  updateQuantity(foodId: number, change: number): void {
    const items = this.getCart().map(item => item.id === foodId ? { ...item, quantity: item.quantity + change } : item).filter(item => item.quantity > 0);
    this.saveCart(items);
  }

  removeFromCart(foodId: number): void {
    this.saveCart(this.getCart().filter(item => item.id !== foodId));
  }

  getTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  placeOrder(payload: { customerName: string; phone: string; address: string; items: { foodId: number; quantity: number }[] }): Observable<any> {
    return this.http.post(`${this.api}/orders`, payload);
  }
}
