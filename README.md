# Foodie Express — Food Delivery Portal

## Requirements
- Node.js 20 or newer
- npm

## Run the backend
Open a terminal in the `backend` folder:

```cmd
npm install
npm run dev
```

The API runs at `http://localhost:3000`.

## Run the Angular frontend
Open a second terminal in the `frontend` folder:

```cmd
npm install --legacy-peer-deps
npm start
```

Open `http://localhost:4200`.

## Notes
- The frontend connects to `http://localhost:3000/api`.
- The backend uses in-memory demo data; accounts and orders reset when the backend restarts.
- This ZIP fixes the missing quote in the food card's `aria-label` Angular template expression.
