"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Navbar from "@/components/ui/Navbar";
import { useTranslations } from "next-intl";
import { loadYandexMaps } from "@/lib/ymaps";
import DGMap from "@/components/ui/DGMap";
import { getCurrentLocation } from "@/lib/geoUtils";
import {
  IoLocationOutline,
  IoNavigateOutline,
  IoCarSportOutline,
  IoWalkOutline,
  IoEllipsisHorizontalOutline,
  IoCloseOutline,
  IoBookmarkOutline,
  IoBookmark,
  IoRestaurantOutline,
  IoStarOutline,
  IoStar,
  IoStarHalfOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
} from "react-icons/io5";
import { useRouter } from "next/navigation";

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
    rating: 4.5,
    reviewCount: 234,
    acceptingOrders: true,
  },
  {
    id: 2,
    name: "Coffee Take - Chilanzar",
    address: "Chilanzar 9, Tashkent",
    city: "Tashkent",
    region: "Tashkent",
    coordinates: [69.203422, 41.275568],
    rating: 4.8,
    reviewCount: 189,
    acceptingOrders: true,
  },
  {
    id: 3,
    name: "Coffee Take - Yunusabad",
    address: "Yunusabad 4, Tashkent",
    city: "Tashkent",
    region: "Tashkent",
    coordinates: [69.289321, 41.337401],
    rating: 4.3,
    reviewCount: 156,
    acceptingOrders: false,
  },
  {
    id: 4,
    name: "Coffee Take - Mirzo Ulugbek",
    address: "Mirzo Ulugbek District, Tashkent",
    city: "Tashkent",
    region: "Tashkent",
    coordinates: [69.334015, 41.314556],
    rating: 4.6,
    reviewCount: 298,
    acceptingOrders: true,
  },
  // Fergana
  {
    id: 5,
    name: "Coffee Take - Fergana Center",
    address: "Al-Fergani Street 12, Fergana",
    city: "Fergana",
    region: "Fergana",
    coordinates: [71.784569, 40.383333],
    rating: 4.4,
    reviewCount: 112,
    acceptingOrders: true,
  },
  {
    id: 6,
    name: "Coffee Take - Fergana Mall",
    address: "Mustaqillik Avenue 45, Fergana",
    city: "Fergana",
    region: "Fergana",
    coordinates: [71.771234, 40.391234],
    rating: 4.7,
    reviewCount: 145,
    acceptingOrders: true,
  },
  // Namangan
  {
    id: 7,
    name: "Coffee Take - Namangan Plaza",
    address: "Uychi Street 23, Namangan",
    city: "Namangan",
    region: "Namangan",
    coordinates: [71.672559, 40.997614],
    rating: 4.2,
    reviewCount: 87,
    acceptingOrders: false,
  },
  {
    id: 8,
    name: "Coffee Take - Namangan Park",
    address: "Navoi Street 67, Namangan",
    city: "Namangan",
    region: "Namangan",
    coordinates: [71.64321, 41.004567],
    rating: 4.5,
    reviewCount: 103,
    acceptingOrders: true,
  },
  // Samarkand
  {
    id: 9,
    name: "Coffee Take - Registan",
    address: "Registan Square, Samarkand",
    city: "Samarkand",
    region: "Samarkand",
    coordinates: [66.975463, 39.65481],
    rating: 4.9,
    reviewCount: 412,
    acceptingOrders: true,
  },
  {
    id: 10,
    name: "Coffee Take - Samarkand Center",
    address: "Rudaki Avenue 15, Samarkand",
    city: "Samarkand",
    region: "Samarkand",
    coordinates: [66.959876, 39.627123],
    rating: 4.6,
    reviewCount: 267,
    acceptingOrders: true,
  },
  // Bukhara
  {
    id: 11,
    name: "Coffee Take - Bukhara Old City",
    address: "Bahouddin Naqshband Street, Bukhara",
    city: "Bukhara",
    region: "Bukhara",
    coordinates: [64.421234, 39.768234],
    rating: 4.8,
    reviewCount: 334,
    acceptingOrders: true,
  },
  // Andijan
  {
    id: 12,
    name: "Coffee Take - Andijan Center",
    address: "Bobur Avenue 34, Andijan",
    city: "Andijan",
    region: "Andijan",
    coordinates: [72.344376, 40.782778],
    rating: 4.4,
    reviewCount: 178,
    acceptingOrders: true,
  },
];

