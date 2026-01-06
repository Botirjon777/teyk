"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/navigation";
import Navbar from "@/components/ui/Navbar";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { getShopById } from "@/data/shops";
import {
  IoArrowBackOutline,
  IoLocationOutline,
  IoPersonOutline,
  IoCarOutline,
  IoCallOutline,
  IoTimeOutline,
  IoFlameOutline,
} from "react-icons/io5";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getItemsByShop, getTotalPrice } = useCartStore();
  const { setPickupInfo } = useOrderStore();

  const [customerName, setCustomerName] = useState("");
  const [carPlateNumber, setCarPlateNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [keepHot, setKeepHot] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");

  useEffect(() => {
    useCartStore.persist.rehydrate();
    useOrderStore.persist.rehydrate();
  }, []);

  const itemsByShop = getItemsByShop();
  const shopIds = Object.keys(itemsByShop).map(Number);

  // Calculate preparation time based on number of items (5-10 min per item, min 15, max 45)
  const estimatedPrepTime = Math.min(Math.max(items.length * 7, 15), 45);

  const handleProceedToPayment = () => {
    if (!customerName || !phoneNumber) {
      alert("Please fill in all required fields");
      return;
    }

    setPickupInfo({
      customerName,
      carPlateNumber,
      phoneNumber,
      keepHot,
      specialInstructions,
    });

    router.push("/payment");
  };

  if (items.length === 0) {
    return (
      <div className="pt-safe min-h-screen bg-background">
        <Navbar />
        <main
          className="pb-24"
          style={{ paddingTop: "calc(4rem + var(--safe-area-top))" }}
        >
          <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
            <p className="text-primary-text font-semibold mb-4">
              Your cart is empty
            </p>
            <button
              onClick={() => router.push("/")}
              className="text-primary-green hover:underline"
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
          <h1 className="text-2xl font-bold text-primary-text">Checkout</h1>
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

                <div className="space-y-2">
                  {shopItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div className="flex-1">
                        <p className="text-primary-text font-medium">
                          {item.name} x{item.quantity}
                        </p>
                        <p className="text-xs text-secondary-text">
                          {item.customizations.size},{" "}
                          {item.customizations.temperature}
                        </p>
                      </div>
                      <p className="text-primary-text font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-border flex justify-between">
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

        {/* Estimated Prep Time */}
        <section className="px-4 pb-4">
          <div className="bg-soft-teal rounded-xl p-4 flex items-center gap-3">
            <IoTimeOutline className="w-6 h-6 text-primary-green" />
            <div>
              <p className="text-sm text-secondary-text">
                Estimated Preparation Time
              </p>
              <p className="text-lg font-bold text-primary-text">
                {estimatedPrepTime} minutes
              </p>
            </div>
          </div>
        </section>

        {/* Pickup Information */}
        <section className="px-4 pb-6">
          <h2 className="text-lg font-bold text-primary-text mb-3">
            Pickup Information
          </h2>
          <div className="space-y-3">
            {/* Customer Name */}
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                <IoPersonOutline className="inline w-4 h-4 mr-1" />
                Customer Name *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border border-border bg-card-background text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-green"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                <IoCallOutline className="inline w-4 h-4 mr-1" />
                Phone Number *
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+998 XX XXX XX XX"
                className="w-full px-4 py-3 rounded-lg border border-border bg-card-background text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-green"
                required
              />
            </div>

            {/* Car Plate Number */}
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                <IoCarOutline className="inline w-4 h-4 mr-1" />
                Car Plate Number (Optional)
              </label>
              <input
                type="text"
                value={carPlateNumber}
                onChange={(e) => setCarPlateNumber(e.target.value)}
                placeholder="01 A 123 BC"
                className="w-full px-4 py-3 rounded-lg border border-border bg-card-background text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
            </div>

            {/* Keep Hot Option */}
            <div className="bg-card-background rounded-xl p-4 border border-border">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={keepHot}
                  onChange={(e) => setKeepHot(e.target.checked)}
                  className="mt-1 w-5 h-5 text-primary-green rounded focus:ring-2 focus:ring-primary-green"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <IoFlameOutline className="w-5 h-5 text-red" />
                    <p className="font-semibold text-primary-text">
                      Keep Coffee Hot
                    </p>
                  </div>
                  <p className="text-sm text-secondary-text">
                    If you're running late, we'll keep your coffee in a warming
                    station to maintain the perfect temperature
                  </p>
                </div>
              </label>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Special Instructions (Optional)
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Any special requests or notes..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card-background text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
              />
            </div>
          </div>
        </section>

        {/* Proceed Button */}
        <section className="px-4 pb-8">
          <button
            onClick={handleProceedToPayment}
            className="w-full bg-primary-green text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity active:scale-[0.98]"
          >
            Proceed to Payment
          </button>
        </section>
      </main>
    </div>
  );
}
