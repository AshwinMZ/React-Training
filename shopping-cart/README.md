# Shopping Cart – React + Redux Toolkit

A shopping cart built with React, Redux Toolkit, React Bootstrap and Vite.
Browse products, filter by category (bonus), add to cart, change quantities,
remove items, and see live totals. No backend is needed.

## Prerequisites
- Node.js 18 or newer (check with `node -v`)
- npm (comes with Node)

## Install and run
```bash
npm install
npm run dev
```
Open the URL printed in the terminal (usually http://localhost:5173).

Other commands:
```bash
npm run build     # production build into /dist
npm run preview   # serve the production build locally
```

## Project structure
```
src/
├── redux/        cartSlice.js, store.js
├── components/   ProductList, ProductCard, Cart, CartItem
├── data/         products.js (local sample data)
├── App.jsx
└── main.jsx
```

## How Redux Toolkit is used

**`createSlice()`** (`redux/cartSlice.js`) defines the cart's name, initial state
(`items: []`) and five reducers: `addToCart`, `increaseQuantity`,
`decreaseQuantity`, `removeFromCart`, `clearCart`. It auto-generates the action
creators, and lets reducers "mutate" state safely thanks to Immer.
`decreaseQuantity` only acts when quantity is above 1, so it never drops below 1.

**`configureStore()`** (`redux/store.js`) creates the single Redux store and
registers the slice reducer under the `cart` key, so cart data lives at `state.cart`.

**`Provider`** (`main.jsx`) wraps `<App />` and passes the store to every
component below it, so any component can read or update the cart.

**`useSelector()`** reads from the store. `Cart.jsx` selects `state.cart.items`
and derives total items and total price; `App.jsx` selects the item count for
the navbar badge. They re-render automatically when the cart changes.

**`useDispatch()`** returns `dispatch`. `ProductCard` dispatches `addToCart`;
`CartItem` dispatches `increaseQuantity`, `decreaseQuantity` and `removeFromCart`;
`Cart` dispatches `clearCart`.

**Category filter (bonus):** the selected category is local state in
`ProductList` (`useState`), so filtering never touches the cart in Redux.

## Testing checklist
- Add the same product twice → quantity becomes 2, not a duplicate row.
- "−" is disabled at quantity 1.
- Remove and Clear cart work; summary and navbar badge update.
- Switch categories → cart contents stay the same.
- Resize the window → layout stacks on mobile.

## Screenshots
Add your screenshots to a `screenshots/` folder (product listing and cart).
