"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/store/cartStore";
import { useLocationStore } from "@/store/locationStore";
import { getUserLocation } from "@/lib/geolocation";
import MobileSidebar from "@/components/ui/MobileSidebar";
import toast from "react-hot-toast";

interface NavbarProps {
  cartItemCount?: number;
}

export default function Navbar({ cartItemCount }: NavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations("Navbar");
  const totalItems = useCartStore((state) => state.getTotalItems());

  const { location, isLoading, error, setLocation, setLoading, setError } =
    useLocationStore();

  useEffect(() => {
    // Hydrate location from localStorage on mount
    useLocationStore.persist.rehydrate();
  }, []);

  const handleGetLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      const userLocation = await getUserLocation();
      setLocation(userLocation);
      toast.success(t("updateLocation"));
    } catch (err: any) {
      const errorMessage = err.message || t("locationError");
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const getLocationDisplay = () => {
    if (isLoading) {
      return t("detectingLocation");
    }
    if (error) {
      return t("locationError");
    }
    if (location) {
      return location.city || location.address;
    }
    return t("setLocation");
  };

  return (
    <>
      <nav className="fixed top-[60px] left-0 right-0 z-40 bg-card-background border-b border-border shadow-shadow-sm pt-[env(safe-area-inset-top)]">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left - Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-soft-teal rounded-lg transition-colors duration-200 active:scale-95"
            aria-label="Open menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-text"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Center - Location */}
          <button
            onClick={handleGetLocation}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-soft-teal rounded-lg transition-colors duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed max-w-[60%]"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-primary-green border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={error ? "text-red" : "text-primary-green"}
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            )}
            <span className="text-sm font-medium text-primary-text truncate">
              {getLocationDisplay()}
            </span>
          </button>

          {/* Right - Cart Button */}
          <button
            onClick={() => router.push("/cart")}
            className="relative p-2 hover:bg-soft-teal rounded-lg transition-colors duration-200 active:scale-95"
            aria-label="View cart"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-text"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
}
