"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import { useTranslations } from "next-intl";
import { loadYandexMaps } from "@/lib/ymaps";
import { IoLocationOutline } from "react-icons/io5";

export default function MapsPage() {
  const t = useTranslations("Location");
  const [ymapsComponents, setYmapsComponents] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const locations = [
    {
      id: 1,
      name: t("location1Name"),
      address: t("location1Address"),
      coordinates: [69.240562, 41.311081], // [longitude, latitude] for Yandex Maps
    },
    {
      id: 2,
      name: t("location2Name"),
      address: t("location2Address"),
      coordinates: [69.203422, 41.275568],
    },
    {
      id: 3,
      name: t("location3Name"),
      address: t("location3Address"),
      coordinates: [69.289321, 41.337401],
    },
  ];

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

  if (loading) {
    return (
      <div className="pt-safe min-h-screen bg-background">
        <Navbar />
        <main
          className="pb-24"
          style={{ paddingTop: "calc(4rem + var(--safe-area-top))" }}
        >
          <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-secondary-text">Loading map...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !ymapsComponents) {
    return (
      <div className="pt-safe min-h-screen bg-background">
        <Navbar />
        <main
          className="pb-24"
          style={{ paddingTop: "calc(4rem + var(--safe-area-top))" }}
        >
          <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
            <div className="text-center">
              <IoLocationOutline className="w-24 h-24 text-secondary-text mx-auto mb-4" />
              <p className="text-primary-text font-semibold mb-2">
                Map unavailable
              </p>
              <p className="text-secondary-text text-sm">
                Please check your connection and try again
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    reactify,
  } = ymapsComponents;

  // Center of Tashkent
  const LOCATION = {
    center: [69.240562, 41.311081],
    zoom: 11,
  };

  return (
    <div className="pt-safe min-h-screen bg-background">
      <Navbar />

      <main
        className="pb-24"
        style={{ paddingTop: "calc(4rem + var(--safe-area-top))" }}
      >
        {/* Header */}
        <section className="px-4 pt-6 pb-4">
          <h1 className="text-2xl font-bold text-primary-text mb-2">
            {t("title")}
          </h1>
          <p className="text-secondary-text">{t("subtitle")}</p>
        </section>

        {/* Map */}
        <section className="px-4 pb-6">
          <div className="rounded-2xl overflow-hidden shadow-shadow-lg border border-border h-[400px]">
            <YMap
              location={reactify.useDefault(LOCATION)}
              style={{ width: "100%", height: "100%" }}
            >
              <YMapDefaultSchemeLayer />
              <YMapDefaultFeaturesLayer />

              {locations.map((location) => (
                <YMapMarker
                  key={location.id}
                  coordinates={reactify.useDefault(location.coordinates)}
                >
                  <div className="relative group">
                    {/* Custom Marker */}
                    <div className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform">
                      <IoLocationOutline className="w-6 h-6 text-white" />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-lg shadow-lg p-3 min-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <p className="font-semibold text-primary-text text-sm">
                        {location.name}
                      </p>
                      <p className="text-xs text-secondary-text mt-1">
                        {location.address}
                      </p>
                    </div>
                  </div>
                </YMapMarker>
              ))}
            </YMap>
          </div>
        </section>

        {/* Locations List */}
        <section className="px-4 pb-8">
          <h2 className="text-xl font-bold text-primary-text mb-4">
            {t("branches")}
          </h2>
          <div className="space-y-3">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-card-background rounded-xl p-4 shadow-shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-primary-green p-2 rounded-lg shrink-0">
                    <IoLocationOutline className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary-text">
                      {location.name}
                    </h3>
                    <p className="text-sm text-secondary-text mt-1">
                      {location.address}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
