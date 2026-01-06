"use client";

import { useEffect } from "react";
import { useRouter } from "@/navigation";
import Navbar from "@/components/ui/Navbar";
import { useCartStore } from "@/store/cartStore";
import { getShopById } from "@/data/shops";
import {
  IoArrowBackOutline,
  IoLocationOutline,
  IoTrashOutline,
  IoAddOutline,
  IoRemoveOutline,
} from "react-icons/io5";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    getItemsByShop,
    removeItem,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const itemsByShop = getItemsByShop();
  const shopIds = Object.keys(itemsByShop).map(Number);

  if (items.length === 0) {
    return (
      <div className="pt-safe min-h-screen bg-background">
        <Navbar />
        <main
          className="pb-24"
          style={{ paddingTop: "calc(4rem + var(--safe-area-top))" }}
        >
          <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
            <p className="text-primary-text font-semibold mb-4 text-lg">
              Your cart is empty
            </p>
            <button
              onClick={() => router.push("/")}
              className="text-primary-green hover:underline font-medium"
            >
              Continue shopping
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pt-safe min-h-screen bg-background">
      <Navbar />
      <main
        className="pb-32"
        style={{ paddingTop: "calc(4rem + var(--safe-area-top))" }}
      >
        {/* Header */}
        <section className="px-4 pt-4 pb-2">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-primary-green hover:opacity-80 transition-opacity mb-4"
          >
            <IoArrowBackOutline className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary-text">My Cart</h1>
            <button
              onClick={clearCart}
              className="text-sm text-red hover:underline"
            >
              Clear All
            </button>
          </div>
        </section>

        {/* Items Grouped by Shop */}
        <section className="px-4 pb-6">
          {shopIds.map((shopId) => {
            const shop = getShopById(shopId);
            const shopItems = itemsByShop[shopId];
            const shopTotal = shopItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return (
              <div key={shopId} className="mb-6">
                {/* Shop Header */}
                <div className="flex items-center gap-2 mb-3">
                  <IoLocationOutline className="w-5 h-5 text-primary-green" />
                  <div>
                    <p className="font-bold text-primary-text">{shop?.name}</p>
                    <p className="text-xs text-secondary-text">
                      {shop?.address}
                    </p>
                  </div>
                </div>

                {/* Shop Items */}
                <div className="space-y-3 mb-3">
                  {shopItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-card-background rounded-xl p-4 shadow-shadow-md"
                    >
                      <div className="flex gap-3">
                        {/* Product Image Placeholder */}
                        <div className="w-20 h-20 bg-soft-teal rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">☕</span>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-primary-text mb-1">
                            {item.name}
                          </h3>
                          <p className="text-xs text-secondary-text mb-2">
                            {item.customizations.size} •{" "}
                            {item.customizations.temperature}
                            {item.customizations.extras &&
                              item.customizations.extras.length > 0 &&
                              ` • +${item.customizations.extras.length} extras`}
                          </p>
                          <p className="text-lg font-bold text-primary-green">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end justify-between">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red hover:opacity-80"
                          >
                            <IoTrashOutline className="w-5 h-5" />
                          </button>

                          <div className="flex items-center gap-2 bg-soft-teal rounded-lg px-2 py-1">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center text-primary-green"
                            >
                              <IoRemoveOutline className="w-4 h-4" />
                            </button>
                            <span className="font-semibold text-primary-text min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-6 h-6 flex items-center justify-center text-primary-green"
                            >
                              <IoAddOutline className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shop Subtotal */}
                <div className="bg-soft-teal rounded-lg p-3 flex justify-between items-center">
                  <p className="font-semibold text-primary-text">
                    Subtotal ({shop?.name})
                  </p>
                  <p className="font-bold text-primary-green text-lg">
                    ${shopTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </section>
      </main>

      {/* Fixed Bottom Checkout Bar */}
      <div className="fixed bottom-[72px] left-0 right-0 bg-card-background border-t border-border shadow-shadow-lg p-4 z-40">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-secondary-text">Total</p>
            <p className="text-2xl font-bold text-primary-text">
              ${getTotalPrice().toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => router.push("/checkout")}
            className="bg-primary-green text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity active:scale-[0.98]"
          >
            Checkout
          </button>
        </div>
        <p className="text-xs text-secondary-text text-center">
          {items.length} item{items.length !== 1 ? "s" : ""} from{" "}
          {shopIds.length} shop
          {shopIds.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
