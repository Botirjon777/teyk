"use client";

import Navbar from "@/components/ui/Navbar";
import { useTranslations } from "next-intl";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoCallOutline,
  IoNavigateOutline,
  IoStorefrontOutline,
} from "react-icons/io5";

export default function LocationPage() {
  const t = useTranslations("Location");

  const locations = [
    {
      id: 1,
      name: t("location1Name"),
      address: t("location1Address"),
      phone: "+998 71 123 45 67",
      lat: 41.311081,
      lng: 69.240562,
      isHeadquarters: true,
    },
    {
      id: 2,
      name: t("location2Name"),
      address: t("location2Address"),
      phone: "+998 71 234 56 78",
      lat: 41.275568,
      lng: 69.203422,
      isHeadquarters: false,
    },
    {
      id: 3,
      name: t("location3Name"),
      address: t("location3Address"),
      phone: "+998 71 345 67 89",
      lat: 41.337401,
      lng: 69.289321,
      isHeadquarters: false,
    },
  ];

  const handleGetDirections = (lat: number, lng: number) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="pt-safe min-h-screen bg-background">
      <Navbar />

      <main
        className="pb-24"
        style={{ paddingTop: "calc(4rem + var(--safe-area-top))" }}
      >
        {/* Hero Section */}
        <section className="px-4 pt-6 pb-8">
          <div className="relative bg-linear-to-br from-primary-green to-secondary-teal rounded-2xl overflow-hidden shadow-shadow-lg p-8 text-center text-white">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('/location-pattern.svg')] bg-repeat opacity-20" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                  <IoLocationOutline className="w-12 h-12" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-3">{t("title")}</h1>
              <p className="text-lg opacity-90">{t("subtitle")}</p>
            </div>
          </div>
        </section>

        {/* Opening Hours */}
        <section className="px-4 pb-8">
          <div className="bg-card-background rounded-2xl p-6 shadow-shadow-md">
            <h2 className="text-xl font-bold text-primary-text mb-4 flex items-center gap-2">
              <IoTimeOutline className="w-6 h-6 text-primary-green" />
              {t("openingHours")}
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-soft-teal/20 rounded-lg">
                <span className="font-semibold text-primary-text">
                  {t("weekdays")}
                </span>
                <span className="text-secondary-text">{t("weekdaysTime")}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-soft-teal/20 rounded-lg">
                <span className="font-semibold text-primary-text">
                  {t("weekends")}
                </span>
                <span className="text-secondary-text">{t("weekendsTime")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Locations */}
        <section className="px-4 pb-8">
          <h2 className="text-2xl font-bold text-primary-text mb-6">
            {t("branches")}
          </h2>
          <div className="space-y-4">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-card-background rounded-2xl overflow-hidden shadow-shadow-md hover:shadow-shadow-lg transition-all duration-200"
              >
                {/* Location Header */}
                <div className="p-5 border-b border-border">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-primary-green p-3 rounded-xl text-white shrink-0">
                      <IoStorefrontOutline className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-primary-text">
                          {location.name}
                        </h3>
                        {location.isHeadquarters && (
                          <span className="bg-accent-yellow text-white text-xs font-semibold px-2 py-1 rounded">
                            {t("headquarters")}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-secondary-text flex items-start gap-2">
                        <IoLocationOutline className="w-4 h-4 mt-0.5 shrink-0" />
                        {location.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location Actions */}
                <div className="p-4 bg-soft-teal/10">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() =>
                        handleGetDirections(location.lat, location.lng)
                      }
                      className="flex items-center justify-center gap-2 bg-primary-green text-white px-4 py-3 rounded-xl font-semibold text-sm hover:bg-primary-green/90 transition-colors duration-200 active:scale-95"
                    >
                      <IoNavigateOutline className="w-5 h-5" />
                      {t("getDirections")}
                    </button>
                    <button
                      onClick={() => handleCall(location.phone)}
                      className="flex items-center justify-center gap-2 bg-secondary-teal text-white px-4 py-3 rounded-xl font-semibold text-sm hover:bg-secondary-teal/90 transition-colors duration-200 active:scale-95"
                    >
                      <IoCallOutline className="w-5 h-5" />
                      {t("callUs")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="px-4 pb-8">
          <div className="bg-card-background rounded-2xl p-6 shadow-shadow-md text-center">
            <div className="bg-soft-teal/20 rounded-xl p-12 mb-4">
              <IoLocationOutline className="w-16 h-16 text-primary-green mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary-text mb-2">
                {t("findNearby")}
              </h3>
              <p className="text-sm text-secondary-text mb-4">
                {t("useMyLocation")}
              </p>
              <button className="bg-primary-green text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-green/90 transition-colors duration-200 active:scale-95">
                <IoNavigateOutline className="w-5 h-5 inline mr-2" />
                {t("useMyLocation")}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
