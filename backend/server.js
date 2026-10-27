const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

const foods = [
  { id: 1, name: "Chicken Biryani", category: "Biryani", price: 220, description: "Fragrant basmati rice with spices.", image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=700" },
  { id: 2, name: "Veg Pizza", category: "Pizza", price: 180, description: "Classic pizza with vegetables and cheese.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700" },
  { id: 3, name: "Classic Burger", category: "Fast Food", price: 120, description: "Juicy burger with lettuce and sauce.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700" },
  { id: 4, name: "Masala Dosa", category: "South Indian", price: 90, description: "Crispy dosa served with chutney.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=700" },
  { id: 5, name: "Paneer Tikka", category: "Vegetarian", price: 160, description: "Spiced paneer grilled until golden.", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=700" },
  { id: 6, name: "Chocolate Cake", category: "Dessert", price: 110, description: "Rich chocolate cake for a sweet finish.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700" },
  { id: 7, name: "French Fries", category: "Fast Food", price: 80, description: "Crispy golden potato fries.", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=700" },
  { id: 8, name: "Fresh Lemonade", category: "Drinks", price: 60, description: "Refreshing lemon drink.", image: "https://images.unsplash.com/photo-1513558161293-cದ್ಯ?auto=format&w=700".replace("cದ್ಯ", "cdy") }
];

// Demo-only in-memory orders; they reset when the server restarts.
const orders = [];
let nextOrderId = 1;

app.get("/", (_req, res) => {
  res.send("Food Delivery Portal API is running. Visit /api/foods");
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "food-delivery-api" });
});

app.get("/api/foods", (_req, res) => {
  res.json(foods);
});

app.get("/api/foods/:id", (req, res) => {
  const food = foods.find((item) => item.id === Number(req.params.id));
  if (!food) return res.status(404).json({ message: "Food not found" });
  res.json(food);
});

app.post("/api/orders", (req, res) => {
  const { customerName, phone, address, items } = req.body || {};
  if (!customerName || !phone || !address || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Please provide name, phone, address, and at least one cart item." });
  }

  const normalizedItems = [];
  for (const item of items) {
    const food = foods.find((f) => f.id === Number(item.foodId));
    const quantity = Number(item.quantity);
    if (!food || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      return res.status(400).json({ message: "One or more cart items are invalid." });
    }
    normalizedItems.push({ foodId: food.id, name: food.name, price: food.price, quantity });
  }

  const total = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = {
    id: nextOrderId++,
    customerName: String(customerName).trim(),
    phone: String(phone).trim(),
    address: String(address).trim(),
    items: normalizedItems,
    total,
    status: "Received",
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  res.status(201).json({ message: "Order placed successfully (demo).", order });
});

app.get("/api/orders", (_req, res) => {
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Food Delivery API running at http://localhost:${PORT}`);
});
