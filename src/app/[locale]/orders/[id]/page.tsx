"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import { useOrderStore } from "@/store/orderStore";
import { useLocationStore } from "@/store/locationStore";
import { loadYandexMaps } from "@/lib/ymaps";
import {
  IoCheckmarkCircleOutline,
  IoLocationOutline,
  IoTimeOutline,
  IoCallOutline,
  IoPersonOutline,
  IoCarOutline,
  IoNavigateOutline,
} from "react-icons/io5";

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const { getOrderById } = useOrderStore();
  const { location: userLocation } = useLocationStore();

  const [ymapsComponents, setYmapsComponents] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const order = getOrderById(orderId);

  useEffect(() => {
    useOrderStore.persist.rehydrate();
    useLocationStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    loadYandexMaps()
      .then((components) => {
        setYmapsComponents(components);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load Yandex Maps:", err);
        setError("Failed to load map");
        setLoading(false);
      });
  }, []);

  if (!order) {
    return (
      <div className="pt-safe min-h-screen bg-background">
        <Navbar />
        <main
          className="pb-24"
          style={{ paddingTop: "calc(4rem + var(--safe-area-top))" }}
        >
          <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
            <p className="text-primary-text font-semibold mb-4">
              Order not found
            </p>
            <button
              onClick={() => router.push("/")}
              className="text-primary-green hover:underline"
            >
              Go to home
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Calculate estimated pickup time
  const estimatedPickupTime = new Date(
    order.createdAt + order.estimatedPreparationTime * 60 * 1000
  );

  // Map center (use user location if available, otherwise shop location)
  const mapCenter = userLocation
    ? [userLocation.longitude, userLocation.latitude]
    : order.shopCoordinates;

  const LOCATION = {
    center: mapCenter,
    zoom: userLocation ? 13 : 15,
  };

  return (
    <div className="pt-safe min-h-screen bg-background">
      <Navbar />
      <main
        className="pb-24"
        style={{ paddingTop: "calc(4rem + var(--safe-area-top))" }}
      >
        {/* Success Header */}
        <section className="px-4 pt-6 pb-4 text-center">
          <IoCheckmarkCircleOutline className="w-20 h-20 text-primary-green mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary-text mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-secondary-text mb-4">
            Your order is being prepared
          </p>
          <div className="inline-block bg-soft-teal px-4 py-2 rounded-lg">
            <p className="text-sm text-secondary-text">Order ID</p>
            <p className="font-mono font-bold text-primary-text">{order.id}</p>
          </div>
        </section>

        {/* Map */}
        <section className="px-4 pb-6">
          <h2 className="text-lg font-bold text-primary-text mb-3">
            Pickup Location
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-shadow-lg border border-border h-[300px]">
            {loading ? (
              <div className="flex items-center justify-center h-full bg-card-background">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-primary-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-secondary-text">Loading map...</p>
                </div>
              </div>
            ) : error || !ymapsComponents ? (
              <div className="flex items-center justify-center h-full bg-card-background">
                <div className="text-center">
                  <IoLocationOutline className="w-16 h-16 text-secondary-text mx-auto mb-4" />
                  <p className="text-primary-text font-semibold mb-2">
                    Map unavailable
                  </p>
                  <p className="text-secondary-text text-sm">
                    Please check your connection
                  </p>
                </div>
              </div>
            ) : (
              <ymapsComponents.YMap
                location={ymapsComponents.reactify.useDefault(LOCATION)}
                style={{ width: "100%", height: "100%" }}
              >
                <ymapsComponents.YMapDefaultSchemeLayer />
                <ymapsComponents.YMapDefaultFeaturesLayer />

                {/* User Location Marker */}
                {userLocation && (
                  <ymapsComponents.YMapMarker
                    coordinates={ymapsComponents.reactify.useDefault([
                      userLocation.longitude,
                      userLocation.latitude,
                    ])}
                  >
                    <div className="w-8 h-8 bg-blue rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                  </ymapsComponents.YMapMarker>
                )}

                {/* Shop Marker */}
                <ymapsComponents.YMapMarker
                  coordinates={ymapsComponents.reactify.useDefault(
                    order.shopCoordinates
                  )}
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <IoLocationOutline className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </ymapsComponents.YMapMarker>
              </ymapsComponents.YMap>
            )}
          </div>
        </section>

        {/* Pickup Time */}
        <section className="px-4 pb-4">
          <div className="bg-primary-green text-white rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <IoTimeOutline className="w-6 h-6" />
              <p className="font-semibold">Estimated Pickup Time</p>
            </div>
            <p className="text-2xl font-bold">
              {estimatedPickupTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-sm opacity-90 mt-1">
              Preparation time: ~{order.estimatedPreparationTime} minutes
            </p>
          </div>
        </section>

        {/* Shop Information */}
        <section className="px-4 pb-4">
          <h2 className="text-lg font-bold text-primary-text mb-3">
            Pickup Location
          </h2>
          <div className="bg-card-background rounded-xl p-4 shadow-shadow-md">
            <div className="flex items-start gap-3 mb-3">
              <IoLocationOutline className="w-5 h-5 text-primary-green mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-primary-text mb-1">
                  {order.shopName}
                </p>
                <p className="text-sm text-secondary-text">
                  {order.shopAddress}
                </p>
              </div>
              <button
                onClick={() =>
                  window.open(
                    `https://yandex.com/maps/?pt=${order.shopCoordinates[0]},${order.shopCoordinates[1]}&z=15`,
                    "_blank"
                  )
                }
                className="text-primary-green hover:opacity-80"
              >
                <IoNavigateOutline className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        {/* Order Details */}
        <section className="px-4 pb-4">
          <h2 className="text-lg font-bold text-primary-text mb-3">
            Order Details
          </h2>
          <div className="bg-card-background rounded-xl p-4 shadow-shadow-md space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <p className="text-primary-text font-medium">
                    {item.name} x{item.quantity}
                  </p>
                  <p className="text-xs text-secondary-text">
                    {item.customizations.size} •{" "}
                    {item.customizations.temperature}
                  </p>
                </div>
                <p className="text-primary-text font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="pt-3 border-t border-border flex justify-between">
              <p className="font-bold text-primary-text">Total</p>
              <p className="font-bold text-primary-green text-lg">
                ${order.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </section>

        {/* Pickup Information */}
        <section className="px-4 pb-6">
          <h2 className="text-lg font-bold text-primary-text mb-3">
            Your Information
          </h2>
          <div className="bg-card-background rounded-xl p-4 shadow-shadow-md space-y-3">
            <div className="flex items-center gap-3">
              <IoPersonOutline className="w-5 h-5 text-primary-green" />
              <div>
                <p className="text-xs text-secondary-text">Name</p>
                <p className="text-primary-text font-medium">
                  {order.pickupInfo.customerName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <IoCallOutline className="w-5 h-5 text-primary-green" />
              <div>
                <p className="text-xs text-secondary-text">Phone</p>
                <p className="text-primary-text font-medium">
                  {order.pickupInfo.phoneNumber}
                </p>
              </div>
            </div>

            {order.pickupInfo.carPlateNumber && (
              <div className="flex items-center gap-3">
                <IoCarOutline className="w-5 h-5 text-primary-green" />
                <div>
                  <p className="text-xs text-secondary-text">Car Plate</p>
                  <p className="text-primary-text font-medium">
                    {order.pickupInfo.carPlateNumber}
                  </p>
                </div>
              </div>
            )}

            {order.pickupInfo.keepHot && (
              <div className="bg-soft-teal rounded-lg p-3">
                <p className="text-sm text-primary-text font-medium">
                  ☕ We'll keep your coffee hot if you're running late
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Action Buttons */}
        <section className="px-4 pb-8">
          <button
            onClick={() => router.push("/")}
            className="w-full bg-primary-green text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity active:scale-[0.98] mb-3"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => router.push("/orders")}
            className="w-full bg-card-background border-2 border-border text-primary-text py-4 rounded-xl font-bold text-lg hover:border-primary-green transition-colors active:scale-[0.98]"
          >
            View All Orders
          </button>
        </section>
      </main>
    </div>
  );
}
