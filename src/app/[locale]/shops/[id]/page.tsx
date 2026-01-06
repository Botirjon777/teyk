"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import { getShopById } from "@/data/shops";
import { loadYandexMaps } from "@/lib/ymaps";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoCallOutline,
  IoStarOutline,
  IoArrowBackOutline,
} from "react-icons/io5";

export default function ShopDetailPage() {
  const params = useParams();
  const router = useRouter();
  const shopId = parseInt(params.id as string);
  const shop = getShopById(shopId);

  const [ymapsComponents, setYmapsComponents] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (!shop) {
    return (
      <div className="pt-safe min-h-screen bg-background">
        <Navbar />
        <main
          className="pb-24"
          style={{ paddingTop: "calc(4rem + var(--safe-area-top))" }}
        >
          <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
            <IoLocationOutline className="w-24 h-24 text-secondary-text mb-4" />
            <p className="text-primary-text font-semibold mb-2">
              Shop not found
            </p>
            <button
              onClick={() => router.back()}
              className="text-primary-green hover:underline"
            >
              Go back
            </button>
          </div>
        </main>
      </div>
    );
  }

  const LOCATION = {
    center: shop.coordinates,
    zoom: 15,
  };

  return (
    <div className="pt-safe min-h-screen bg-background">
      <Navbar />
      <main
        className="pb-24"
        style={{ paddingTop: "calc(4rem + var(--safe-area-top))" }}
      >
        {/* Back Button */}
        <section className="px-4 pt-4 pb-2">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-primary-green hover:opacity-80 transition-opacity"
          >
            <IoArrowBackOutline className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
        </section>

        {/* Shop Header */}
        <section className="px-4 pt-4 pb-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-primary-text mb-1">
                {shop.name}
              </h1>
              <p className="text-lg text-secondary-text">{shop.brand}</p>
            </div>
            {shop.rating && (
              <div className="flex items-center gap-1 bg-soft-teal px-3 py-2 rounded-lg">
                <IoStarOutline className="w-5 h-5 text-rating-yellow" />
                <span className="text-lg font-bold text-primary-text">
                  {shop.rating}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Map */}
        <section className="px-4 pb-6">
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

                {/* Shop Marker */}
                <ymapsComponents.YMapMarker
                  coordinates={ymapsComponents.reactify.useDefault(
                    shop.coordinates
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

        {/* Shop Details */}
        <section className="px-4 pb-6">
          <div className="bg-card-background rounded-xl p-4 shadow-shadow-md space-y-4">
            {/* Address */}
            <div className="flex items-start gap-3">
              <div className="bg-soft-teal p-2 rounded-lg shrink-0">
                <IoLocationOutline className="w-5 h-5 text-primary-green" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-secondary-text mb-1">Address</p>
                <p className="text-primary-text font-medium">{shop.address}</p>
                <p className="text-sm text-secondary-text mt-1">
                  {shop.city}, {shop.region}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="bg-soft-teal p-2 rounded-lg shrink-0">
                <IoCallOutline className="w-5 h-5 text-primary-green" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-secondary-text mb-1">Phone</p>
                <a
                  href={`tel:${shop.phone}`}
                  className="text-primary-text font-medium hover:text-primary-green transition-colors"
                >
                  {shop.phone}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3">
              <div className="bg-soft-teal p-2 rounded-lg shrink-0">
                <IoTimeOutline className="w-5 h-5 text-primary-green" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-secondary-text mb-2">
                  Opening Hours
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-primary-text">Weekdays</span>
                    <span className="text-primary-text font-medium">
                      {shop.hours.weekdays}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-text">Weekends</span>
                    <span className="text-primary-text font-medium">
                      {shop.hours.weekends}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Amenities */}
        {shop.amenities.length > 0 && (
          <section className="px-4 pb-8">
            <h2 className="text-lg font-bold text-primary-text mb-3">
              Amenities
            </h2>
            <div className="flex flex-wrap gap-2">
              {shop.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-card-background border border-border text-primary-text rounded-lg shadow-shadow-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
