"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/navigation";
import Navbar from "@/components/ui/Navbar";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { getShopById } from "@/data/shops";
import {
  IoArrowBackOutline,
  IoWalletOutline,
  IoCardOutline,
  IoLocationOutline,
  IoPersonOutline,
  IoCarOutline,
  IoCallOutline,
} from "react-icons/io5";
import toast from "react-hot-toast";

export default function PaymentPage() {
  const router = useRouter();
  const { items, getItemsByShop, getTotalPrice, clearCart } = useCartStore();
  const { currentPickupInfo, placeOrder } = useOrderStore();
  const [selectedPayment, setSelectedPayment] = useState<"cash" | "card">(
    "cash"
  );
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    useCartStore.persist.rehydrate();
    useOrderStore.persist.rehydrate();
  }, []);

  const itemsByShop = getItemsByShop();
  const shopIds = Object.keys(itemsByShop).map(Number);

  // Redirect if no items or no pickup info
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    } else if (!currentPickupInfo) {
      router.push("/checkout");
    }
  }, [items, currentPickupInfo, router]);

  const handlePlaceOrder = async () => {
    if (!currentPickupInfo) {
      toast.error("Pickup information missing");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Place order for each shop
    const orderIds: string[] = [];
    shopIds.forEach((shopId) => {
      const shop = getShopById(shopId);
      if (!shop) return;

      const shopItems = itemsByShop[shopId];
      const shopTotal = shopItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Calculate prep time (5-10 min per item, min 15, max 45)
      const estimatedPrepTime = Math.min(
        Math.max(shopItems.length * 7, 15),
        45
      );

      const orderId = placeOrder({
        items: shopItems,
        pickupInfo: currentPickupInfo,
        shopId: shop.id,
        shopName: shop.name,
        shopAddress: shop.address,
        shopCoordinates: shop.coordinates,
        totalPrice: shopTotal,
        estimatedPreparationTime: estimatedPrepTime,
      });

      orderIds.push(orderId);
    });

    // Clear cart
    clearCart();

    // Show success message
    toast.success("Order placed successfully!");

    // Redirect to first order confirmation
    if (orderIds.length > 0) {
      router.push(`/orders/${orderIds[0]}`);
    }
  };

  if (!currentPickupInfo || items.length === 0) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="pt-safe min-h-screen bg-background">
      <Navbar />
      <main
        className="pb-24"
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
          <h1 className="text-2xl font-bold text-primary-text">Payment</h1>
        </section>

        {/* Order Summary */}
        <section className="px-4 pb-4">
          <h2 className="text-lg font-bold text-primary-text mb-3">
            Order Summary
          </h2>
          {shopIds.map((shopId) => {
            const shop = getShopById(shopId);
            const shopItems = itemsByShop[shopId];
            const shopTotal = shopItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return (
              <div
                key={shopId}
                className="bg-card-background rounded-xl p-4 shadow-shadow-md mb-3"
              >
                <div className="flex items-start gap-2 mb-3 pb-3 border-b border-border">
                  <IoLocationOutline className="w-5 h-5 text-primary-green mt-0.5" />
                  <div>
                    <p className="font-semibold text-primary-text">
                      {shop?.name}
                    </p>
                    <p className="text-sm text-secondary-text">
                      {shop?.address}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  {shopItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-primary-text">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="text-primary-text font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-border flex justify-between">
                  <p className="font-semibold text-primary-text">Subtotal</p>
                  <p className="font-bold text-primary-green">
                    ${shopTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}

          <div className="bg-primary-green text-white rounded-xl p-4 flex justify-between items-center">
            <p className="text-lg font-bold">Total</p>
            <p className="text-2xl font-bold">${getTotalPrice().toFixed(2)}</p>
          </div>
        </section>

        {/* Pickup Information Review */}
        <section className="px-4 pb-4">
          <h2 className="text-lg font-bold text-primary-text mb-3">
            Pickup Information
          </h2>
          <div className="bg-card-background rounded-xl p-4 shadow-shadow-md space-y-3">
            <div className="flex items-center gap-3">
              <IoPersonOutline className="w-5 h-5 text-primary-green" />
              <div>
                <p className="text-xs text-secondary-text">Name</p>
                <p className="text-primary-text font-medium">
                  {currentPickupInfo.customerName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <IoCallOutline className="w-5 h-5 text-primary-green" />
              <div>
                <p className="text-xs text-secondary-text">Phone</p>
                <p className="text-primary-text font-medium">
                  {currentPickupInfo.phoneNumber}
                </p>
              </div>
            </div>

            {currentPickupInfo.carPlateNumber && (
              <div className="flex items-center gap-3">
                <IoCarOutline className="w-5 h-5 text-primary-green" />
                <div>
                  <p className="text-xs text-secondary-text">Car Plate</p>
                  <p className="text-primary-text font-medium">
                    {currentPickupInfo.carPlateNumber}
                  </p>
                </div>
              </div>
            )}

            {currentPickupInfo.keepHot && (
              <div className="bg-soft-teal rounded-lg p-3">
                <p className="text-sm text-primary-text font-medium">
                  ☕ Keep coffee hot if running late
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Payment Method */}
        <section className="px-4 pb-6">
          <h2 className="text-lg font-bold text-primary-text mb-3">
            Payment Method (Test Mode)
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => setSelectedPayment("cash")}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                selectedPayment === "cash"
                  ? "border-primary-green bg-soft-teal"
                  : "border-border bg-card-background"
              }`}
            >
              <IoWalletOutline className="w-6 h-6 text-primary-green" />
              <div className="text-left flex-1">
                <p className="font-semibold text-primary-text">
                  Cash on Pickup
                </p>
                <p className="text-sm text-secondary-text">
                  Pay when you collect your order
                </p>
              </div>
            </button>

            <button
              onClick={() => setSelectedPayment("card")}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                selectedPayment === "card"
                  ? "border-primary-green bg-soft-teal"
                  : "border-border bg-card-background"
              }`}
            >
              <IoCardOutline className="w-6 h-6 text-primary-green" />
              <div className="text-left flex-1">
                <p className="font-semibold text-primary-text">
                  Card Payment (Test)
                </p>
                <p className="text-sm text-secondary-text">
                  Simulated card payment
                </p>
              </div>
            </button>
          </div>
        </section>

        {/* Place Order Button */}
        <section className="px-4 pb-8">
          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full bg-primary-green text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : "Place Order"}
          </button>
          <p className="text-xs text-secondary-text text-center mt-3">
            By placing this order, you agree to our terms and conditions
          </p>
        </section>
      </main>
    </div>
  );
}
