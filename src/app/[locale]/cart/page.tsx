"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export default function CartPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: "Cappuccino",
            price: 4.5,
            quantity: 2,
            image: "/images/coffee-placeholder.jpg",
        },
        {
            id: 2,
            name: "Latte",
            price: 5.0,
            quantity: 1,
            image: "/images/coffee-placeholder.jpg",
        },
    ]);

    const updateQuantity = (id: number, delta: number) => {
        setCartItems((items) =>
            items
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="page-with-nav bg-background">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-card-background border-b border-border shadow-shadow-sm">
                <div className="flex items-center gap-3 px-4 py-3">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-soft-teal rounded-lg transition-colors duration-200"
                        aria-label="Go back"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary-text"
                        >
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-bold text-primary-text">My Cart</h1>
                </div>
            </div>

            {/* Cart Items */}
            <div className="p-4 space-y-3">
                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-secondary-text text-lg mb-4">
                            Your cart is empty
                        </p>
                        <Button onClick={() => router.push("/")}>Start Shopping</Button>
                    </div>
                ) : (
                    cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-card-background rounded-xl p-3 shadow-shadow-sm border border-border"
                        >
                            <div className="flex gap-3">
                                <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-primary-text mb-1">
                                        {item.name}
                                    </h3>
                                    <p className="text-lg font-bold text-primary-green">
                                        ${item.price.toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end justify-between">
                                    <button
                                        onClick={() => updateQuantity(item.id, -item.quantity)}
                                        className="text-red text-sm"
                                    >
                                        Remove
                                    </button>
                                    <div className="flex items-center gap-2 bg-soft-teal/30 rounded-lg px-2 py-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="w-6 h-6 flex items-center justify-center text-primary-green font-bold"
                                        >
                                            -
                                        </button>
                                        <span className="font-semibold text-primary-text min-w-[20px] text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="w-6 h-6 flex items-center justify-center text-primary-green font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Checkout Footer */}
            {cartItems.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-card-background border-t border-border shadow-shadow-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-secondary-text">Total</span>
                        <span className="text-2xl font-bold text-primary-text">
                            ${total.toFixed(2)}
                        </span>
                    </div>
                    <Button className="w-full" size="large">
                        Proceed to Checkout
                    </Button>
                </div>
            )}
        </div>
    );
}
