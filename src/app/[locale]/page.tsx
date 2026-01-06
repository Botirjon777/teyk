"use client";

import Navbar from "@/components/ui/Navbar";
import ProductCard from "@/components/ui/ProductCard";
import Badge from "@/components/ui/Badge";
import { useTranslations } from "next-intl";
import { PRODUCTS } from "@/data/products";
import { getShopById } from "@/data/shops";

export default function Home() {
  const t = useTranslations("Home");

  // Use actual products from data
  const promoProducts = PRODUCTS.slice(0, 2); // First 2 products for promo
  const popularProducts = PRODUCTS.slice(2); // Rest for popular

  return (
    <div className="pt-safe min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Main Content - Add top padding to account for fixed navbar and safe area */}
      <main
        className="pb-24"
        style={{ paddingTop: "calc(4rem + var(--safe-area-top))" }}
      >
        {/* Promo Banner */}
        <section className="px-4 pt-4 pb-6">
          <div className="relative bg-linear-to-br from-primary-green to-secondary-teal rounded-2xl overflow-hidden shadow-shadow-lg">
            <div className="absolute inset-0 opacity-20">
              <img
                src="/promo-banner.png"
                alt="Promo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative p-6 text-white">
              <Badge variant="yellow" className="mb-3">
                {t("limitedOffer")}
              </Badge>
              <h2 className="text-2xl font-bold mb-2">{t("buy1get1")}</h2>
              <p className="text-sm opacity-90 mb-4">{t("promoSub")}</p>
              <button className="bg-white text-primary-green px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-soft-teal transition-colors duration-200 active:scale-95">
                {t("orderNow")}
              </button>
            </div>
          </div>
        </section>

        {/* Promo Products */}
        <section className="px-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-primary-text">
              {t("promoProducts")}
            </h2>
            <button className="text-sm text-primary-green font-medium">
              {t("seeAll")}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {promoProducts.map((product) => {
              // Get first available shop for this product
              const firstShopId = product.availableShops[0];
              const shop = getShopById(firstShopId);

              return (
                <div key={product.id} className="relative">
                  <ProductCard
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    rating={product.rating}
                  />
                  {shop && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-secondary-text">
                      <span>📍</span>
                      <span>{shop.brand}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Popular Products */}
        <section className="px-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-primary-text">
              {t("popularProducts")}
            </h2>
            <button className="text-sm text-primary-green font-medium">
              {t("seeAll")}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {popularProducts.map((product) => {
              // Get first available shop for this product
              const firstShopId = product.availableShops[0];
              const shop = getShopById(firstShopId);

              return (
                <div key={product.id} className="relative">
                  <ProductCard
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    rating={product.rating}
                  />
                  {shop && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-secondary-text">
                      <span>📍</span>
                      <span>{shop.brand}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
