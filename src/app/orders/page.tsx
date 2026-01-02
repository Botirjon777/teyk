"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import { IoReceiptOutline } from "react-icons/io5";

export default function OrdersPage() {
    const router = useRouter();

    return (
        <div className="page-with-nav bg-background">
            <Navbar />
            <main className="page container">
                <h1 className="text-2xl font-bold text-primary-text mb-6">My Orders</h1>

                <div className="flex flex-col items-center justify-center py-20">
                    <IoReceiptOutline className="w-24 h-24 text-secondary-text mb-4" />
                    <h2 className="text-xl font-semibold text-primary-text mb-2">
                        No orders yet
                    </h2>
                    <p className="text-secondary-text text-center mb-6">
                        Your order history will appear here
                    </p>
                    <button
                        onClick={() => router.push("/")}
                        className="bg-primary-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#006456] transition-colors"
                    >
                        Start Shopping
                    </button>
                </div>
            </main>
        </div>
    );
}
