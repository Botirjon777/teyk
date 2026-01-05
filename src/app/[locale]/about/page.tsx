"use client";

import Navbar from "@/components/ui/Navbar";
import { useTranslations } from "next-intl";
import {
  IoStorefrontOutline,
  IoRocketOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
} from "react-icons/io5";

export default function AboutPage() {
  const t = useTranslations("About");

  const features = [
    {
      icon: IoShieldCheckmarkOutline,
      title: t("feature1Title"),
      description: t("feature1Text"),
      color: "bg-primary-green",
    },
    {
      icon: IoRocketOutline,
      title: t("feature2Title"),
      description: t("feature2Text"),
      color: "bg-secondary-teal",
    },
    {
      icon: IoStorefrontOutline,
      title: t("feature3Title"),
      description: t("feature3Text"),
      color: "bg-accent-yellow",
    },
    {
      icon: IoTimeOutline,
      title: t("feature4Title"),
      description: t("feature4Text"),
      color: "bg-primary-green",
    },
  ];

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
              <div className="absolute inset-0 bg-[url('/coffee-pattern.svg')] bg-repeat opacity-20" />
            </div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-3">{t("title")}</h1>
              <p className="text-lg opacity-90">{t("subtitle")}</p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="px-4 pb-8">
          <div className="bg-card-background rounded-2xl p-6 shadow-shadow-md">
            <h2 className="text-2xl font-bold text-primary-text mb-4 flex items-center gap-2">
              <div className="w-1 h-8 bg-primary-green rounded-full" />
              {t("ourStory")}
            </h2>
            <p className="text-secondary-text leading-relaxed">
              {t("ourStoryText")}
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="px-4 pb-8">
          <div className="bg-card-background rounded-2xl p-6 shadow-shadow-md">
            <h2 className="text-2xl font-bold text-primary-text mb-4 flex items-center gap-2">
              <div className="w-1 h-8 bg-secondary-teal rounded-full" />
              {t("ourMission")}
            </h2>
            <p className="text-secondary-text leading-relaxed">
              {t("ourMissionText")}
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="px-4 pb-8">
          <h2 className="text-2xl font-bold text-primary-text mb-6 text-center">
            {t("whyChooseUs")}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card-background rounded-xl p-5 shadow-shadow-md hover:shadow-shadow-lg transition-all duration-200 active:scale-[0.98]"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`${feature.color} p-3 rounded-xl text-white shrink-0`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary-text mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-secondary-text leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Us */}
        <section className="px-4 pb-8">
          <h2 className="text-2xl font-bold text-primary-text mb-6 text-center">
            {t("contactUs")}
          </h2>
          <div className="bg-card-background rounded-2xl p-6 shadow-shadow-md space-y-4">
            <div className="flex items-center gap-4 p-4 bg-soft-teal/20 rounded-xl">
              <div className="bg-primary-green p-3 rounded-xl text-white">
                <IoMailOutline className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-secondary-text mb-1">{t("email")}</p>
                <p className="font-semibold text-primary-text">
                  info@coffeetake.uz
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-soft-teal/20 rounded-xl">
              <div className="bg-secondary-teal p-3 rounded-xl text-white">
                <IoCallOutline className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-secondary-text mb-1">{t("phone")}</p>
                <p className="font-semibold text-primary-text">
                  +998 97 777 77 77
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-soft-teal/20 rounded-xl">
              <div className="bg-accent-yellow p-3 rounded-xl text-white">
                <IoLocationOutline className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-secondary-text mb-1">
                  {t("address")}
                </p>
                <p className="font-semibold text-primary-text">
                  {t("addressValue")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
