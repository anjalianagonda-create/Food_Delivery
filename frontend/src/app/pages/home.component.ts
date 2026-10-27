import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="hero-copy">
        <div class="eyebrow"><span></span> YOUR DAILY DOSE OF DELICIOUS</div>
        <h1>Good food.<br><em>Good mood.</em><br>Delivered.</h1>
        <p class="intro">From your favourite comfort food to something new, your next delicious moment is just a few clicks away.</p>
        <div class="actions"><a routerLink="/menu" class="primary">Explore the menu <b>↗</b></a><span class="delivery">◷ &nbsp;Quick & easy ordering</span></div>
        <div class="social-proof"><div class="avatars"><span>☺</span><span>☺</span><span>☺</span></div><div><b>Freshly made, always</b><small>Loved by hungry people everywhere</small></div></div>
      </div>
      <div class="hero-art">
        <div class="art-circle"></div>
        <div class="orange-sticker">MADE WITH<br>♥ & FLAVOUR</div>
        <img class="hero-food" src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000" alt="Freshly baked pizza">
        <div class="floating-card"><span class="star">★</span><div><b>Made fresh</b><small>Just for you</small></div></div>
        <span class="spark spark-one">✳</span><span class="spark spark-two">✦</span>
      </div>
    </section>
    <section class="category-strip">
      <div><span class="cat-icon">🍕</span><b>Pizza</b><small>Cheesy favourites</small></div>
      <div><span class="cat-icon">🍔</span><b>Burgers</b><small>Big, juicy bites</small></div>
      <div><span class="cat-icon">🍛</span><b>Biryani</b><small>Full of flavour</small></div>
      <div><span class="cat-icon">🥗</span><b>Veggie</b><small>Fresh & lovely</small></div>
      <div><span class="cat-icon">🍰</span><b>Desserts</b><small>A little treat</small></div>
    </section>
    <section class="bottom-cta"><div><span class="eyebrow">HUNGRY YET?</span><h2>Your next favourite meal is waiting.</h2></div><a routerLink="/menu" class="primary">Find your food <b>↗</b></a></section>
  `,
  styles: [`
    .hero{min-height:570px;background:#fbf6ef;display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:60px max(7vw,28px) 45px;overflow:hidden}
    .hero-copy{max-width:560px;z-index:1}.eyebrow{font-size:10px;letter-spacing:2px;font-weight:800;color:#ef5b36}.eyebrow span{display:inline-block;width:7px;height:7px;border-radius:50%;background:#ef5b36;margin-right:9px}
    h1{font-size:clamp(50px,6vw,78px);letter-spacing:-4px;line-height:.99;margin:24px 0 22px;color:#252522;font-weight:850}h1 em{color:#ef5b36;font-family:Georgia,serif;font-weight:500}
    .intro{color:#77736d;line-height:1.8;font-size:15px;max-width:425px}.actions{display:flex;align-items:center;gap:22px;margin-top:28px;flex-wrap:wrap}.primary{display:inline-flex;gap:20px;align-items:center;text-decoration:none;background:#f45b35;color:#fff;padding:15px 20px;border-radius:8px;font-size:13px;font-weight:750;box-shadow:0 7px 18px #f45b352b}.delivery{font-size:11px;color:#77736d}
    .social-proof{display:flex;align-items:center;gap:12px;margin-top:42px}.avatars{display:flex}.avatars span{width:30px;height:30px;border-radius:50%;background:#f2d4bd;border:2px solid #fbf6ef;display:grid;place-items:center;margin-left:-5px}.avatars span:first-child{margin-left:0;background:#c7d8c2}.avatars span:last-child{background:#e7c5cf}.social-proof b,.social-proof small{display:block;font-size:11px}.social-proof small{color:#8a857c;margin-top:4px;font-size:10px}
    .hero-art{position:relative;min-height:430px;display:grid;place-items:center}.art-circle{position:absolute;width:min(39vw,430px);height:min(39vw,430px);border-radius:50%;background:#f6d9bd}.hero-food{position:relative;width:min(39vw,420px);height:min(39vw,420px);object-fit:cover;border-radius:50%;border:12px solid #fff;box-shadow:0 24px 55px #5b392126;transform:rotate(5deg)}.orange-sticker{position:absolute;z-index:2;top:38px;right:3%;background:#f45b35;color:white;border-radius:50%;width:94px;height:94px;display:grid;place-content:center;text-align:center;font-size:10px;font-weight:800;line-height:1.6;transform:rotate(12deg)}.floating-card{position:absolute;z-index:2;left:1%;bottom:40px;background:white;border-radius:12px;padding:13px 18px;box-shadow:0 10px 30px #4e382018;display:flex;align-items:center;gap:10px}.star{color:#f4a62a;font-size:22px}.floating-card b,.floating-card small{display:block;font-size:12px}.floating-card small{color:#8a857c;font-size:10px;margin-top:3px}.spark{position:absolute;color:#ef5b36;font-size:34px}.spark-one{top:15%;left:5%}.spark-two{bottom:13%;right:6%}
    .category-strip{display:flex;justify-content:center;gap:clamp(20px,6vw,85px);padding:28px 20px;border-bottom:1px solid #f0ede8;flex-wrap:wrap}.category-strip>div{display:grid;grid-template-columns:auto auto;column-gap:10px;align-items:center}.cat-icon{grid-row:span 2;font-size:29px}.category-strip b{font-size:12px}.category-strip small{font-size:10px;color:#969189;margin-top:4px}
    .bottom-cta{margin:75px auto;max-width:1100px;background:#f9eee2;border-radius:18px;padding:36px 45px;display:flex;justify-content:space-between;align-items:center;gap:20px}.bottom-cta h2{font-size:27px;letter-spacing:-1px;margin:9px 0 0}
    @media(max-width:760px){.hero{grid-template-columns:1fr;padding:45px 24px 20px}.hero-art{min-height:330px;margin-top:20px}.hero-food,.art-circle{width:min(75vw,330px);height:min(75vw,330px)}.bottom-cta{margin:45px 18px;padding:28px;flex-wrap:wrap}.bottom-cta h2{font-size:23px}h1{letter-spacing:-2px}}
  `]
})
export class HomeComponent {}
