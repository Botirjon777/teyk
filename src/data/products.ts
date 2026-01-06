import { Shop } from "./shops";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  availableShops: number[]; // Shop IDs where this product is available
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Cappuccino",
    description: "Rich espresso with steamed milk foam",
    price: 4.5,
    image: "/cappuccino.png",
    rating: 4.8,
    category: "Coffee",
    availableShops: [1, 2, 3, 4, 5, 7, 8, 12], // Available at Coffelitto and some Starbucks
  },
  {
    id: 2,
    name: "Caffe Latte",
    description: "Smooth espresso with steamed milk",
    price: 5.0,
    image: "/latte.png",
    rating: 4.7,
    category: "Coffee",
    availableShops: [1, 2, 3, 4, 5, 7, 8, 9, 12, 13],
  },
  {
    id: 3,
    name: "Espresso",
    description: "Strong and bold Italian coffee",
    price: 3.5,
    image: "/espresso.png",
    rating: 4.9,
    category: "Coffee",
    availableShops: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], // Available everywhere
  },
  {
    id: 4,
    name: "Mocha",
    description: "Chocolate and espresso blend",
    price: 5.5,
    image: "/cappuccino.png",
    rating: 4.6,
    category: "Coffee",
    availableShops: [1, 2, 3, 4, 5, 7, 8, 9, 12, 13],
  },
  {
    id: 5,
    name: "Americano",
    description: "Espresso with hot water",
    price: 3.0,
    image: "/latte.png",
    rating: 4.5,
    category: "Coffee",
    availableShops: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  },
  {
    id: 6,
    name: "Macchiato",
    description: "Espresso with a dollop of foam",
    price: 4.0,
    image: "/espresso.png",
    rating: 4.7,
    category: "Coffee",
    availableShops: [1, 2, 3, 4, 5, 7, 8, 9, 12, 13],
  },
];

export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function getProductsByShop(shopId: number): Product[] {
  return PRODUCTS.filter((product) => product.availableShops.includes(shopId));
}

export function getShopsForProduct(productId: number): number[] {
  const product = getProductById(productId);
  return product?.availableShops || [];
}
