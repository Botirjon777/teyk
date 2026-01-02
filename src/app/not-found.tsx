"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { BiCoffee } from "react-icons/bi";
import { IoHomeOutline, IoArrowBack } from "react-icons/io5";
import { MdOutlineSearchOff } from "react-icons/md";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="container max-w-md">
                <div className="bg-card-background rounded-2xl shadow-shadow-lg p-8 text-center">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-soft-teal rounded-full blur-xl opacity-50 animate-pulse"></div>
                            <div className="relative bg-primary-green rounded-full p-6">
                                <MdOutlineSearchOff className="w-16 h-16 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* 404 Text */}
                    <h1 className="text-6xl font-bold text-primary-green mb-2">404</h1>

                    {/* Message */}
                    <h2 className="text-2xl font-bold text-primary-text mb-3">
                        Page Not Found
                    </h2>
                    <p className="text-secondary-text mb-8">
                        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                    </p>

                    {/* Coffee Icon Divider */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <div className="h-px bg-border flex-1"></div>
                        <BiCoffee className="w-6 h-6 text-rating-yellow" />
                        <div className="h-px bg-border flex-1"></div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                        <Link href="/">
                            <Button
                                variant="primary"
                                size="large"
                                className="w-full flex items-center justify-center gap-2"
                            >
                                <IoHomeOutline className="w-5 h-5" />
                                Go to Home
                            </Button>
                        </Link>

                        <Button
                            variant="secondary"
                            size="large"
                            onClick={() => router.back()}
                            className="w-full flex items-center justify-center gap-2"
                        >
                            <IoArrowBack className="w-5 h-5" />
                            Go Back
                        </Button>
                    </div>

                    {/* Additional Info */}
                    <p className="text-xs text-secondary-text mt-6">
                        Need help? Contact our support team
                    </p>
                </div>
            </div>
        </div>
    );
}
