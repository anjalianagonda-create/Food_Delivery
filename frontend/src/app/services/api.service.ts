import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Food { id: number; name: string; category: string; restaurant: string; description: string; price: number; rating: number; time: string; veg: boolean; image: string; tag: string; }
export interface CartItem { food: Food; quantity: number; }
export interface Order { id: number; customerName: string; phone: string; address: string; items: { foodId: number; name: string; price: number; quantity: number }[]; subtotal: number; deliveryFee: number; total: number; status: string; createdAt: string; }
@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api';
  getFoods(q = '', category = 'All', sort = ''): Observable<Food[]> { return this.http.get<Food[]>(`${this.baseUrl}/foods`, { params: { q, category, sort } }); }
  register(data: {name: string; email: string; password: string}): Observable<any> { return this.http.post(`${this.baseUrl}/auth/register`, data); }
  login(data: {email: string; password: string}): Observable<any> { return this.http.post(`${this.baseUrl}/auth/login`, data); }
  createOrder(data: {customerName: string; phone: string; address: string; items: {foodId: number; quantity: number}[]}): Observable<Order> { return this.http.post<Order>(`${this.baseUrl}/orders`, data); }
  getOrders(): Observable<Order[]> { return this.http.get<Order[]>(`${this.baseUrl}/orders`); }
  updateStatus(id: number, status: string): Observable<Order> { return this.http.patch<Order>(`${this.baseUrl}/orders/${id}/status`, {status}); }
}
