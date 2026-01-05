"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  IoHomeOutline,
  IoHome,
  IoReceiptOutline,
  IoReceipt,
  IoPersonOutline,
  IoPerson,
  IoStorefrontOutline,
  IoStorefront,
  IoMapOutline,
  IoMap,
} from "react-icons/io5";

export default function BottomNav() {
  const pathname = usePathname();
  const t = useTranslations("BottomNav");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    {
      id: 0,
      label: t("shops"),
      path: "/shops",
      icon: IoStorefrontOutline,
      activeIcon: IoStorefront,
    },
    {
      id: 1,
      label: t("maps"),
      path: "/maps",
      icon: IoMapOutline,
      activeIcon: IoMap,
    },
    {
      id: 2,
      label: t("home"),
      path: "/",
      icon: IoHomeOutline,
      activeIcon: IoHome,
    },
    {
      id: 3,
      label: t("profile"),
      path: "/profile",
      icon: IoPersonOutline,
      activeIcon: IoPerson,
    },
    {
      id: 4,
      label: t("orders"),
      path: "/orders",
      icon: IoReceiptOutline,
      activeIcon: IoReceipt,
    },
  ];

  // Determine active index based on pathname
  const getActiveIndex = () => {
    const strippedPathname = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");
    const index = navItems.findIndex(
      (item) => item.path === (strippedPathname === "" ? "/" : strippedPathname)
    );
    return index !== -1 ? index : 2; // Default to Home (index 2)
  };

  const activeIndex = getActiveIndex();

  if (!mounted) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card-background border-t border-border h-[72px]" />
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card-background border-t border-border shadow-shadow-lg">
      <div className="relative px-4 py-2 pb-3">
        {/* Animated Circle Indicator */}
        <motion.div
          className="absolute top-0 w-12 h-12 bg-primary-green rounded-full pointer-events-none will-change-transform"
          initial={false}
          animate={{
            left: `calc(16px + ((100% - 32px) / ${navItems.length}) * ${activeIndex} + ((100% - 32px) / ${navItems.length} / 2) - 1.5rem)`,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 28,
          }}
          style={{
            boxShadow: "0 4px 12px rgba(0, 123, 106, 0.4)",
          }}
        />

        {/* Navigation Items */}
        <div className="flex items-center justify-between relative">
          {navItems.map((item, index) => {
            const isActive = index === activeIndex;
            const Icon = isActive ? item.activeIcon : item.icon;

            return (
              <Link
                key={item.id}
                href={item.path}
                className="flex flex-col items-center gap-1 flex-1 relative z-10 transition-all duration-200"
                prefetch={true}
              >
                {/* Icon */}
                <motion.div
                  animate={{
                    y: isActive ? -8 : 0,
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isActive ? "text-white" : "text-secondary-text"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>

                {/* Label */}
                <motion.span
                  animate={{
                    opacity: 1,
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.15 }}
                  className={`text-xs font-semibold ${
                    isActive ? "text-primary-green" : "text-secondary-text"
                  }`}
                >
                  {item.label}
                </motion.span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
