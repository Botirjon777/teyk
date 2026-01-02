"use client";

import { useRouter } from "next/navigation";
import { useWishlistStore } from "@/store/wishlistStore";
import Navbar from "@/components/ui/Navbar";
import ProductCard from "@/components/ui/ProductCard";
import { IoHeartOutline } from "react-icons/io5";

export default function WishlistPage() {
    const router = useRouter();
    const { items, removeItem } = useWishlistStore();

    if (items.length === 0) {
        return (
            <div className="page-with-nav bg-background">
                <Navbar />
                <main className="page container">
                    <h1 className="text-2xl font-bold text-primary-text mb-6">My Wishlist</h1>

                    <div className="flex flex-col items-center justify-center py-20">
                        <IoHeartOutline className="w-24 h-24 text-secondary-text mb-4" />
                        <h2 className="text-xl font-semibold text-primary-text mb-2">
                            Your wishlist is empty
                        </h2>
                        <p className="text-secondary-text text-center mb-6">
                            Add your favorite coffee drinks to your wishlist
                        </p>
                        <button
                            onClick={() => router.push("/")}
                            className="bg-primary-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#006456] transition-colors"
                        >
                            Browse Products
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="page-with-nav bg-background">
            <Navbar />
            <main className="page container">
                <h1 className="text-2xl font-bold text-primary-text mb-6">
                    My Wishlist ({items.length})
                </h1>

                <div className="grid grid-cols-2 gap-3">
                    {items.map((item) => (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            image={item.image}
                            name={item.name}
                            description={`Rating: ${item.rating}`}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
