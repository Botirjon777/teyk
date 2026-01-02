"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import MobileSidebar from "@/components/ui/MobileSidebar";

interface NavbarProps {
    cartItemCount?: number;
}

export default function Navbar({ cartItemCount }: NavbarProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    const totalItems = useCartStore((state) => state.getTotalItems());

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-40 bg-card-background border-b border-border shadow-shadow-sm">
                <div className="flex items-center justify-between px-4 py-3">
                    {/* Left - Menu Button */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 hover:bg-soft-teal rounded-lg transition-colors duration-200 active:scale-95"
                        aria-label="Open menu"
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
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>

                    {/* Center - Location */}
                    <div className="flex items-center gap-1.5">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary-green"
                        >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="text-sm font-medium text-primary-text">
                            Current Location
                        </span>
                    </div>

                    {/* Right - Cart Button */}
                    <button
                        onClick={() => router.push("/cart")}
                        className="relative p-2 hover:bg-soft-teal rounded-lg transition-colors duration-200 active:scale-95"
                        aria-label="View cart"
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
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {totalItems > 9 ? "9+" : totalItems}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            <MobileSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
        </>
    );
}
