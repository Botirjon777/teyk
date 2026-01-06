"use client";

import { useState, useMemo } from "react";
import { useRouter } from "@/navigation";
import Navbar from "@/components/ui/Navbar";
import { useTranslations } from "next-intl";
import { SHOPS, getAllCities, getAllBrands } from "@/data/shops";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoStarOutline,
} from "react-icons/io5";

export default function ShopsPage() {
  const t = useTranslations("BottomNav");
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");

  const cities = ["All", ...getAllCities()];
  const brands = ["All", ...getAllBrands()];

  const filteredShops = useMemo(() => {
    return SHOPS.filter((shop) => {
      const cityMatch = selectedCity === "All" || shop.city === selectedCity;
      const brandMatch =
        selectedBrand === "All" || shop.brand === selectedBrand;
      return cityMatch && brandMatch;
    });
  }, [selectedCity, selectedBrand]);

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
            Coffee Shops
          </h1>
          <p className="text-secondary-text">
            {filteredShops.length} shops available
          </p>
        </section>

        {/* Filters */}
        <section className="px-4 pb-4">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {/* City Filter */}
            <div className="shrink-0">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-card-background text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-green"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className="shrink-0">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-card-background text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-green"
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Shops List */}
        <section className="px-4 pb-8">
          <div className="space-y-4">
            {filteredShops.map((shop) => (
              <div
                key={shop.id}
                onClick={() => router.push(`/shops/${shop.id}`)}
                className="bg-card-background rounded-xl p-4 shadow-shadow-md cursor-pointer hover:shadow-shadow-lg transition-shadow active:scale-[0.98]"
              >
                {/* Shop Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-primary-text mb-1">
                      {shop.name}
                    </h3>
                    <p className="text-sm text-secondary-text">{shop.brand}</p>
                  </div>
                  {shop.rating && (
                    <div className="flex items-center gap-1 bg-soft-teal px-2 py-1 rounded-lg">
                      <IoStarOutline className="w-4 h-4 text-rating-yellow" />
                      <span className="text-sm font-medium text-primary-text">
                        {shop.rating}
                      </span>
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className="flex items-start gap-2 mb-2">
                  <IoLocationOutline className="w-5 h-5 text-primary-green shrink-0 mt-0.5" />
                  <p className="text-sm text-secondary-text">{shop.address}</p>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-2 mb-3">
                  <IoTimeOutline className="w-5 h-5 text-primary-green shrink-0" />
                  <p className="text-sm text-secondary-text">
                    {shop.hours.weekdays}
                  </p>
                </div>

                {/* Amenities */}
                {shop.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {shop.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-soft-teal text-xs text-primary-text rounded-md"
                      >
                        {amenity}
                      </span>
                    ))}
                    {shop.amenities.length > 3 && (
                      <span className="px-2 py-1 text-xs text-secondary-text">
                        +{shop.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredShops.length === 0 && (
            <div className="text-center py-12">
              <IoLocationOutline className="w-16 h-16 text-secondary-text mx-auto mb-4" />
              <p className="text-primary-text font-semibold mb-2">
                No shops found
              </p>
              <p className="text-secondary-text text-sm">
                Try adjusting your filters
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