type LocationType = (typeof ALL_LOCATIONS)[0];

// Sample photos for the gallery
const SAMPLE_PHOTOS = [
  "/cappuccino.png",
  "/latte.png",
  "/espresso.png",
  "/promo-banner.png",
];

// Sample reviews
const SAMPLE_REVIEWS = [
  {
    id: 1,
    author: "Aziz Karimov",
    rating: 5,
    date: "2 days ago",
    text: "Amazing coffee! The atmosphere is cozy and the staff is very friendly. Highly recommend the cappuccino!",
    categories: ["Coffee", "Service", "Atmosphere"],
  },
  {
    id: 2,
    author: "Dilnoza Rashidova",
    rating: 4,
    date: "1 week ago",
    text: "Great place for a quick coffee break. The latte was perfect. Only downside is limited seating during peak hours.",
    categories: ["Coffee", "Location"],
  },
  {
    id: 3,
    author: "Sardor Alimov",
    rating: 5,
    date: "2 weeks ago",
    text: "Best coffee in town! Love their espresso. The baristas really know what they're doing.",
    categories: ["Coffee", "Quality"],
  },
];

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

// Calculate travel time
function calculateTravelTime(distanceKm: number) {
  const WALKING_SPEED = 5; // km/h
  const DRIVING_SPEED = 30; // km/h (city traffic)

  return {
    walking: Math.round((distanceKm / WALKING_SPEED) * 60), // minutes
    driving: Math.round((distanceKm / DRIVING_SPEED) * 60), // minutes
  };
}

