import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FoodService } from '../food.service';
import { CartItem } from '../models';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  template: `
    <section class="page-heading"><span class="eyebrow">THE GOOD STUFF</span><h1>Your <em>basket.</em></h1><p>Everything you picked, all in one place.</p></section>
    <section class="cart-layout">
      <div class="cart-list" *ngIf="items.length; else emptyCart">
        <article class="cart-item" *ngFor="let item of items">
          <img [src]="item.image" [alt]="item.name">
          <div class="item-info"><h2>{{item.name}}</h2><p>{{item.category}}</p><b>₹{{item.price}}</b></div>
          <div class="quantity"><button (click)="change(item.id,-1)" aria-label="Decrease quantity">−</button><span>{{item.quantity}}</span><button (click)="change(item.id,1)" aria-label="Increase quantity">+</button></div>
          <b class="line-total">₹{{item.price*item.quantity}}</b>
          <button class="remove" (click)="remove(item.id)" aria-label="Remove item">×</button>
        </article>
        <a class="back-link" routerLink="/menu">← Keep exploring the menu</a>
      </div>
      <ng-template #emptyCart><div class="empty-cart"><span>🛍️</span><h2>Your basket is looking a little empty</h2><p>Let's fix that with something delicious.</p><a routerLink="/menu" class="primary">Browse the menu ↗</a></div></ng-template>
      <aside class="summary" *ngIf="items.length"><h2>Order summary</h2><div class="sum-row"><span>Subtotal</span><b>₹{{total}}</b></div><div class="sum-row"><span>Delivery</span><b class="free">FREE</b></div><div class="sum-row"><span>Taxes</span><b>Included</b></div><div class="sum-total"><span>Total</span><b>₹{{total}}</b></div><a routerLink="/checkout" class="checkout">Continue to checkout <span>↗</span></a><small>Secure checkout · Demo project</small></aside>
    </section>
  `,
  styles: [`
    .page-heading{text-align:center;background:#fbf6ef;padding:48px 20px}.eyebrow{font-size:10px;letter-spacing:2px;font-weight:800;color:#ef5b36}.page-heading h1{font-size:48px;letter-spacing:-2px;margin:12px 0}.page-heading em{font-family:Georgia,serif;color:#ef5b36;font-weight:500}.page-heading p{font-size:13px;color:#817b72}.cart-layout{max-width:1100px;margin:40px auto;padding:0 24px;display:grid;grid-template-columns:1.6fr 1fr;gap:35px;align-items:start}.cart-item{display:grid;grid-template-columns:90px 1fr auto auto auto;align-items:center;gap:16px;padding:17px 0;border-bottom:1px solid #eee9e3}.cart-item img{width:90px;height:82px;object-fit:cover;border-radius:9px}.item-info h2{font-size:14px;margin:0 0 5px}.item-info p{font-size:11px;color:#888;margin:0 0 10px}.item-info b,.line-total{font-size:13px}.quantity{display:flex;align-items:center;gap:10px}.quantity button{width:25px;height:25px;border:1px solid #e9e3dc;border-radius:6px;background:white;cursor:pointer}.quantity span{font-size:12px}.remove{border:0;background:none;color:#aaa;font-size:22px;cursor:pointer}.back-link{display:inline-block;margin-top:25px;color:#e95330;text-decoration:none;font-size:12px}.summary{background:#fbf7f1;padding:25px;border-radius:13px}.summary h2{font-size:18px;margin:0 0 24px}.sum-row,.sum-total{display:flex;justify-content:space-between;font-size:12px;color:#77736c;margin:18px 0}.sum-row b{color:#292824}.sum-row .free{color:#26834a}.sum-total{border-top:1px solid #e6ded4;padding-top:20px;color:#252522;font-weight:800;font-size:15px}.sum-total b{font-size:20px}.checkout,.primary{display:flex;justify-content:center;gap:12px;background:#f45b35;color:white;text-decoration:none;padding:14px;border-radius:8px;font-size:12px;font-weight:750}.checkout span{margin-left:auto}.summary small{display:block;text-align:center;margin-top:14px;color:#999;font-size:10px}.empty-cart{text-align:center;padding:50px 20px;grid-column:1/-1}.empty-cart>span{font-size:48px}.empty-cart h2{font-size:21px}.empty-cart p{color:#888;font-size:13px;margin-bottom:25px}.empty-cart .primary{display:inline-flex}.cart-layout:has(.empty-cart){display:block}.empty-cart{border:1px dashed #e6ded4;border-radius:13px}@media(max-width:760px){.cart-layout{grid-template-columns:1fr}.cart-item{grid-template-columns:65px 1fr auto;gap:10px}.cart-item img{width:65px;height:65px}.quantity{grid-column:2;grid-row:2}.line-total{grid-column:3;grid-row:1}.remove{grid-column:3;grid-row:2;justify-self:end}}
  `]
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  constructor(private foodService: FoodService) {}
  ngOnInit(): void { this.refresh(); }
  refresh(): void { this.items = this.foodService.getCart(); }
  get total(): number { return this.foodService.getTotal(this.items); }
  change(id: number, amount: number): void { this.foodService.updateQuantity(id, amount); this.refresh(); }
  remove(id: number): void { this.foodService.removeFromCart(id); this.refresh(); }
}
