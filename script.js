const PRODUCTS = {
  'nuit-dorient': {
    id:'nuit-dorient', name:"Nuit d'Orient", category:'Oriental',
    sub:'A journey into the dark soul of the East', price:285,
    notes:{top:'Saffron · Black Pepper · Cardamom',heart:'Oud · Rose de Taif · Incense',base:'Sandalwood · Black Amber · Musk'},
    images:['images/V3.png','images/v1.png','images/V2.png','images/V4.png'],
    description:"Nuit d'Orient opens with saffron and black pepper, descends into aged Hindi oud and Bulgarian rose, and settles into sandalwood and black amber. A declaration.",
    details:'Concentration: Eau de Parfum (22%)<br><br>Volume: 50 ml / 1.7 fl oz<br><br>Origin: Created in Grasse, France with Moroccan oud<br><br>Bottle: Hand-blown artisan glass with 24k gold collar<br><br>Longevity: 12–16 hours on skin<br><br>Sillage: Intense'
  },
  'rose-sauvage': {
    id:'rose-sauvage', name:'Rose Sauvage', category:'Floral',
    sub:'A wild rose blooming at the edge of a Moroccan garden', price:245,
    notes:{top:'Bulgarian Rose · Pink Pepper · Lychee',heart:'Rose de Taif · Jasmine · Iris',base:'White Musk · Patchouli · Cedarwood'},
    images:[' images/3.png ', 'images/3V1.png','images/3V3.png','images/3V4.png'],
    description:'Rose Sauvage captures the fleeting beauty of a rose caught in the wind — wild, untamed, deeply feminine. The heart blooms with Rose de Taif and jasmine, anchored by soft patchouli and white musk.',
    details:'Concentration: Eau de Parfum (20%)<br><br>Volume: 50 ml / 1.7 fl oz<br><br>Origin: Rose absolute sourced from the Valley of Roses, Bulgaria<br><br>Longevity: 10–14 hours on skin<br><br>Sillage: Moderate to Intense'
  },
  'ambre-noir': {
    id:'ambre-noir', name:'Ambre Noir', category:'Woody',
    sub:'Where ancient amber meets the warmth of dark cedar', price:320,
    notes:{top:'Bergamot · Cardamom · Black Tea',heart:'Amber · Labdanum · Vetiver',base:'Dark Cedar · Vanilla Tahiti · Tonka Bean'},
    images:['images/4.png','images/4V1.png','images/4V2.png','images/4V3.png'],
    description:'Ambre Noir begins with a crisp citrus spark before revealing a rich amber heart, warm and resinous, giving way to dark cedar and Tahitian vanilla. A meditation in slow burn luxury.',
    details:'Concentration: Eau de Parfum (23%)<br><br>Volume: 50 ml / 1.7 fl oz<br><br>Origin: Baltic amber resin, Tahitian vanilla extract<br><br>Longevity: 14–18 hours on skin<br><br>Sillage: Very Intense'
  },
  'jardin-secret': {
    id:'jardin-secret', name:'Jardin Secret', category:'Fresh',
    sub:'A hidden garden awakening after morning rain', price:265,
    notes:{top:'Bergamot · Green Leaves · Dew Drop',heart:'Jasmine · Orange Blossom · Neroli',base:'Green Vetiver · Musk · White Moss'},
    images:['images/9.png','images/9V1.png','images/9V2.png','images/9V3.png'],
    description:'Jardin Secret transports you to a private garden at dawn — dew on jasmine petals, cool air, possibility. Light yet complex, this is the olfactory equivalent of a deep breath of pure morning air.',
    details:'Concentration: Eau de Parfum (18%)<br><br>Volume: 50 ml / 1.7 fl oz<br><br>Origin: Neroli from Morocco, jasmine from Grasse<br><br>Longevity: 8–12 hours on skin<br><br>Sillage: Light to Moderate'
  },
  'oud-royal': {
    id:'oud-royal', name:'Oud Royal', category:'Oriental',
    sub:'The king of woods, distilled into liquid gold', price:395,
    notes:{top:'Saffron · Leather · Dark Spices',heart:'Hindi Oud · Resins · Agarwood',base:'Dark Leather · Benzoin · Smoky Musk'},
    images:['images/5.png','images/5V2.png','images/5V1.png','images/5V3.png'],
    description:'Oud Royal is built entirely around the rarest Hindi agarwood, aged over a decade. Rich, smoky, animalistic, unforgettable. This is not a fragrance worn — it is inhabited.',
    details:'Concentration: Extrait de Parfum (28%)<br><br>Volume: 50 ml / 1.7 fl oz<br><br>Origin: Hindi oud aged 12+ years, sourced from Assam<br><br>Longevity: 24+ hours on skin<br><br>Sillage: Exceptional'
  },
  'velours-de-nuit': {
    id:'velours-de-nuit', name:'Velours de Nuit', category:'Woody',
    sub:'A dark velvet for those who wear the night', price:340,
    notes:{top:'Dark Iris · Violet Leaf · Black Pepper',heart:'Smoked Vetiver · Cashmeran · Labdanum',base:'Midnight Musk · Benzoin · Amberwood'},
    images:['images/6.png','images/6V1.png','images/6V2.png','images/6V3.png'],
    description:'Velours de Nuit opens with cold iris, descends into smoked vetiver and cashmeran, then settles into a skin-close veil of midnight musk and benzoin.',
    details:'Concentration: Eau de Parfum (22%)<br><br>Volume: 50 ml / 1.7 fl oz<br><br>Origin: Vetiver from Haiti, iris root from Florence<br><br>Longevity: 12–16 hours on skin<br><br>Sillage: Intense'
  }
};
const PAYPAL_CLIENT_ID = 'Aaho7-e_RA9V4YoRHMWaC9JPMXNhn5pEz4QpSNnbyoklUuPcUxBfZhmpY9eY8oBy5RAUBYNsl_cJlBg-';
let cartItems = JSON.parse(localStorage.getItem('amrani_cart') || '[]');
let paypalLoaded = false;