// Render stars component
function RatingStars({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<IoStar key={i} className="w-4 h-4 text-rating-yellow" />);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(
        <IoStarHalfOutline key={i} className="w-4 h-4 text-rating-yellow" />
      );
    } else {
      stars.push(
        <IoStarOutline key={i} className="w-4 h-4 text-rating-yellow" />
      );
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

export default function MapsPage() {
  const t = useTranslations("Location");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [selectedShop, setSelectedShop] = useState<LocationType | null>(null);
  const [mapLocation, setMapLocation] = useState<{
    center: [number, number];
    zoom: number;
    duration?: number;
  }>({
    center: [69.240562, 41.311081] as [number, number],
    zoom: 11,
  });
  const [bookmarkedShops, setBookmarkedShops] = useState<number[]>([]);
  const [sheetHeight, setSheetHeight] = useState<
    "collapsed" | "partial" | "expanded"
  >("partial");
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Get user's current location
  useEffect(() => {
    getCurrentLocation()
      .then((position) => {
        const coords: [number, number] = [
          position.coords.longitude,
          position.coords.latitude,
        ];
        setUserLocation(coords);
        setMapLocation({ center: coords, zoom: 12 });
      })
      .catch((err) => {
        console.error("Failed to get user location:", err);
        // Continue with default location (Tashkent)
      });

    // Watch for location changes
    const watchId = navigator.geolocation?.watchPosition(
      (position) => {
        const coords: [number, number] = [
          position.coords.longitude,
          position.coords.latitude,
        ];
        setUserLocation(coords);
      },
      (error) => {
        console.error("Location watch error:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
      }
    );

    return () => {
      if (watchId) navigator.geolocation?.clearWatch(watchId);
    };
  }, []);

  // 2gis loads via script tag, no need for loading state

  // Handle shop click - zoom to street level
  const handleShopClick = (shop: LocationType) => {
    setSelectedShop(shop);
    setSheetHeight("partial");
    // Update map location with animation
    setMapLocation({
      center: shop.coordinates as [number, number],
      zoom: 17, // Close street level zoom
      duration: 500, // Smooth animation
    });
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedShop(null);
    setSheetHeight("collapsed");
    // Zoom back out
    if (userLocation) {
      setMapLocation({ center: userLocation, zoom: 12 });
    } else {
      setMapLocation({ center: [69.240562, 41.311081], zoom: 11 });
    }
  };

  // Toggle bookmark
  const toggleBookmark = (shopId: number) => {
    setBookmarkedShops((prev) =>
      prev.includes(shopId)
        ? prev.filter((id) => id !== shopId)
        : [...prev, shopId]
    );
  };

  // Handle drag start
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setDragStartY(clientY);
  };

  // Handle drag move
  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (dragStartY === null) return;

    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - dragStartY;

    // Determine new height based on drag direction
    if (deltaY < -100 && sheetHeight !== "expanded") {
      setSheetHeight("expanded");
    } else if (deltaY > 100 && sheetHeight !== "collapsed") {
      setSheetHeight(sheetHeight === "expanded" ? "partial" : "collapsed");
    }
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDragStartY(null);
  };

  // Navigate to menu page
  const handleMenuClick = () => {
    if (selectedShop) {
      router.push(`/en/menu/${selectedShop.id}`);
    }
  };

  // Calculate route info
  const routeInfo = useMemo(() => {
    if (!selectedShop || !userLocation) return null;

    const distance = calculateDistance(
      userLocation[1], // lat
      userLocation[0], // lng
      selectedShop.coordinates[1],
      selectedShop.coordinates[0]
    );

    const time = calculateTravelTime(distance);

    return {
      distance,
      ...time,
    };
  }, [selectedShop, userLocation]);

  // Get sheet height class
  const getSheetHeightClass = () => {
    switch (sheetHeight) {
      case "collapsed":
        return "h-[10vh]";
      case "partial":
        return "h-[50vh]";
      case "expanded":
        return "h-[90vh]";
      default:
        return "h-[50vh]";
    }
  };

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

  return (
    <div className="pt-safe min-h-screen bg-background">
      <Navbar />

      <main
        className="pb-24 relative"
        style={{ paddingTop: "calc(4rem + var(--safe-area-top))" }}
      >
        {/* Map - Adjusts height based on bottom sheet */}
        <section
          className={`transition-all duration-300 ${
            selectedShop
              ? sheetHeight === "expanded"
                ? "h-[10vh]"
                : sheetHeight === "partial"
                ? "h-[50vh]"
                : "h-[90vh]"
              : "h-[calc(100vh-4rem-var(--safe-area-top)-6rem)]"
          }`}
        >
          <DGMap
            center={mapLocation.center}
            zoom={mapLocation.zoom}
            markers={[
              ...(userLocation
                ? [
                    {
                      coordinates: userLocation,
                      isUserLocation: true,
                    },
                  ]
                : []),
              ...ALL_LOCATIONS.map((loc) => ({
                coordinates: loc.coordinates as [number, number],
                onClick: () => handleShopClick(loc),
                isSelected: selectedShop?.id === loc.id,
              })),
            ]}
          />
          {/* Yandex Maps preserved but unused */}
          {/* 
          <YMap
            key={`${mapLocation.center[0]}-${mapLocation.center[1]}-${mapLocation.zoom}`}
            location={reactify.useDefault(mapLocation)}
            style={{ width: "100%", height: "100%" }}
          >
            <YMapDefaultSchemeLayer />
            <YMapDefaultFeaturesLayer />

            {userLocation && (
              <YMapMarker coordinates={reactify.useDefault(userLocation)}>
                <div className="relative">
                  <div className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    <div className="absolute inset-0 bg-primary-green rounded-full opacity-30 animate-ping"></div>
                  </div>
                  <div className="relative w-6 h-6 bg-primary-green rounded-full flex items-center justify-center shadow-lg border-3 border-white -translate-x-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </YMapMarker>
            )}

            {ALL_LOCATIONS.map((location) => (
              <YMapMarker
                key={location.id}
                coordinates={reactify.useDefault(location.coordinates)}
              >
                <div
                  className="relative group cursor-pointer"
                  onClick={() => handleShopClick(location)}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all ${selectedShop?.id === location.id
                      ? "bg-rating-yellow scale-125"
                      : "bg-primary-green hover:scale-110"
                      }`}
                  >
                    <IoLocationOutline className="w-6 h-6 text-white" />
                  </div>

                  {selectedShop?.id !== location.id && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-lg shadow-lg p-3 min-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <p className="font-semibold text-primary-text text-sm">
                        {location.name}
                      </p>
                      <p className="text-xs text-secondary-text mt-1">
                        {location.address}
                      </p>
                    </div>
                  )}
                </div>
              </YMapMarker>
            ))}
          </YMap>
          */}
        </section>

        {/* Bottom Sheet Modal - Google Maps Style */}
        {selectedShop && (
          <div
            ref={sheetRef}
            className={`fixed bottom-0 left-0 right-0 bg-card-background rounded-t-3xl shadow-shadow-lg z-50 transition-all duration-300 overflow-hidden ${getSheetHeightClass()}`}
          >
            {/* Drag Handle */}
            <div
              className="w-full py-3 flex justify-center cursor-grab active:cursor-grabbing"
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
            >
              <div className="w-12 h-1.5 bg-border rounded-full"></div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto h-[calc(100%-3rem)] pb-safe">
              <div className="px-4">
                {/* Header with Name, Stars, and Actions */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-primary-text mb-2">
                      {selectedShop.name}
                    </h2>
                    <div className="flex items-center gap-2 mb-1">
                      <RatingStars rating={selectedShop.rating} />
                      <span className="text-sm text-primary-text font-medium">
                        {selectedShop.rating}
                      </span>
                      <span className="text-sm text-secondary-text">
                        ({selectedShop.reviewCount} reviews)
                      </span>
                    </div>
                    <p className="text-sm text-secondary-text">
                      {selectedShop.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => toggleBookmark(selectedShop.id)}
                      className="p-2 hover:bg-background rounded-lg transition-colors"
                    >
                      {bookmarkedShops.includes(selectedShop.id) ? (
                        <IoBookmark className="w-6 h-6 text-primary-green" />
                      ) : (
                        <IoBookmarkOutline className="w-6 h-6 text-secondary-text" />
                      )}
                    </button>
                    <button
                      onClick={handleCloseModal}
                      className="p-2 hover:bg-background rounded-lg transition-colors"
                    >
                      <IoCloseOutline className="w-6 h-6 text-secondary-text" />
                    </button>
                  </div>
                </div>

                {/* Horizontal Scrolling Options */}
                <div className="overflow-x-auto pb-4 -mx-4 px-4 mb-6">
                  <div className="flex gap-3 min-w-max">
                    {/* Menu Option - Different Color */}
                    <button
                      onClick={handleMenuClick}
                      className="flex flex-col items-center justify-center bg-primary-green text-white rounded-xl p-4 min-w-[100px] hover:bg-[#006456] transition-colors"
                    >
                      <IoRestaurantOutline className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">Menu</span>
                    </button>

                    {/* Car Option */}
                    {routeInfo && (
                      <div className="flex flex-col items-center justify-center bg-background rounded-xl p-4 min-w-[100px]">
                        <IoCarSportOutline className="w-6 h-6 text-primary-green mb-2" />
                        <span className="text-xs font-semibold text-primary-text">
                          {routeInfo.distance.toFixed(1)} km
                        </span>
                        <span className="text-xs text-secondary-text">
                          {routeInfo.driving} min
                        </span>
                      </div>
                    )}

                    {/* Walking Option */}
                    {routeInfo && (
                      <div className="flex flex-col items-center justify-center bg-background rounded-xl p-4 min-w-[100px]">
                        <IoWalkOutline className="w-6 h-6 text-primary-green mb-2" />
                        <span className="text-xs font-semibold text-primary-text">
                          {routeInfo.distance.toFixed(1)} km
                        </span>
                        <span className="text-xs text-secondary-text">
                          {routeInfo.walking} min
                        </span>
                      </div>
                    )}

                    {/* Takeaway Status */}
                    <div className="flex flex-col items-center justify-center bg-background rounded-xl p-4 min-w-[100px]">
                      {selectedShop.acceptingOrders ? (
                        <>
                          <IoCheckmarkCircle className="w-6 h-6 text-primary-green mb-2" />
                          <span className="text-xs font-medium text-primary-text text-center">
                            Accepting Orders
                          </span>
                        </>
                      ) : (
                        <>
                          <IoCloseCircle className="w-6 h-6 text-red mb-2" />
                          <span className="text-xs font-medium text-red text-center">
                            Not Available
                          </span>
                        </>
                      )}
                    </div>

                    {/* Reviews Option */}
                    <button className="flex flex-col items-center justify-center bg-background rounded-xl p-4 min-w-[100px] opacity-70">
                      <IoStar className="w-6 h-6 text-rating-yellow mb-2" />
                      <span className="text-xs font-medium text-primary-text">
                        Reviews
                      </span>
                    </button>

                    {/* Bookmark Option */}
                    <button
                      onClick={() => toggleBookmark(selectedShop.id)}
                      className="flex flex-col items-center justify-center bg-background rounded-xl p-4 min-w-[100px]"
                    >
                      {bookmarkedShops.includes(selectedShop.id) ? (
                        <IoBookmark className="w-6 h-6 text-primary-green mb-2" />
                      ) : (
                        <IoBookmarkOutline className="w-6 h-6 text-secondary-text mb-2" />
                      )}
                      <span className="text-xs font-medium text-primary-text">
                        Save
                      </span>
                    </button>

                    {/* More Option */}
                    <button className="flex flex-col items-center justify-center bg-background rounded-xl p-4 min-w-[100px] opacity-70">
                      <IoEllipsisHorizontalOutline className="w-6 h-6 text-secondary-text mb-2" />
                      <span className="text-xs font-medium text-primary-text">
                        More
                      </span>
                    </button>
                  </div>
                </div>

                {/* Photos Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-primary-text mb-3">
                    Photos
                  </h3>
                  <div className="overflow-x-auto pb-2 -mx-4 px-4">
                    <div className="flex gap-3">
                      {SAMPLE_PHOTOS.map((photo, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 w-40 h-40 rounded-xl overflow-hidden bg-background"
                        >
                          <img
                            src={photo}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reviews Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-primary-text">
                      Reviews
                    </h3>
                    <button className="text-sm text-primary-green font-medium">
                      See all
                    </button>
                  </div>

                  {/* Review Categories */}
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    <span className="px-3 py-1.5 bg-primary-green text-white text-xs font-medium rounded-full whitespace-nowrap">
                      All
                    </span>
                    <span className="px-3 py-1.5 bg-background text-primary-text text-xs font-medium rounded-full whitespace-nowrap">
                      Coffee
                    </span>
                    <span className="px-3 py-1.5 bg-background text-primary-text text-xs font-medium rounded-full whitespace-nowrap">
                      Service
                    </span>
                    <span className="px-3 py-1.5 bg-background text-primary-text text-xs font-medium rounded-full whitespace-nowrap">
                      Atmosphere
                    </span>
                    <span className="px-3 py-1.5 bg-background text-primary-text text-xs font-medium rounded-full whitespace-nowrap">
                      Quality
                    </span>
                  </div>

                  {/* Review List */}
                  <div className="space-y-4">
                    {SAMPLE_REVIEWS.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-border pb-4 last:border-0"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-primary-text">
                              {review.author}
                            </p>
                            <p className="text-xs text-secondary-text">
                              {review.date}
                            </p>
                          </div>
                          <RatingStars rating={review.rating} />
                        </div>
                        <p className="text-sm text-primary-text mb-2">
                          {review.text}
                        </p>
                        <div className="flex gap-2">
                          {review.categories.map((category, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-soft-teal text-primary-green text-xs font-medium rounded"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
