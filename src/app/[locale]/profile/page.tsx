"use client";

import { useAuthStore } from "@/store/authStore";
import Navbar from "@/components/ui/Navbar";
import { useTranslations } from "next-intl";
import {
  IoPersonOutline,
  IoCallOutline,
  IoMailOutline,
  IoLocationOutline,
  IoLogOutOutline,
} from "react-icons/io5";

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const t = useTranslations("Profile");

  const profileSections = [
    {
      id: 1,
      icon: IoPersonOutline,
      label: t("name"),
      value: user?.name || t("guestUser"),
    },
    {
      id: 2,
      icon: IoCallOutline,
      label: t("phone"),
      value: user?.phone || t("notProvided"),
    },
    {
      id: 3,
      icon: IoMailOutline,
      label: t("email"),
      value: "botirjon@example.com",
    },
    {
      id: 4,
      icon: IoLocationOutline,
      label: t("address"),
      value: "Tashkent, Uzbekistan",
    },
  ];

  return (
    <div className="page-with-nav bg-background">
      <Navbar />
      <main className="page container">
        <h1 className="text-2xl font-bold text-primary-text mb-6">
          {t("title")}
        </h1>

        {/* Profile Header */}
        <div className="bg-card-background rounded-xl p-6 mb-6 text-center">
          <div className="w-24 h-24 bg-primary-green rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
            {user?.initials || "U"}
          </div>
          <h2 className="text-xl font-bold text-primary-text mb-1">
            {user?.name || t("guestUser")}
          </h2>
          <p className="text-secondary-text">
            {user?.phone || t("notLoggedIn")}
          </p>
        </div>

        {/* Profile Information */}
        <div className="bg-card-background rounded-xl overflow-hidden mb-6">
          {profileSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                className={`p-4 flex items-center gap-4 ${
                  index !== profileSections.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                <div className="w-10 h-10 bg-soft-teal rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary-green" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-secondary-text">{section.label}</p>
                  <p className="font-semibold text-primary-text">
                    {section.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => logout()}
          className="w-full bg-red/10 text-red border-2 border-red/20 rounded-xl p-4 flex items-center justify-center gap-3 font-semibold hover:bg-red/20 transition-colors"
        >
          <IoLogOutOutline className="w-6 h-6" />
          {t("logout")}
        </button>
      </main>
    </div>
  );
}
