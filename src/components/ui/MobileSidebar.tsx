"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { IoPersonOutline, IoInformationCircleOutline, IoSettingsOutline, IoLocationOutline, IoClose } from "react-icons/io5";

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);

    const menuItems = [
        { icon: IoPersonOutline, label: "Profile", path: "/profile" },
        { icon: IoInformationCircleOutline, label: "About Us", path: "/about" },
        { icon: IoSettingsOutline, label: "Settings", path: "/settings" },
        { icon: IoLocationOutline, label: "Location", path: "/location" },
    ];

    const handleNavigation = (path: string) => {
        router.push(path);
        onClose();
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
                                <h2 className="text-xl font-bold text-primary-text">Menu</h2>
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
                                            {user?.name || "Guest User"}
                                        </h3>
                                        <p className="text-sm text-secondary-text">
                                            {user?.phone || "Not logged in"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <nav className="flex-1 p-4">
                                <ul className="space-y-2">
                                    {menuItems.map((item, index) => (
                                        <motion.li
                                            key={item.label}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
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
                                </ul>
                            </nav>

                            {/* Footer */}
                            <div className="p-4 border-t border-border">
                                <p className="text-xs text-secondary-text text-center">
                                    Coffee Take v1.0
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
