import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FoodService } from '../food.service';
import { CartItem } from '../models';

@Component({
  standalone: true,
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="page-heading"><span class="eyebrow">ALMOST THERE</span><h1>Let's get it <em>delivered.</em></h1><p>Tell us where to bring your delicious order.</p></section>
    <section class="checkout-layout" *ngIf="items.length; else noItems">
      <form #checkoutForm="ngForm" (ngSubmit)="submit(checkoutForm)">
        <h2>Delivery details</h2>
        <label>Full name<input name="customerName" [(ngModel)]="customerName" required minlength="2" placeholder="Your name"></label>
        <label>Phone number<input name="phone" [(ngModel)]="phone" required pattern="[0-9+() -]{8,18}" placeholder="Your contact number"></label>
        <label>Delivery address<textarea name="address" [(ngModel)]="address" required minlength="8" rows="4" placeholder="House no., street, area, city, PIN code"></textarea></label>
        <p class="form-error" *ngIf="error">{{error}}</p>
        <button class="place-order" type="submit" [disabled]="submitting">{{submitting ? 'Placing order...' : 'Place demo order · ₹' + total}}</button>
        <small>This learning demo does not collect payment details or process real payments.</small>
      </form>
      <aside class="summary"><h2>Your order</h2><div class="summary-item" *ngFor="let item of items"><span>{{item.name}} × {{item.quantity}}</span><b>₹{{item.price*item.quantity}}</b></div><div class="sum-total"><span>Total</span><b>₹{{total}}</b></div><a routerLink="/cart">Edit basket</a></aside>
    </section>
    <ng-template #noItems><div class="empty"><h2>Your basket is empty</h2><a routerLink="/menu">Browse food menu →</a></div></ng-template>
    <section class="success" *ngIf="orderId"><div class="success-icon">✓</div><span class="eyebrow">ORDER CONFIRMED</span><h2>Thanks, {{customerName}}!</h2><p>Your demo order <b>#{{orderId}}</b> has been received.</p><p class="success-total">Order total: ₹{{orderTotal}}</p><a routerLink="/menu" class="place-order">Order something else</a></section>
  `,
  styles: [`
    .page-heading{text-align:center;background:#fbf6ef;padding:48px 20px}.eyebrow{font-size:10px;letter-spacing:2px;font-weight:800;color:#ef5b36}.page-heading h1{font-size:clamp(35px,5vw,48px);letter-spacing:-2px;margin:12px 0}.page-heading em{font-family:Georgia,serif;color:#ef5b36;font-weight:500}.page-heading p{font-size:13px;color:#817b72}.checkout-layout{max-width:1000px;margin:40px auto;padding:0 24px;display:grid;grid-template-columns:1.4fr 1fr;gap:40px;align-items:start}form,.summary{border:1px solid #eee8df;border-radius:13px;padding:28px}form h2,.summary h2{font-size:19px;margin:0 0 24px}form label{display:block;font-size:12px;font-weight:700;margin:18px 0;color:#494640}input,textarea{display:block;width:100%;box-sizing:border-box;margin-top:8px;padding:12px;border:1px solid #e6e0d8;border-radius:7px;font:inherit;font-weight:400;outline-color:#f45b35}textarea{resize:vertical}.place-order{width:100%;border:0;border-radius:8px;background:#f45b35;color:white;padding:15px;font-weight:750;cursor:pointer;text-decoration:none;display:block;text-align:center;box-sizing:border-box}.place-order:disabled{opacity:.6;cursor:wait}form small{display:block;color:#999;font-size:10px;line-height:1.6;margin-top:13px}.form-error{color:#bf2525;font-size:12px}.summary{background:#fbf7f1}.summary-item{display:flex;justify-content:space-between;gap:12px;font-size:12px;color:#77736c;margin:17px 0}.summary-item b{color:#292824;white-space:nowrap}.sum-total{display:flex;justify-content:space-between;border-top:1px solid #e6ded4;padding-top:18px;margin-top:20px;font-weight:800}.sum-total b{font-size:20px}.summary>a{font-size:12px;color:#e95330;text-decoration:none}.empty{text-align:center;padding:60px}.empty a{color:#e95330}.success{max-width:500px;margin:45px auto;text-align:center;padding:35px 20px;border:1px solid #e8eee4;border-radius:15px}.success-icon{width:55px;height:55px;display:grid;place-items:center;background:#e5f5e8;color:#248446;border-radius:50%;font-size:28px;margin:0 auto 20px}.success h2{font-size:27px}.success p{color:#777;font-size:13px}.success-total{font-weight:800;color:#252522!important}.success .place-order{margin-top:25px}@media(max-width:700px){.checkout-layout{grid-template-columns:1fr}form,.summary{padding:20px}}
  `]
})
export class CheckoutComponent implements OnInit {
  items: CartItem[] = [];
  customerName = '';
  phone = '';
  address = '';
  error = '';
  submitting = false;
  orderId: number | null = null;
  orderTotal = 0;

  constructor(private foodService: FoodService, private router: Router) {}
  ngOnInit(): void { this.items = this.foodService.getCart(); }
  get total(): number { return this.foodService.getTotal(this.items); }

  submit(form: { valid: boolean | null }): void {
    if (!form.valid || !this.items.length || this.submitting) return;
    this.submitting = true;
    this.error = '';
    const payload = {
      customerName: this.customerName.trim(),
      phone: this.phone.trim(),
      address: this.address.trim(),
      items: this.items.map(item => ({ foodId: item.id, quantity: item.quantity }))
    };
    this.foodService.placeOrder(payload).subscribe({
      next: (response) => {
        this.orderId = response.order.id;
        this.orderTotal = response.order.total;
        this.foodService.saveCart([]);
        this.items = [];
        this.submitting = false;
      },
      error: () => {
        this.error = 'Could not reach the backend. Please make sure the Express server is running on port 3000.';
        this.submitting = false;
      }
    });
  }
}
