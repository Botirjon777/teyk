"use client";

import Navbar from "@/components/ui/Navbar";
import ProductCard from "@/components/ui/ProductCard";
import Badge from "@/components/ui/Badge";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  const promoProducts = [
    {
      id: 1,
      image: "/cappuccino.png",
      name: "Cappuccino",
      description: "Rich espresso with steamed milk foam",
      price: 4.5,
      rating: 4.8,
    },
    {
      id: 2,
      image: "/latte.png",
      name: "Caffe Latte",
      description: "Smooth espresso with steamed milk",
      price: 5.0,
      rating: 4.7,
    },
  ];

  const popularProducts = [
    {
      id: 3,
      image: "/espresso.png",
      name: "Espresso",
      description: "Strong and bold Italian coffee",
      price: 3.5,
      rating: 4.9,
    },
    {
      id: 4,
      image: "/cappuccino.png",
      name: "Mocha",
      description: "Chocolate and espresso blend",
      price: 5.5,
      rating: 4.6,
    },
    {
      id: 5,
      image: "/latte.png",
      name: "Americano",
      description: "Espresso with hot water",
      price: 3.0,
      rating: 4.5,
    },
    {
      id: 6,
      image: "/espresso.png",
      name: "Macchiato",
      description: "Espresso with a dollop of foam",
      price: 4.0,
      rating: 4.7,
    },
  ];

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
            {promoProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                description={product.description}
                price={product.price}
                rating={product.rating}
              />
            ))}
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
            {popularProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                description={product.description}
                price={product.price}
                rating={product.rating}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
