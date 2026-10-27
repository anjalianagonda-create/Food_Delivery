import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Food, CartItem, Order } from './services/api.service';

@Component({ selector: 'app-root', standalone: true, imports: [CommonModule, FormsModule], templateUrl: './app.component.html', styleUrl: './app.component.css' })
export class AppComponent implements OnInit {
  private api = inject(ApiService);
  foods: Food[] = []; filteredFoods: Food[] = []; cart: CartItem[] = []; orders: Order[] = [];
  categories = ['All', 'Biryani', 'Indian', 'Pizza', 'Burgers', 'South Indian', 'Chinese', 'Desserts', 'Drinks'];
  activeCategory = 'All'; search = ''; sort = ''; view = 'home'; loading = false; error = ''; notice = '';
  user: {name: string; email: string; role: string} | null = null;
  authMode: 'login' | 'register' = 'login'; authName = ''; authEmail = ''; authPassword = '';
  customerName = ''; phone = ''; address = ''; latestOrder: Order | null = null;
  ngOnInit(): void { this.loadFoods(); }
  loadFoods(): void { this.loading = true; this.error = ''; this.api.getFoods(this.search, this.activeCategory, this.sort).subscribe({ next: data => { this.foods = data; this.filteredFoods = data; this.loading = false; }, error: () => { this.loading = false; this.error = 'Could not connect to the food service. Start the backend at http://localhost:3000 and try again.'; } }); }
  setCategory(category: string): void { this.activeCategory = category; this.loadFoods(); }
  onSearch(): void { this.loadFoods(); }
  addToCart(food: Food): void { const item = this.cart.find(i => i.food.id === food.id); if (item) item.quantity++; else this.cart.push({food, quantity: 1}); this.notice = `${food.name} added to your cart`; setTimeout(() => this.notice = '', 2200); }
  changeQty(item: CartItem, delta: number): void { item.quantity += delta; if (item.quantity <= 0) this.cart = this.cart.filter(i => i.food.id !== item.food.id); }
  get cartCount(): number { return this.cart.reduce((sum, item) => sum + item.quantity, 0); }
  get subtotal(): number { return this.cart.reduce((sum, item) => sum + item.food.price * item.quantity, 0); }
  get deliveryFee(): number { return this.subtotal === 0 || this.subtotal >= 499 ? 0 : 35; }
  get total(): number { return this.subtotal + this.deliveryFee; }
  open(view: string): void { this.view = view; this.error = ''; this.notice = ''; if (view === 'orders' || view === 'admin') this.loadOrders(); if (view === 'auth') this.authMode = 'login'; window.scrollTo({top: 0, behavior: 'smooth'}); }
  loadOrders(): void { this.api.getOrders().subscribe({next: data => this.orders = data, error: () => this.error = 'Unable to load orders. Is the backend running?'}); }
  submitAuth(): void { this.error = ''; const request = this.authMode === 'register' ? this.api.register({name: this.authName, email: this.authEmail, password: this.authPassword}) : this.api.login({email: this.authEmail, password: this.authPassword}); request.subscribe({next: (result: any) => { this.user = result.user; this.authName = ''; this.authPassword = ''; this.notice = `Welcome${this.user?.name ? ', ' + this.user.name : ''}!`; this.view = 'home'; }, error: (e: any) => this.error = e?.error?.message || 'Could not complete authentication. Try again.'}); }
  checkout(): void { if (!this.cart.length) { this.error = 'Your cart is empty.'; return; } if (!this.customerName.trim() || !this.phone.trim() || !this.address.trim()) { this.error = 'Please complete your name, phone, and delivery address.'; return; } this.error = ''; this.api.createOrder({customerName: this.customerName, phone: this.phone, address: this.address, items: this.cart.map(i => ({foodId: i.food.id, quantity: i.quantity}))}).subscribe({next: order => { this.latestOrder = order; this.cart = []; this.view = 'success'; this.customerName = ''; this.phone = ''; this.address = ''; }, error: (e: any) => this.error = e?.error?.message || 'Order could not be placed. Please try again.'}); }
  updateOrder(order: Order, status: string): void { this.api.updateStatus(order.id, status).subscribe({next: updated => { order.status = updated.status; this.notice = `Order #${order.id} updated`; }, error: () => this.error = 'Could not update order status.'}); }
  logout(): void { this.user = null; this.view = 'home'; this.notice = 'You have signed out.'; }
  trackFood(_index: number, food: Food): number { return food.id; }
}
