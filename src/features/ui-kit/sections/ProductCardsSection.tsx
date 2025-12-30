"use client";

import ProductCard from "@/components/ui/ProductCard";
import toast from "react-hot-toast";

export default function ProductCardsSection() {
  return (
    <section className="container mb-5 xl:mb-10">
      <h2 className="text-2xl font-semibold text-primary-text mb-2.5 xl:mb-5">
        Product Cards
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 xl:gap-5">
        <ProductCard
          image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
          name="Premium Headphones"
          description="High-quality wireless headphones with noise cancellation"
          price={299.99}
          rating={4.5}
          onAddToCart={() => toast.success("Premium Headphones added to cart!")}
        />
        <ProductCard
          image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
          name="Smart Watch"
          description="Feature-rich smartwatch with health tracking"
          price={199.99}
          rating={4.8}
          onAddToCart={() => toast.success("Smart Watch added to cart!")}
        />
        <ProductCard
          image="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop"
          name="Designer Sunglasses"
          description="Stylish sunglasses with UV protection"
          price={149.99}
          rating={4.2}
          onAddToCart={() =>
            toast.success("Designer Sunglasses added to cart!")
          }
        />
      </div>
    </section>
  );
}
