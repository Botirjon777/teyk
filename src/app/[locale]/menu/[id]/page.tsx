"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import { IoArrowBack, IoLocationOutline } from "react-icons/io5";

// This would normally come from a database or API
const SHOP_DATA: Record<string, any> = {
  "1": {
    id: 1,
    name: "Coffee Take - Amir Temur",
    address: "Amir Temur Avenue 107, Tashkent",
  },
  "2": {
    id: 2,
    name: "Coffee Take - Chilanzar",
    address: "Chilanzar 9, Tashkent",
  },
  // Add more as needed
};

export default function MenuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const shopId = id;
  const shop = SHOP_DATA[shopId];

  if (!shop) {
    return (
      <div className="pt-safe min-h-screen bg-background">
        <Navbar />
        <main className="page-with-nav container">
          <p className="text-center text-secondary-text">Shop not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="pt-safe min-h-screen bg-background">
      <Navbar />
      <main
        className="pb-24"
        style={{ paddingTop: "calc(4rem + var(--safe-area-top))" }}
      >
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-primary-green mb-6 mt-4"
          >
            <IoArrowBack className="w-5 h-5" />
            <span className="font-medium">Back to Map</span>
          </button>

          {/* Shop Info */}
          <div className="bg-card-background rounded-xl p-6 shadow-shadow-md mb-6">
            <div className="flex items-start gap-3">
              <div className="bg-primary-green p-3 rounded-lg">
                <IoLocationOutline className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-text mb-2">
                  {shop.name}
                </h1>
                <p className="text-secondary-text">{shop.address}</p>
              </div>
            </div>
          </div>

          {/* Menu Section - Placeholder */}
          <div className="bg-card-background rounded-xl p-6 shadow-shadow-md">
            <h2 className="text-xl font-bold text-primary-text mb-4">Menu</h2>
            <p className="text-secondary-text text-center py-12">
              Menu coming soon...
              <br />
              <span className="text-sm">
                This page will display the full menu for {shop.name}
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
