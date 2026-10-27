# Food Delivery Portal (Angular + Node.js + Express)

A beginner-friendly starter project with:
- Angular frontend
- Node.js + Express REST API
- Sample food menu
- Search/filter by category
- Add to cart, quantity controls, cart total
- Checkout form (demo order submitted to backend memory)

## Requirements
- Node.js 22.22.3+ recommended for current Angular CLI
- npm
- Internet access for `npm install` and Angular CLI install
- MySQL is **not required** for this starter. Orders are stored in backend memory and reset when the server restarts.

## 1. Extract the ZIP
Extract `food-delivery-portal.zip` somewhere like `C:\Users\Anjal\`.

## 2. Install Angular CLI (if `ng` is not recognized)
Open CMD/PowerShell:
```cmd
npm install -g @angular/cli
```

## 3. Install backend dependencies
Open a terminal in the extracted `food-delivery-portal` folder:
```cmd
cd backend
npm install
```

## 4. Install frontend dependencies
Open another terminal in the extracted `food-delivery-portal` folder:
```cmd
cd frontend
npm install
```

## 5. Run backend
Terminal 1:
```cmd
cd backend
npm run dev
```
API: http://localhost:3000
Health check: http://localhost:3000/api/health
Food menu: http://localhost:3000/api/foods

## 6. Run frontend
Terminal 2:
```cmd
cd frontend
npm start
```
Open http://localhost:4200

## Notes
- Run both frontend and backend at the same time.
- Demo checkout does not process real payments.
- This is a learning starter, not production-ready authentication/payment software.