function loadPayPalSDK(callback) {
  if (window.paypal) { callback(); return; }
  const existing = document.getElementById('paypal-sdk');
  if (existing) { existing.addEventListener('load', callback); return; }
  const s = document.createElement('script');
  s.id = 'paypal-sdk';
  s.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=EUR&intent=capture&components=buttons`;
  s.onload = () => { paypalLoaded = true; callback(); };
  s.onerror = () => {
    document.getElementById('paypal-btn-container').innerHTML =
      '<p style="color:#c04040;font-size:0.75rem;text-align:center;padding:12px 0">PayPal failed to load. Check your network.</p>';
  };
  document.head.appendChild(s);
}

function renderPayPalButton(total) {
  const container = document.getElementById('paypal-btn-container');
  if (!container) return;
  container.innerHTML = '<p style="font-size:0.72rem;color:#9E9B93;text-align:center;padding:14px 0;letter-spacing:0.06em">Loading PayPal…</p>';

  loadPayPalSDK(() => {
    container.innerHTML = '';
    window.paypal.Buttons({
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay', height: 48 },
      createOrder(data, actions) {
        return actions.order.create({
          purchase_units: [{
            description: 'AMRANI PARFUMS — Order',
            amount: {
              currency_code: 'EUR',
              value: total.toFixed(2),
              breakdown: {
                item_total: { currency_code: 'EUR', value: total.toFixed(2) }
              }
            },
            items: cartItems.map(it => ({
              name: it.name,
              unit_amount: { currency_code: 'EUR', value: it.price.toFixed(2) },
              quantity: String(it.qty),
              category: 'PHYSICAL_GOODS'
            }))
          }]
        });
      },
      onApprove(data, actions) {
        return actions.order.capture().then(details => {
          cartItems = [];
          updateCartCount();
          const panel = document.querySelector('.cart-panel');
          if (panel) panel.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:60px 40px;text-align:center;gap:24px;">
              <div style="font-size:3rem;color:#C9A45A;">✦</div>
              <div style="font-family:'Cormorant Garamond',serif;font-size:2rem;color:#F2EDE4;font-weight:300;">Merci, ${details.payer.name.given_name}</div>
              <p style="font-size:0.8rem;color:#9E9B93;line-height:1.8;max-width:320px;">Your order has been confirmed. A confirmation will be sent to <strong style="color:#C9A45A">${details.payer.email_address}</strong>.</p>
              <p style="font-size:0.68rem;color:#525049;letter-spacing:0.08em;">Order ID: ${details.id}</p>
              <button onclick="closeCart()" style="margin-top:16px;padding:14px 36px;background:#C9A45A;color:#080808;font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;border:none;cursor:pointer;">Continue Shopping</button>
            </div>`;
        });
      },
      onCancel() {
        const note = document.getElementById('paypal-cancel-note');
        if (note) { note.style.display = 'block'; setTimeout(() => note.style.display = 'none', 4000); }
      },
      onError(err) {
        console.error('PayPal error:', err);
        const container = document.getElementById('paypal-btn-container');
        if (container) container.innerHTML = '<p style="color:#c04040;font-size:0.75rem;text-align:center;padding:12px 0">Payment error. Please try again.</p>';
      }
    }).render('#paypal-btn-container');
  });
}

