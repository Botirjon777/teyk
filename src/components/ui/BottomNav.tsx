"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { IoHomeOutline, IoHome, IoReceiptOutline, IoReceipt, IoWalletOutline, IoWallet, IoHeartOutline, IoHeart, IoPersonOutline, IoPerson } from "react-icons/io5";

interface NavItem {
    id: number;
    label: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    activeIcon: React.ComponentType<{ className?: string }>;
}

export default function BottomNav() {
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const navItems: NavItem[] = [
        {
            id: 0,
            label: "Wishlist",
            path: "/wishlist",
            icon: IoHeartOutline,
            activeIcon: IoHeart,
        },
        {
            id: 1,
            label: "Orders",
            path: "/orders",
            icon: IoReceiptOutline,
            activeIcon: IoReceipt,
        },
        {
            id: 2,
            label: "Home",
            path: "/",
            icon: IoHomeOutline,
            activeIcon: IoHome,
        },
        {
            id: 3,
            label: "Payment",
            path: "/payment",
            icon: IoWalletOutline,
            activeIcon: IoWallet,
        },
        {
            id: 4,
            label: "Profile",
            path: "/profile",
            icon: IoPersonOutline,
            activeIcon: IoPerson,
        },
    ];

    // Determine active index based on pathname
    const getActiveIndex = () => {
        const index = navItems.findIndex((item) => item.path === pathname);
        return index !== -1 ? index : 2; // Default to Home (index 2)
    };

    const activeIndex = getActiveIndex();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    if (!mounted) {
        return null;
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card-background border-t border-border shadow-shadow-lg">
            <div className="relative px-4 py-2 pb-3">
                {/* Animated Circle Indicator */}
                <motion.div
                    className="absolute top-0 w-12 h-12 bg-primary-green rounded-full pointer-events-none"
                    initial={false}
                    animate={{
                        left: `calc(16px + ((100% - 32px) / ${navItems.length}) * ${activeIndex} + ((100% - 32px) / ${navItems.length} / 2) - 1.5rem)`,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
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
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item.path)}
                                className="flex flex-col items-center gap-1 flex-1 relative z-10 transition-all duration-200"
                            >
                                {/* Icon */}
                                <motion.div
                                    animate={{
                                        y: isActive ? -8 : 0,
                                        scale: isActive ? 1.1 : 1,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    }}
                                    className={`p-2 rounded-full transition-colors duration-200 ${isActive ? "text-white" : "text-secondary-text"
                                        }`}
                                >
                                    <Icon className="w-6 h-6" />
                                </motion.div>

                                {/* Label */}
                                <motion.span
                                    animate={{
                                        opacity: isActive ? 1 : 1,
                                        y: isActive ? 0 : 0,
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className={`text-xs font-medium ${isActive ? "text-primary-green" : "text-secondary-text"
                                        }`}
                                >
                                    {item.label}
                                </motion.span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
