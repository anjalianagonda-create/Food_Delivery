import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: true }));
app.use(express.json());

const foods = [
  { id: 1, name: 'Hyderabadi Chicken Biryani', category: 'Biryani', restaurant: 'Spice Route', description: 'Aromatic basmati rice with traditional spices.', price: 249, rating: 4.8, time: '30–35 min', veg: false, image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=80', tag: 'Bestseller' },
  { id: 2, name: 'Paneer Butter Masala', category: 'Indian', restaurant: 'Desi Kitchen', description: 'Soft paneer in a rich, creamy tomato gravy.', price: 199, rating: 4.6, time: '25–30 min', veg: true, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80', tag: 'Popular' },
  { id: 3, name: 'Margherita Pizza', category: 'Pizza', restaurant: 'Oven Story', description: 'Classic pizza with mozzarella, basil and tomato.', price: 229, rating: 4.5, time: '20–25 min', veg: true, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80', tag: 'Classic' },
  { id: 4, name: 'Crispy Chicken Burger', category: 'Burgers', restaurant: 'Burger Barn', description: 'Crispy chicken, fresh lettuce and house sauce.', price: 179, rating: 4.4, time: '20–25 min', veg: false, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80', tag: 'Must try' },
  { id: 5, name: 'Masala Dosa', category: 'South Indian', restaurant: 'Madras Tiffins', description: 'Golden dosa with potato masala and chutneys.', price: 119, rating: 4.7, time: '15–20 min', veg: true, image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80', tag: 'Light bite' },
  { id: 6, name: 'Veg Hakka Noodles', category: 'Chinese', restaurant: 'Wok This Way', description: 'Wok-tossed noodles with crunchy vegetables.', price: 159, rating: 4.3, time: '20–25 min', veg: true, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80', tag: 'Popular' },
  { id: 7, name: 'Chocolate Brownie', category: 'Desserts', restaurant: 'Sugar Rush', description: 'Warm chocolate brownie with a fudgy centre.', price: 99, rating: 4.6, time: '15–20 min', veg: true, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80', tag: 'Sweet treat' },
  { id: 8, name: 'Fresh Mango Shake', category: 'Drinks', restaurant: 'Daily Sips', description: 'Creamy mango shake made fresh to order.', price: 109, rating: 4.2, time: '10–15 min', veg: true, image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80', tag: 'Refreshing' }
];
const orders = [];
const users = [];
let nextOrderId = 1001;

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'Foodie Express API' }));
app.get('/api/foods', (req, res) => {
  const q = String(req.query.q || '').toLowerCase();
  const category = String(req.query.category || 'All');
  let result = foods.filter(f => (!q || `${f.name} ${f.category} ${f.restaurant}`.toLowerCase().includes(q)) && (category === 'All' || f.category === category));
  if (req.query.sort === 'price-low') result.sort((a,b) => a.price-b.price);
  if (req.query.sort === 'rating') result.sort((a,b) => b.rating-a.rating);
  res.json(result);
});
app.get('/api/foods/:id', (req, res) => {
  const food = foods.find(f => f.id === Number(req.params.id));
  if (!food) return res.status(404).json({ message: 'Food item not found' });
  res.json(food);
});
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name?.trim() || !email?.trim() || !password || password.length < 4) return res.status(400).json({ message: 'Enter a name, valid email, and password of at least 4 characters.' });
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) return res.status(409).json({ message: 'An account with this email already exists.' });
  const user = { id: users.length + 1, name: name.trim(), email: email.trim(), role: 'customer' };
  users.push({ ...user, password });
  res.status(201).json({ message: 'Account created', user });
});
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  const found = users.find(u => u.email.toLowerCase() === String(email || '').toLowerCase() && u.password === password);
  if (!found) return res.status(401).json({ message: 'Email or password is incorrect. Register first if you are new.' });
  const { password: _password, ...user } = found;
  res.json({ message: 'Signed in', user });
});
app.post('/api/orders', (req, res) => {
  const { customerName, phone, address, items } = req.body || {};
  if (!customerName?.trim() || !phone?.trim() || !address?.trim() || !Array.isArray(items) || !items.length) return res.status(400).json({ message: 'Add delivery details and at least one cart item.' });
  const cleanItems = [];
  for (const item of items) {
    const food = foods.find(f => f.id === Number(item.foodId));
    const quantity = Math.floor(Number(item.quantity));
    if (!food || !Number.isFinite(quantity) || quantity < 1 || quantity > 99) return res.status(400).json({ message: 'One or more cart items are invalid.' });
    cleanItems.push({ foodId: food.id, name: food.name, price: food.price, quantity });
  }
  const subtotal = cleanItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = { id: nextOrderId++, customerName: customerName.trim(), phone: phone.trim(), address: address.trim(), items: cleanItems, subtotal, deliveryFee: subtotal >= 499 ? 0 : 35, total: subtotal + (subtotal >= 499 ? 0 : 35), status: 'Confirmed', createdAt: new Date().toISOString() };
  orders.unshift(order);
  res.status(201).json(order);
});
app.get('/api/orders', (_req, res) => res.json(orders));
app.patch('/api/orders/:id/status', (req, res) => {
  const allowed = ['Pending', 'Confirmed', 'Preparing', 'Out for delivery', 'Delivered', 'Cancelled'];
  const order = orders.find(o => o.id === Number(req.params.id));
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (!allowed.includes(req.body?.status)) return res.status(400).json({ message: 'Invalid order status' });
  order.status = req.body.status;
  res.json(order);
});
app.use((_req, res) => res.status(404).json({ message: 'API route not found' }));
app.use((err, _req, res, _next) => { console.error(err); res.status(500).json({ message: 'Unexpected server error' }); });
app.listen(PORT, () => console.log(`Foodie Express API running at http://localhost:${PORT}`));
