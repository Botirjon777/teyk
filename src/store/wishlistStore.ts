import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    addedAt: number;
}

interface WishlistState {
    items: WishlistItem[];
    addItem: (item: WishlistItem) => void;
    removeItem: (id: string) => void;
    isInWishlist: (id: string) => boolean;
    toggleItem: (item: WishlistItem) => void;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) =>
                set((state) => {
                    const exists = state.items.some((i) => i.id === item.id);
                    if (exists) return state;
                    return { items: [...state.items, { ...item, addedAt: Date.now() }] };
                }),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),
            isInWishlist: (id) => {
                const state = get();
                return state.items.some((item) => item.id === id);
            },
            toggleItem: (item) => {
                const state = get();
                const exists = state.items.some((i) => i.id === item.id);
                if (exists) {
                    set({ items: state.items.filter((i) => i.id !== item.id) });
                } else {
                    set({ items: [...state.items, { ...item, addedAt: Date.now() }] });
                }
            },
            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: 'wishlist-storage',
        }
    )
);
