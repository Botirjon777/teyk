import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    customizations: {
        size: 'small' | 'medium' | 'large';
        sugar: 'no-sugar' | 'less-sugar' | 'normal' | 'extra-sugar';
        milk: 'no-milk' | 'regular-milk' | 'oat-milk' | 'almond-milk' | 'soy-milk';
        temperature: 'hot' | 'iced';
        extras?: string[]; // e.g., ['whipped-cream', 'caramel-drizzle']
    };
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) =>
                set((state) => {
                    // Check if item with same customizations exists
                    const existingItemIndex = state.items.findIndex(
                        (i) =>
                            i.productId === item.productId &&
                            JSON.stringify(i.customizations) === JSON.stringify(item.customizations)
                    );

                    if (existingItemIndex > -1) {
                        // Update quantity if exists
                        const newItems = [...state.items];
                        newItems[existingItemIndex].quantity += item.quantity;
                        return { items: newItems };
                    } else {
                        // Add new item
                        return { items: [...state.items, item] };
                    }
                }),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),
            updateQuantity: (id, quantity) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                })),
            clearCart: () => set({ items: [] }),
            getTotalItems: () => {
                const state = get();
                return state.items.reduce((total, item) => total + item.quantity, 0);
            },
            getTotalPrice: () => {
                const state = get();
                return state.items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
