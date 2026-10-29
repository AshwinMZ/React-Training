export const products = [
  { id: 1, name: "Wireless Headphones", price: 2499, category: "Electronics", image: "/images/headphones.svg" },
  { id: 2, name: "Smart Watch", price: 3999, category: "Electronics", image: "/images/smartwatch.svg" },
  { id: 3, name: "Running Shoes", price: 2999, category: "Fashion", image: "/images/shoes.svg" },
  { id: 4, name: "Leather Backpack", price: 1899, category: "Fashion", image: "/images/backpack.svg" },
  { id: 5, name: "Ceramic Coffee Mug", price: 399, category: "Home", image: "/images/mug.svg" },
  { id: 6, name: "Desk Lamp", price: 1299, category: "Home", image: "/images/lamp.svg" },
  { id: 7, name: "Bluetooth Speaker", price: 1799, category: "Electronics", image: "/images/speaker.svg" },
  { id: 8, name: "Sunglasses", price: 899, category: "Fashion", image: "/images/sunglasses.svg" },
];

export const categories = ["All", ...new Set(products.map((p) => p.category))];