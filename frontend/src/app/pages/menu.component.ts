import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodService } from '../food.service';
import { Food } from '../models';

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [CommonModule, FormsModule],
  template: `
    <section class="page-heading"><span class="eyebrow">MADE FRESH, JUST FOR YOU</span><h1>Find your <em>favourite.</em></h1><p>Big cravings or little treats — there's something for everyone.</p></section>
    <section class="menu-wrap">
      <div class="toolbar"><label class="search">⌕ <input [(ngModel)]="search" placeholder="Search dishes..." aria-label="Search dishes"></label>
        <div class="filters"><button *ngFor="let cat of categories" [class.selected]="category===cat" (click)="category=cat">{{cat}}</button></div>
      </div>
      <p class="result-count">{{ filteredFoods.length }} delicious options</p>
      <div class="food-grid">
        <article class="food-card" *ngFor="let food of filteredFoods">
          <div class="food-photo"><img [src]="food.image" [alt]="food.name" loading="lazy"><span class="category-tag">{{food.category}}</span><span class="heart">♡</span></div>
          <div class="food-info"><div class="food-title"><h2>{{food.name}}</h2><span class="rating">★ 4.8</span></div><p>{{food.description}}</p><div class="food-bottom"><b>₹{{food.price}}</b><button (click)="add(food)">+ Add</button></div></div>
        </article>
      </div>
      <div class="empty" *ngIf="filteredFoods.length===0">No dishes found. Try another search.</div>
      <div class="toast" *ngIf="toast">{{toast}}</div>
    </section>
  `,
  styles: [`
    .page-heading{text-align:center;background:#fbf6ef;padding:54px 20px 45px}.eyebrow{font-size:10px;letter-spacing:2px;font-weight:800;color:#ef5b36}.page-heading h1{font-size:clamp(38px,5vw,57px);letter-spacing:-2.5px;margin:13px 0;color:#242421}.page-heading h1 em{font-family:Georgia,serif;color:#ef5b36;font-weight:500}.page-heading p{color:#817b72;font-size:13px}
    .menu-wrap{max-width:1180px;margin:auto;padding:35px 25px}.toolbar{display:flex;justify-content:space-between;gap:18px;align-items:center;flex-wrap:wrap}.search{display:flex;align-items:center;gap:10px;background:#f7f5f1;border:1px solid #eeeae4;border-radius:8px;padding:0 14px;color:#8c867d;font-size:24px}.search input{width:210px;border:0;outline:0;background:transparent;padding:13px 0;font-size:12px}.filters{display:flex;gap:8px;flex-wrap:wrap}.filters button{background:white;border:1px solid #e8e4de;border-radius:20px;padding:9px 14px;font-size:11px;color:#69655e;cursor:pointer}.filters button.selected{background:#f45b35;color:white;border-color:#f45b35}.result-count{color:#928c83;font-size:11px;margin:28px 0 16px}
    .food-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px}.food-card{border:1px solid #f0ece6;border-radius:13px;overflow:hidden;transition:transform .2s,box-shadow .2s;background:#fff}.food-card:hover{transform:translateY(-4px);box-shadow:0 12px 28px #30241a10}.food-photo{height:185px;position:relative;background:#f5eee5}.food-photo img{width:100%;height:100%;object-fit:cover}.category-tag{position:absolute;left:12px;top:12px;background:#fffdf9eF;border-radius:20px;padding:6px 9px;font-size:9px;font-weight:700}.heart{position:absolute;right:12px;top:12px;background:#fffdf9ed;border-radius:50%;width:28px;height:28px;display:grid;place-items:center;font-size:19px;color:#f45b35}.food-info{padding:15px}.food-title{display:flex;justify-content:space-between;align-items:center;gap:5px}.food-title h2{font-size:15px;margin:0;letter-spacing:-.3px}.rating{font-size:10px;color:#d98c17;white-space:nowrap}.food-info p{color:#8b857c;font-size:11px;line-height:1.6;min-height:35px}.food-bottom{display:flex;justify-content:space-between;align-items:center;margin-top:15px}.food-bottom b{font-size:17px}.food-bottom button{border:0;background:#fff0eb;color:#e95330;border-radius:7px;padding:9px 13px;font-weight:750;cursor:pointer}.food-bottom button:hover{background:#f45b35;color:#fff}.empty{text-align:center;padding:50px;color:#777}.toast{position:fixed;right:25px;bottom:25px;background:#242421;color:white;padding:15px 20px;border-radius:9px;box-shadow:0 10px 30px #0002;z-index:20;font-size:13px}
    @media(max-width:950px){.food-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:650px){.food-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.food-photo{height:145px}.food-info{padding:11px}.food-title{align-items:flex-start;flex-direction:column}.food-info p{min-height:50px}.toolbar{align-items:stretch}.search input{width:100%}}@media(max-width:390px){.food-grid{grid-template-columns:1fr}}
  `]
})
export class MenuComponent implements OnInit {
  foods: Food[] = [];
  search = '';
  category = 'All';
  toast = '';
  private toastTimer?: ReturnType<typeof setTimeout>;
  categories = ['All', 'Biryani', 'Pizza', 'Fast Food', 'South Indian', 'Vegetarian', 'Dessert', 'Drinks'];

  constructor(private foodService: FoodService) {}
  ngOnInit(): void { this.foodService.getFoods().subscribe(foods => this.foods = foods); }
  get filteredFoods(): Food[] {
    const q = this.search.trim().toLowerCase();
    return this.foods.filter(food => (this.category === 'All' || food.category === this.category) &&
      (food.name.toLowerCase().includes(q) || food.category.toLowerCase().includes(q)));
  }
  add(food: Food): void {
    this.foodService.addToCart(food);
    this.toast = `${food.name} added to your cart`;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast = '', 2200);
  }
}
