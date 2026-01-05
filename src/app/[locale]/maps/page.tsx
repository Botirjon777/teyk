"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/ui/Navbar";
import { useTranslations } from "next-intl";
import { loadYandexMaps } from "@/lib/ymaps";
import { useLocationStore } from "@/store/locationStore";
import { IoLocationOutline, IoNavigateOutline } from "react-icons/io5";

// All Coffee Take locations across Uzbekistan
const ALL_LOCATIONS = [
  // Tashkent
  {
    id: 1,
    name: "Coffee Take - Amir Temur",
    address: "Amir Temur Avenue 107, Tashkent",
    city: "Tashkent",
    region: "Tashkent",
    coordinates: [69.240562, 41.311081],
  },
  {
    id: 2,
    name: "Coffee Take - Chilanzar",
    address: "Chilanzar 9, Tashkent",
    city: "Tashkent",
    region: "Tashkent",
    coordinates: [69.203422, 41.275568],
  },
  {
    id: 3,
    name: "Coffee Take - Yunusabad",
    address: "Yunusabad 4, Tashkent",
    city: "Tashkent",
    region: "Tashkent",
    coordinates: [69.289321, 41.337401],
  },
  {
    id: 4,
    name: "Coffee Take - Mirzo Ulugbek",
    address: "Mirzo Ulugbek District, Tashkent",
    city: "Tashkent",
    region: "Tashkent",
    coordinates: [69.334015, 41.314556],
  },
  // Fergana
  {
    id: 5,
    name: "Coffee Take - Fergana Center",
    address: "Al-Fergani Street 12, Fergana",
    city: "Fergana",
    region: "Fergana",
    coordinates: [71.784569, 40.383333],
  },
  {
    id: 6,
    name: "Coffee Take - Fergana Mall",
    address: "Mustaqillik Avenue 45, Fergana",
    city: "Fergana",
    region: "Fergana",
    coordinates: [71.771234, 40.391234],
  },
  // Namangan
  {
    id: 7,
    name: "Coffee Take - Namangan Plaza",
    address: "Uychi Street 23, Namangan",
    city: "Namangan",
    region: "Namangan",
    coordinates: [71.672559, 40.997614],
  },
  {
    id: 8,
    name: "Coffee Take - Namangan Park",
    address: "Navoi Street 67, Namangan",
    city: "Namangan",
    region: "Namangan",
    coordinates: [71.64321, 41.004567],
  },
  // Samarkand
  {
    id: 9,
    name: "Coffee Take - Registan",
    address: "Registan Square, Samarkand",
    city: "Samarkand",
    region: "Samarkand",
    coordinates: [66.975463, 39.65481],
  },
  {
    id: 10,
    name: "Coffee Take - Samarkand Center",
    address: "Rudaki Avenue 15, Samarkand",
    city: "Samarkand",
    region: "Samarkand",
    coordinates: [66.959876, 39.627123],
  },
  // Bukhara
  {
    id: 11,
    name: "Coffee Take - Bukhara Old City",
    address: "Bahouddin Naqshband Street, Bukhara",
    city: "Bukhara",
    region: "Bukhara",
    coordinates: [64.421234, 39.768234],
  },
  // Andijan
  {
    id: 12,
    name: "Coffee Take - Andijan Center",
    address: "Bobur Avenue 34, Andijan",
    city: "Andijan",
    region: "Andijan",
    coordinates: [72.344376, 40.782778],
  },
];

type LocationWithDistance = (typeof ALL_LOCATIONS)[0] & { distance?: number };

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function MapsPage() {
  const t = useTranslations("Location");
  const [ymapsComponents, setYmapsComponents] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { location: userLocation } = useLocationStore();

  // Filter and sort locations based on user's location
  const nearbyLocations: LocationWithDistance[] = useMemo(() => {
    if (!userLocation) {
      // Show Tashkent locations by default
      return ALL_LOCATIONS.filter((loc) => loc.region === "Tashkent").slice(
        0,
        5
      );
    }

    // Calculate distance for each location
    const locationsWithDistance: LocationWithDistance[] = ALL_LOCATIONS.map(
      (loc) => ({
        ...loc,
        distance: calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          loc.coordinates[1], // latitude
          loc.coordinates[0] // longitude
        ),
      })
    );

    // Sort by distance and take closest 5
    return locationsWithDistance
      .sort((a, b) => (a.distance || 0) - (b.distance || 0))
      .slice(0, 5);
  }, [userLocation]);

  // Calculate map center based on locations
  const mapCenter = useMemo(() => {
    if (userLocation) {
      return [userLocation.longitude, userLocation.latitude];
    }
    if (nearbyLocations.length > 0) {
      return nearbyLocations[0].coordinates;
    }
    return [69.240562, 41.311081]; // Default to Tashkent
  }, [userLocation, nearbyLocations]);

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

  useEffect(() => {
    // Rehydrate location store on mount
    useLocationStore.persist.rehydrate();
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

  const LOCATION = {
    center: mapCenter,
    zoom: userLocation ? 12 : 11,
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
            {userLocation
              ? `Coffee Shops near ${userLocation.city}`
              : "Coffee Shops in Tashkent"}
          </h1>
          <p className="text-secondary-text">
            {nearbyLocations.length} locations nearby
          </p>
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

              {/* User location marker */}
              {userLocation && (
                <YMapMarker
                  coordinates={reactify.useDefault([
                    userLocation.longitude,
                    userLocation.latitude,
                  ])}
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-blue rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                  </div>
                </YMapMarker>
              )}

              {/* Coffee shop markers */}
              {nearbyLocations.map((location) => (
                <YMapMarker
                  key={location.id}
                  coordinates={reactify.useDefault(location.coordinates)}
                >
                  <div className="relative group">
                    <div className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform">
                      <IoLocationOutline className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-lg shadow-lg p-3 min-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <p className="font-semibold text-primary-text text-sm">
                        {location.name}
                      </p>
                      <p className="text-xs text-secondary-text mt-1">
                        {location.address}
                      </p>
                      {location.distance && (
                        <p className="text-xs text-primary-green mt-1 font-medium">
                          {location.distance.toFixed(1)} km away
                        </p>
                      )}
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
            Nearby Locations
          </h2>
          <div className="space-y-3">
            {nearbyLocations.map((location) => (
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
                    {location.distance && (
                      <p className="text-xs text-primary-green mt-2 font-medium">
                        <IoNavigateOutline className="inline w-4 h-4 mr-1" />
                        {location.distance.toFixed(1)} km away
                      </p>
                    )}
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