function injectCartDrawer() {
  if (document.getElementById('cartDrawer')) return;
  const drawer = document.createElement('div');
  drawer.id = 'cartDrawer';
  drawer.innerHTML = `
    <div class="cart-backdrop" id="cartBackdrop"></div>
    <div class="cart-panel">
      <div class="cart-header">
        <span class="cart-title">Your Bag</span>
        <button class="cart-close" id="cartClose">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="cart-body" id="cartBody"></div>
      <div class="cart-footer" id="cartFooter"></div>
    </div>
  `;
  document.body.appendChild(drawer);

  const style = document.createElement('style');
  style.textContent = `
    #cartDrawer { position:fixed; inset:0; z-index:9000; pointer-events:none; }
    #cartDrawer.open { pointer-events:all; }
    .cart-backdrop { position:absolute; inset:0; background:rgba(0,0,0,0); transition:background 0.4s; }
    #cartDrawer.open .cart-backdrop { background:rgba(0,0,0,0.7); }
    .cart-panel {
      position:absolute; top:0; right:0; bottom:0; width:420px; max-width:100vw;
      background:#0f0f0f; border-left:1px solid rgba(201,164,90,0.18);
      display:flex; flex-direction:column;
      transform:translateX(100%); transition:transform 0.5s cubic-bezier(0.16,1,0.3,1);
    }
    #cartDrawer.open .cart-panel { transform:translateX(0); }
    .cart-header {
      display:flex; align-items:center; justify-content:space-between;
      padding:32px 32px 24px; border-bottom:1px solid #1e1e1e;
    }
    .cart-title { font-family:'Cormorant Garamond',serif; font-size:1.6rem; font-weight:400; color:#F2EDE4; letter-spacing:0.08em; }
    .cart-close { color:#9E9B93; padding:4px; transition:color 0.2s; cursor:pointer; }
    .cart-close:hover { color:#C9A45A; }
    .cart-body { flex:1; overflow-y:auto; padding:24px 32px;  min-height:0; }
    .cart-body::-webkit-scrollbar { width:2px; }
    .cart-body::-webkit-scrollbar-thumb { background:#C9A45A; }
    .cart-empty { text-align:center; padding:60px 0; }
    .cart-empty-icon { font-size:3rem; margin-bottom:16px; opacity:0.3; }
    .cart-empty p { font-size:0.82rem; color:#525049; letter-spacing:0.06em; }
    .cart-empty a { display:inline-block; margin-top:28px; padding:12px 28px; border:1px solid rgba(201,164,90,0.3); font-size:0.65rem; letter-spacing:0.2em; text-transform:uppercase; color:#C9A45A; transition:background 0.3s; text-decoration:none; }
    .cart-empty a:hover { background:rgba(201,164,90,0.1); }
    .cart-item { display:flex; gap:16px; padding:20px 0; border-bottom:1px solid #1a1a1a; animation:fadeUp 0.4s ease; }
    .cart-item-img { width:80px; height:100px; flex-shrink:0; overflow:hidden; }
    .cart-item-img img { width:100%; height:100%; object-fit:cover; }
    .cart-item-info { flex:1; display:flex; flex-direction:column; justify-content:space-between; }
    .cart-item-cat { font-size:0.58rem; letter-spacing:0.25em; text-transform:uppercase; color:#C9A45A; }
    .cart-item-name { font-family:'Cormorant Garamond',serif; font-size:1.15rem; color:#F2EDE4; font-weight:400; margin:4px 0; }
    .cart-item-size { font-size:0.7rem; color:#525049; }
    .cart-item-row { display:flex; align-items:center; justify-content:space-between; }
    .cart-item-price { font-family:'Cormorant Garamond',serif; font-size:1.1rem; color:#C9A45A; }
    .cart-item-qty { display:flex; align-items:center; gap:12px; }
    .cq-btn { color:#9E9B93; font-size:1rem; padding:2px 6px; transition:color 0.2s; cursor:pointer; background:none; border:none; }
    .cq-btn:hover { color:#C9A45A; }
    .cq-val { font-size:0.82rem; color:#F2EDE4; min-width:14px; text-align:center; }
    .cart-item-remove { color:#525049; font-size:0.6rem; letter-spacing:0.12em; text-transform:uppercase; background:none; border:none; cursor:pointer; transition:color 0.2s; padding:0; }
    .cart-item-remove:hover { color:#c04040; }
    .cart-footer { padding:24px 32px 36px; border-top:1px solid #1e1e1e; overflow-y:auto; max-height:60vh; }
    .cart-subtotal { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px; }
    .cart-subtotal-label { font-size:0.65rem; letter-spacing:0.2em; text-transform:uppercase; color:#9E9B93; }
    .cart-subtotal-price { font-family:'Cormorant Garamond',serif; font-size:1.8rem; color:#F2EDE4; }
    .cart-note { font-size:0.68rem; color:#525049; margin-bottom:24px; letter-spacing:0.04em; }
    .cart-checkout-btn { display:none; }
    #paypal-btn-container { margin-bottom:10px; min-height:50px; }
    #paypal-btn-container .paypal-buttons { border-radius:0 !important; }
    .cart-continue { display:block; text-align:center; margin-top:14px; font-size:0.65rem; letter-spacing:0.14em; text-transform:uppercase; color:#525049; text-decoration:none; transition:color 0.3s; cursor:pointer; background:none; border:none; width:100%; }
    .cart-continue:hover { color:#C9A45A; }
  `;
  document.head.appendChild(style);

  document.getElementById('cartBackdrop').addEventListener('click', closeCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
}

function openCart() {
  const drawer = document.getElementById('cartDrawer');
  if (drawer) {
    renderCartItems();
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  if (drawer) {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function renderCartItems() {
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  if (!body || !footer) return;

  if (cartItems.length === 0) {
    body.innerHTML = `<div class="cart-empty">
      <div class="cart-empty-icon">◇</div>
      <p>Your bag is empty</p>
      <a href="collection.html">Explore the Collection</a>
    </div>`;
    footer.innerHTML = '';
    return;
  }

  body.innerHTML = cartItems.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-img"><img src="${item.img}" alt="${item.name}"></div>
      <div class="cart-item-info">
        <div>
          <span class="cart-item-cat">${item.category}</span>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-size">50 ml · Eau de Parfum</div>
        </div>
        <div class="cart-item-row">
          <span class="cart-item-price">€${(item.price * item.qty).toFixed(0)}</span>
          <div class="cart-item-qty">
            <button class="cq-btn" onclick="changeQty(${i}, -1)">−</button>
            <span class="cq-val">${item.qty}</span>
            <button class="cq-btn" onclick="changeQty(${i}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeItem(${i})">Remove</button>
      </div>
    </div>
  `).join('');

  const total = cartItems.reduce((s, it) => s + it.price * it.qty, 0);
  footer.innerHTML = `
    <div class="cart-subtotal">
      <span class="cart-subtotal-label">Subtotal</span>
      <span class="cart-subtotal-price">€${total.toFixed(2)}</span>
    </div>
    <p class="cart-note">Shipping &amp; taxes calculated at checkout.</p>
    <div id="paypal-btn-container"></div>
    <p id="paypal-cancel-note" style="display:none;text-align:center;font-size:0.7rem;color:#9E9B93;margin-top:10px;letter-spacing:0.06em">Payment cancelled — your bag is still saved.</p>
    <button class="cart-continue" onclick="closeCart()">Continue Shopping</button>
  `;
  renderPayPalButton(total);
}

function changeQty(index, delta) {
  cartItems[index].qty = Math.max(1, cartItems[index].qty + delta);
  updateCartCount();
  renderCartItems();
}

function removeItem(index) {
  cartItems.splice(index, 1);
  updateCartCount();
  renderCartItems();
}

function updateCartCount() {
  localStorage.setItem('amrani_cart', JSON.stringify(cartItems)); 
  const total = cartItems.reduce((s, it) => s + it.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.classList.remove('bounce');
    void el.offsetWidth;
    el.classList.add('bounce');
  });
}

window.addToCart = function(btn) {
  const card = btn.closest('.product-card');
  const name = card.querySelector('.product-name').textContent;
  const category = card.querySelector('.product-category').textContent;
  const priceText = card.querySelector('.product-price').textContent;
  const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
  const img = card.querySelector('.product-img').src;

  const existing = cartItems.find(i => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cartItems.push({ name, category, price, img, qty: 1 });
  }

  updateCartCount();
  const original = btn.textContent;
  btn.textContent = 'Added ✓';
  btn.classList.add('added');
  setTimeout(() => {
    btn.textContent = original;
    btn.classList.remove('added');
  }, 2000);
};

window.handleNewsletter = function(e) {
  e.preventDefault();
  const input = e.target.querySelector('.newsletter-input');
  const btn = e.target.querySelector('.newsletter-btn');
  btn.textContent = 'Subscribed ✓';
  btn.style.background = '#5a8a5a';
  input.value = '';
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
  }, 3000);
};

function loadProductPage() {
  if (!document.querySelector('.product-detail')) return;
  const id = new URLSearchParams(window.location.search).get('id') || 'nuit-dorient';
  const p = PRODUCTS[id] || PRODUCTS['nuit-dorient'];
  document.title = p.name + ' — AMRANI PARFUMS';
  document.querySelector('.product-detail-name').textContent = p.name;
  document.querySelector('.product-detail-category').textContent = p.category + ' · Eau de Parfum';
  document.querySelector('.product-detail-sub').textContent = p.sub;
  document.querySelector('.product-detail-price').textContent = '€' + p.price;
  document.getElementById('tab-description').textContent = p.description;
  document.getElementById('tab-details').innerHTML = p.details;
  const noteVals = document.querySelectorAll('.note-value');
  if (noteVals[0]) noteVals[0].textContent = p.notes.top;
  if (noteVals[1]) noteVals[1].textContent = p.notes.heart;
  if (noteVals[2]) noteVals[2].textContent = p.notes.base;
  const mainImg = document.getElementById('mainProductImg');
  if (mainImg) { mainImg.src = p.images[0]; mainImg.alt = p.name; }
  document.querySelectorAll('.thumb img').forEach((img, i) => { if (p.images[i]) img.src = p.images[i]; });
  const related = document.querySelector('.related-grid');
  if (related) {
    const others = Object.values(PRODUCTS).filter(x => x.id !== p.id).slice(0, 4);
    related.innerHTML = others.map((r, i) => `
      <div class="product-card reveal visible" data-delay="${i*80}">
        <div class="product-img-wrap">
          <img src="${r.images[0]}" alt="${r.name}" class="product-img">
          <div class="product-overlay"><a href="product.html?id=${r.id}" class="product-view-btn">View Details</a></div>
        </div>
        <div class="product-info">
          <span class="product-category">${r.category}</span>
          <h3 class="product-name">${r.name}</h3>
          <p class="product-notes">${r.notes.top}</p>
          <div class="product-footer">
            <span class="product-price">€${r.price}</span>
            <button class="add-to-cart" onclick="addToCart(this)">Add to Cart</button>
          </div>
        </div>
      </div>`).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadProductPage();
  injectCartDrawer();
  updateCartCount(); 

  document.querySelectorAll('.nav-cart').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      openCart();
    });
  });

  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  if (cursorDot && cursorRing) {
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .product-card, .thumb, .filter-btn, .size-btn').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    });
  }

  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    if (heroImg.complete) {
      heroImg.classList.add('loaded');
    } else {
      heroImg.addEventListener('load', () => heroImg.classList.add('loaded'));
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));



  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.collection-grid .product-card');
  if (filterBtns.length && productCards.length) {
   filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      const category = card.dataset.category;
      const gender = card.dataset.gender;
      const matchAll = filter === 'all';
      const matchGender = filter === gender || (filter === 'for-her' && gender === 'unisex') || (filter === 'for-him' && gender === 'unisex');
      const matchCategory = category === filter;
      if (matchAll || matchGender || matchCategory) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
  }

  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  if (tabBtns.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById(btn.dataset.tab);
        if (target) target.classList.add('active');
      });
    });
  }

  const thumbs = document.querySelectorAll('.thumb');
  const mainImg = document.querySelector('.product-main-img img');
  if (thumbs.length && mainImg) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const src = thumb.querySelector('img').src;
        mainImg.style.opacity = '0';
        mainImg.style.transform = 'scale(0.97)';
        setTimeout(() => {
          mainImg.src = src;
          mainImg.style.opacity = '1';
          mainImg.style.transform = 'scale(1)';
        }, 200);
      });
    });
    mainImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  }

  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const qtyBtns = document.querySelectorAll('.qty-btn');
  qtyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const valueEl = btn.closest('.qty-selector').querySelector('.qty-value');
      let val = parseInt(valueEl.textContent);
      if (btn.dataset.action === 'inc') val = Math.min(val + 1, 10);
      if (btn.dataset.action === 'dec') val = Math.max(val - 1, 1);
      valueEl.textContent = val;
    });
  });

  const addToBag = document.querySelector('.add-to-bag');
  if (addToBag) {
    addToBag.addEventListener('click', () => {
      const name = document.querySelector('.product-detail-name')?.textContent || 'Fragrance';
      const category = document.querySelector('.product-detail-category')?.textContent || 'Parfum';
      const priceText = document.querySelector('.product-detail-price')?.textContent || '€0';
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
      const img = document.querySelector('.product-main-img img')?.src || '';
      const qty = parseInt(document.querySelector('.qty-value')?.textContent || '1');
      const existing = cartItems.find(i => i.name === name);
      if (existing) existing.qty += qty;
      else cartItems.push({ name, category, price, img, qty });
      updateCartCount();
      const original = addToBag.textContent;
      addToBag.textContent = 'Added to Bag ✓';
      addToBag.style.background = '#5a8a5a';
      setTimeout(() => {
        addToBag.textContent = original;
        addToBag.style.background = '';
      }, 2500);
    });
  }

  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit');
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#5a8a5a';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        contactForm.reset();
      }, 3500);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const heroParallax = document.querySelector('.hero-bg');
  if (heroParallax) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroParallax.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
  }

});
