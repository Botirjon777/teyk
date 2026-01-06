import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "./cartStore";

export interface PickupInfo {
  customerName: string;
  carPlateNumber: string;
  phoneNumber: string;
  pickupTime?: string;
  keepHot: boolean;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  pickupInfo: PickupInfo;
  shopId: number;
  shopName: string;
  shopAddress: string;
  shopCoordinates: [number, number];
  totalPrice: number;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  createdAt: number;
  estimatedPreparationTime: number; // in minutes
  estimatedPickupTime?: number; // timestamp
}

interface OrderState {
  orders: Order[];
  currentPickupInfo: PickupInfo | null;
  setPickupInfo: (info: PickupInfo) => void;
  placeOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => string;
  getOrderById: (id: string) => Order | undefined;
  clearPickupInfo: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      currentPickupInfo: null,
      setPickupInfo: (info) => set({ currentPickupInfo: info }),
      placeOrder: (orderData) => {
        const orderId = `ORD-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        const newOrder: Order = {
          ...orderData,
          id: orderId,
          createdAt: Date.now(),
          status: "pending",
        };
        set((state) => ({
          orders: [...state.orders, newOrder],
          currentPickupInfo: null,
        }));
        return orderId;
      },
      getOrderById: (id) => {
        const state = get();
        return state.orders.find((order) => order.id === id);
      },
      clearPickupInfo: () => set({ currentPickupInfo: null }),
    }),
    {
      name: "order-storage",
      version: 1,
      skipHydration: true,
    }
  )
);
