import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header class="topbar">
      <a class="brand" routerLink="/"><span class="brand-icon">✦</span> foodie<span class="dot">.</span></a>
      <nav>
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a>
        <a routerLink="/menu" routerLinkActive="active">Menu</a>
        <a routerLink="/cart" routerLinkActive="active">Cart <span class="cart-count">{{ cartCount }}</span></a>
      </nav>
      <a class="nav-cta" routerLink="/menu">Order now <span>↗</span></a>
    </header>
    <main><router-outlet /></main>
    <footer>
      <a class="brand footer-brand" routerLink="/">foodie<span class="dot">.</span></a>
      <p>Good food. Good mood. Delivered to your door.</p>
      <small>Student project demo · No real payments are processed</small>
    </footer>
  `,
  styles: [`
    .topbar{height:76px;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:0 max(5vw,24px);background:#fff;border-bottom:1px solid #f0ede9;position:sticky;top:0;z-index:10}
    .brand{font-size:27px;font-weight:850;letter-spacing:-1.5px;color:#20201e;text-decoration:none}.brand-icon{color:#f45b35;margin-right:7px}.dot{color:#f45b35}
    nav{display:flex;gap:32px}nav a{color:#77756f;text-decoration:none;font-size:14px;font-weight:650}nav a.active,nav a:hover{color:#f45b35}.cart-count{background:#fff0eb;color:#e94f2b;border-radius:20px;padding:2px 7px;margin-left:3px}
    .nav-cta{background:#f45b35;color:#fff;text-decoration:none;padding:12px 18px;border-radius:9px;font-weight:700;font-size:13px}.nav-cta span{margin-left:7px}
    footer{text-align:center;padding:40px 20px 30px;background:#20201e;color:#b9b7b0;margin-top:70px}footer .brand{color:#fff}.footer-brand{font-size:24px}footer p{font-size:14px}footer small{font-size:11px;color:#87857e}
    @media(max-width:600px){.topbar{padding:0 16px;height:66px}.brand{font-size:23px}nav{gap:12px}nav a{font-size:12px}.nav-cta{display:none}}
  `]
})
export class AppComponent {
  get cartCount(): number {
    try {
      const cart = JSON.parse(localStorage.getItem('foodie-cart') || '[]');
      return cart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
    } catch { return 0; }
  }
}
