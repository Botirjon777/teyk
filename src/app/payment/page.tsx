"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import { IoWalletOutline, IoCardOutline, IoLogoApple, IoLogoGoogle } from "react-icons/io5";

export default function PaymentPage() {
    const router = useRouter();

    const paymentMethods = [
        {
            id: 1,
            name: "Credit/Debit Card",
            icon: IoCardOutline,
            description: "Visa, Mastercard, Amex",
        },
        {
            id: 2,
            name: "Apple Pay",
            icon: IoLogoApple,
            description: "Fast and secure",
        },
        {
            id: 3,
            name: "Google Pay",
            icon: IoLogoGoogle,
            description: "Quick checkout",
        },
    ];

    return (
        <div className="page-with-nav bg-background">
            <Navbar />
            <main className="page container">
                <h1 className="text-2xl font-bold text-primary-text mb-6">Payment Methods</h1>

                <div className="space-y-3">
                    {paymentMethods.map((method) => {
                        const Icon = method.icon;
                        return (
                            <div
                                key={method.id}
                                className="bg-card-background border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary-green transition-colors cursor-pointer"
                            >
                                <div className="w-12 h-12 bg-soft-teal rounded-full flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-primary-green" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-primary-text">{method.name}</h3>
                                    <p className="text-sm text-secondary-text">{method.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6 p-4 bg-soft-teal/20 rounded-xl border border-soft-teal">
                    <div className="flex items-start gap-3">
                        <IoWalletOutline className="w-6 h-6 text-primary-green flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-primary-text mb-1">Secure Payments</h3>
                            <p className="text-sm text-secondary-text">
                                All transactions are encrypted and secure. Your payment information is never stored on our servers.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
