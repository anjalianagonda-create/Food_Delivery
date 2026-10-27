import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { MenuComponent } from './pages/menu.component';
import { CartComponent } from './pages/cart.component';
import { CheckoutComponent } from './pages/checkout.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Foodie | Home' },
  { path: 'menu', component: MenuComponent, title: 'Food Menu' },
  { path: 'cart', component: CartComponent, title: 'Your Cart' },
  { path: 'checkout', component: CheckoutComponent, title: 'Checkout' },
  { path: '**', redirectTo: '' }
];
