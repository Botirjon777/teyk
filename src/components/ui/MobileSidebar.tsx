"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "@/navigation";
import { useAuthStore } from "@/store/authStore";
import { useTranslations, useLocale } from "next-intl";
import {
  IoPersonOutline,
  IoInformationCircleOutline,
  IoSettingsOutline,
  IoLocationOutline,
  IoClose,
  IoLanguageOutline,
  IoChevronDown,
} from "react-icons/io5";
import { useState } from "react";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("MobileSidebar");
  const user = useAuthStore((state) => state.user);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const menuItems = [
    { icon: IoPersonOutline, label: t("profile"), path: "/profile" },
    { icon: IoInformationCircleOutline, label: t("about"), path: "/about" },
    { icon: IoSettingsOutline, label: t("settings"), path: "/settings" },
    { icon: IoLocationOutline, label: t("location"), path: "/location" },
  ];

  const languages = [
    { code: "en", label: "English", shortCode: "US" },
    { code: "ru", label: "Русский", shortCode: "RU" },
    { code: "uz", label: "O'zbekcha", shortCode: "UZ" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path as any);
    onClose();
  };

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname as any, { locale: newLocale as any });
    setIsLangOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] bg-card-background z-50 shadow-shadow-lg"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-xl font-bold text-primary-text">
                  {t("menu")}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-soft-teal rounded-lg transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <IoClose className="w-6 h-6 text-primary-text" />
                </button>
              </div>

              {/* User Info */}
              <div className="p-4 border-b border-border bg-soft-teal/20">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-primary-green flex items-center justify-center text-white text-2xl font-bold">
                    {user?.initials || "U"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-text">
                      {user?.name || t("guest")}
                    </h3>
                    <p className="text-sm text-secondary-text">
                      {user?.phone || t("notLoggedIn")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-1">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-soft-teal transition-colors duration-200 text-left group"
                      >
                        <item.icon className="w-6 h-6 text-primary-text group-hover:text-primary-green transition-colors" />
                        <span className="font-medium text-primary-text group-hover:text-primary-green">
                          {item.label}
                        </span>
                      </button>
                    </motion.li>
                  ))}

                  <div className="h-px bg-border my-2" />

                  {/* Language Selector */}
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: menuItems.length * 0.05 }}
                  >
                    <div className="relative">
                      <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                          isLangOpen
                            ? "bg-soft-teal/50 shadow-sm"
                            : "hover:bg-soft-teal/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IoLanguageOutline className="w-6 h-6 text-primary-text" />
                          <span className="font-medium text-primary-text">
                            {t("language")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-primary-green bg-soft-teal px-2 py-1 rounded">
                            {locale.toUpperCase()}
                          </span>
                          <motion.div
                            animate={{ rotate: isLangOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <IoChevronDown className="w-4 h-4 text-secondary-text" />
                          </motion.div>
                        </div>
                      </button>

                      <AnimatePresence>
                        {isLangOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mt-2"
                          >
                            <div className="bg-background rounded-lg border border-border p-1 shadow-lg">
                              <ul className="space-y-1">
                                {languages.map((lang) => (
                                  <li key={lang.code}>
                                    <button
                                      onClick={() =>
                                        handleLanguageChange(lang.code)
                                      }
                                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-all duration-200 ${
                                        locale === lang.code
                                          ? "bg-primary-green text-white font-semibold shadow-sm"
                                          : "hover:bg-soft-teal text-primary-text"
                                      }`}
                                    >
                                      <span>{lang.label}</span>
                                      <span
                                        className={`text-xs font-bold ${
                                          locale === lang.code
                                            ? "text-white/80"
                                            : "text-secondary-text"
                                        }`}
                                      >
                                        {lang.shortCode}
                                      </span>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.li>
                </ul>
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-border">
                <p className="text-xs text-secondary-text text-center">
                  {t("version")}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
