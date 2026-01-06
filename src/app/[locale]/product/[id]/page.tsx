"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { getProductById as getProductData } from "@/data/products";
import { getShopById } from "@/data/shops";
import Button from "@/components/ui/Button";
import {
  IoArrowBack,
  IoHeartOutline,
  IoHeart,
  IoAdd,
  IoRemove,
  IoLocationOutline,
} from "react-icons/io5";
import { BiCoffee } from "react-icons/bi";
import toast from "react-hot-toast";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();
  const productId = parseInt(params.id);
  const productData = getProductData(productId);

  // Fallback product if not found
  const product = productData || {
    id: productId,
    name: "Coffee",
    description: "Delicious coffee",
    price: 4.5,
    image: "/cappuccino.png",
    rating: 4.5,
    category: "Coffee",
    availableShops: [1, 2, 3],
  };

  const addToCart = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleItem } = useWishlistStore();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [sugar, setSugar] = useState<
    "no-sugar" | "less-sugar" | "normal" | "extra-sugar"
  >("normal");
  const [milk, setMilk] = useState<
    "no-milk" | "regular-milk" | "oat-milk" | "almond-milk" | "soy-milk"
  >("regular-milk");
  const [temperature, setTemperature] = useState<"hot" | "iced">("hot");
  const [extras, setExtras] = useState<string[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);

  // Get available shops for this product
  const availableShopIds = product.availableShops || [];
  const availableShops = availableShopIds
    .map((id: number) => getShopById(id))
    .filter(Boolean);

  // Set default shop
  useEffect(() => {
    if (availableShops.length > 0 && !selectedShopId) {
      setSelectedShopId(availableShops[0]!.id);
    }
  }, [availableShops, selectedShopId]);

  const inWishlist = isInWishlist(String(product.id));

  const sizeOptions = [
    { value: "small", label: "Small", price: 0 },
    { value: "medium", label: "Medium", price: 5000 },
    { value: "large", label: "Large", price: 10000 },
  ];

  const sugarOptions = [
    { value: "no-sugar", label: "No Sugar" },
    { value: "less-sugar", label: "Less Sugar" },
    { value: "normal", label: "Normal" },
    { value: "extra-sugar", label: "Extra Sugar" },
  ];

  const milkOptions = [
    { value: "no-milk", label: "No Milk" },
    { value: "regular-milk", label: "Regular Milk" },
    { value: "oat-milk", label: "Oat Milk" },
    { value: "almond-milk", label: "Almond Milk" },
    { value: "soy-milk", label: "Soy Milk" },
  ];

  const temperatureOptions = [
    { value: "hot", label: "Hot" },
    { value: "iced", label: "Iced" },
  ];

  const extrasOptions = [
    { value: "whipped-cream", label: "Whipped Cream", price: 3000 },
    { value: "caramel-drizzle", label: "Caramel Drizzle", price: 2000 },
    { value: "chocolate-syrup", label: "Chocolate Syrup", price: 2000 },
    { value: "extra-shot", label: "Extra Shot", price: 5000 },
  ];

  const calculatePrice = () => {
    let basePrice = product.price;
    const sizePrice = sizeOptions.find((s) => s.value === size)?.price || 0;
    const extrasPrice = extras.reduce((total, extra) => {
      const extraItem = extrasOptions.find((e) => e.value === extra);
      return total + (extraItem?.price || 0);
    }, 0);
    return (basePrice + sizePrice + extrasPrice) * quantity;
  };

  const toggleExtra = (extra: string) => {
    setExtras((prev) =>
      prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]
    );
  };

  const handleAddToCart = () => {
    if (!selectedShopId) {
      toast.error("Please select a shop");
      return;
    }

    const selectedShop = getShopById(selectedShopId);
    if (!selectedShop) {
      toast.error("Shop not found");
      return;
    }

    const cartItem = {
      id: `${product.id}-${selectedShopId}-${Date.now()}`,
      productId: product.id.toString(),
      name: product.name,
      price: calculatePrice() / quantity,
      image: product.image,
      quantity,
      shopId: selectedShopId,
      shopName: selectedShop.name,
      customizations: {
        size,
        sugar,
        milk,
        temperature,
        extras,
      },
    };
    addToCart(cartItem);
    toast.success(`${product.name} added to cart from ${selectedShop.name}!`);
  };

  const handleWishlistToggle = () => {
    toggleItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      rating: product.rating,
      addedAt: Date.now(),
    });
    toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div className="page-with-nav bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card-background border-b border-border shadow-shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-soft-teal rounded-lg transition-colors"
            aria-label="Go back"
          >
            <IoArrowBack className="w-6 h-6 text-primary-text" />
          </button>
          <h1 className="text-lg font-bold text-primary-text">
            Product Details
          </h1>
          <button
            onClick={handleWishlistToggle}
            className="p-2 hover:bg-soft-teal rounded-lg transition-colors"
            aria-label="Toggle wishlist"
          >
            {inWishlist ? (
              <IoHeart className="w-6 h-6 text-red" />
            ) : (
              <IoHeartOutline className="w-6 h-6 text-primary-text" />
            )}
          </button>
        </div>
      </div>

      <div className="page container">
        {/* Product Image */}
        <div className="bg-soft-teal/20 rounded-2xl p-8 mb-6 flex items-center justify-center">
          <BiCoffee className="w-32 h-32 text-primary-green" />
        </div>

        {/* Product Info */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary-text mb-2">
            {product.name}
          </h2>
          <p className="text-secondary-text mb-3">{product.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-secondary-text">
              ⭐ {product.rating}
            </span>
            <span className="text-sm text-secondary-text">•</span>
            <span className="text-sm text-secondary-text">
              {product.category}
            </span>
          </div>
        </div>

        {/* Shop Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-primary-text mb-3 flex items-center gap-2">
            <IoLocationOutline className="w-5 h-5 text-primary-green" />
            Select Shop
          </h3>
          <select
            value={selectedShopId || ""}
            onChange={(e) => setSelectedShopId(parseInt(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border-2 border-border bg-card-background text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-green transition-all"
          >
            {availableShops.map((shop) => (
              <option key={shop!.id} value={shop!.id}>
                {shop!.name} - {shop!.address}
              </option>
            ))}
          </select>
          {selectedShopId && (
            <p className="text-xs text-secondary-text mt-2">
              📍 {availableShops.find((s) => s!.id === selectedShopId)?.city}
            </p>
          )}
        </div>

        {/* Size Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-primary-text mb-3">Size</h3>
          <div className="grid grid-cols-3 gap-3">
            {sizeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSize(option.value as typeof size)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  size === option.value
                    ? "border-primary-green bg-soft-teal text-primary-green font-semibold"
                    : "border-border bg-card-background text-primary-text hover:border-secondary-teal"
                }`}
              >
                <div className="text-sm">{option.label}</div>
                {option.price > 0 && (
                  <div className="text-xs text-secondary-text">
                    +{option.price.toLocaleString()} UZS
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Temperature */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-primary-text mb-3">
            Temperature
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {temperatureOptions.map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  setTemperature(option.value as typeof temperature)
                }
                className={`p-3 rounded-lg border-2 transition-all ${
                  temperature === option.value
                    ? "border-primary-green bg-soft-teal text-primary-green font-semibold"
                    : "border-border bg-card-background text-primary-text hover:border-secondary-teal"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sugar Level */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-primary-text mb-3">
            Sugar Level
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {sugarOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSugar(option.value as typeof sugar)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  sugar === option.value
                    ? "border-primary-green bg-soft-teal text-primary-green font-semibold"
                    : "border-border bg-card-background text-primary-text hover:border-secondary-teal"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Milk Type */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-primary-text mb-3">
            Milk Type
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {milkOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setMilk(option.value as typeof milk)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  milk === option.value
                    ? "border-primary-green bg-soft-teal text-primary-green font-semibold"
                    : "border-border bg-card-background text-primary-text hover:border-secondary-teal"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Extras */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-primary-text mb-3">
            Add Extras
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {extrasOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => toggleExtra(option.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  extras.includes(option.value)
                    ? "border-primary-green bg-soft-teal text-primary-green font-semibold"
                    : "border-border bg-card-background text-primary-text hover:border-secondary-teal"
                }`}
              >
                <div className="text-sm">{option.label}</div>
                <div className="text-xs text-secondary-text">
                  +{option.price.toLocaleString()} UZS
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-primary-text mb-3">
            Quantity
          </h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-3 rounded-lg bg-card-background border-2 border-border hover:border-primary-green transition-colors"
              disabled={quantity <= 1}
            >
              <IoRemove className="w-5 h-5 text-primary-text" />
            </button>
            <span className="text-xl font-bold text-primary-text min-w-12 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-3 rounded-lg bg-card-background border-2 border-border hover:border-primary-green transition-colors"
            >
              <IoAdd className="w-5 h-5 text-primary-text" />
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-[72px] left-0 right-0 bg-card-background border-t border-border shadow-shadow-lg p-4 z-40">
        <div className="container flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-secondary-text">Total Price</p>
            <p className="text-2xl font-bold text-primary-green">
              {calculatePrice().toLocaleString()} UZS
            </p>
          </div>
          <Button
            variant="primary"
            size="large"
            onClick={handleAddToCart}
            className="flex-1 max-w-[200px]"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
