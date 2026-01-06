"use client";

import { useEffect } from "react";
import { useRouter } from "@/navigation";
import Navbar from "@/components/ui/Navbar";
import { useOrderStore } from "@/store/orderStore";
import {
  IoTimeOutline,
  IoLocationOutline,
  IoChevronForwardOutline,
  IoReceiptOutline,
} from "react-icons/io5";

export default function OrdersPage() {
  const router = useRouter();
  const { orders } = useOrderStore();

  useEffect(() => {
    useOrderStore.persist.rehydrate();
  }, []);

  // Sort orders by creation date (newest first)
  const sortedOrders = [...orders].sort((a, b) => b.createdAt - a.createdAt);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow text-primary-text";
      case "preparing":
        return "bg-blue text-white";
      case "ready":
        return "bg-primary-green text-white";
      case "completed":
        return "bg-soft-teal text-primary-text";
      case "cancelled":
        return "bg-red text-white";
      default:
        return "bg-border text-secondary-text";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="pt-safe min-h-screen bg-background">
      <Navbar />
      <main
        className="pb-24"
        style={{ paddingTop: "calc(4rem + var(--safe-area-top))" }}
      >
        {/* Header */}
        <section className="px-4 pt-6 pb-4">
          <h1 className="text-2xl font-bold text-primary-text">My Orders</h1>
          <p className="text-secondary-text mt-1">
            {sortedOrders.length} order{sortedOrders.length !== 1 ? "s" : ""}
          </p>
        </section>

        {/* Orders List */}
        <section className="px-4 pb-6">
          {sortedOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <IoReceiptOutline className="w-20 h-20 text-secondary-text mb-4" />
              <p className="text-primary-text font-semibold mb-2">
                No orders yet
              </p>
              <p className="text-secondary-text text-sm mb-4">
                Start shopping to place your first order
              </p>
              <button
                onClick={() => router.push("/")}
                className="bg-primary-green text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedOrders.map((order) => {
                const orderDate = new Date(order.createdAt);
                const estimatedPickupTime = new Date(
                  order.createdAt + order.estimatedPreparationTime * 60 * 1000
                );

                return (
                  <div
                    key={order.id}
                    onClick={() => router.push(`/orders/${order.id}`)}
                    className="bg-card-background rounded-xl p-4 shadow-shadow-md cursor-pointer hover:shadow-shadow-lg transition-shadow active:scale-[0.98]"
                  >
                    {/* Order Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-mono text-sm font-semibold text-primary-text">
                            {order.id.split("-")[0]}
                          </p>
                          <span
                            className={`px-2 py-1 rounded-md text-xs font-semibold ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusLabel(order.status)}
                          </span>
                        </div>
                        <p className="text-xs text-secondary-text">
                          {orderDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}{" "}
                          at{" "}
                          {orderDate.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <IoChevronForwardOutline className="w-5 h-5 text-secondary-text" />
                    </div>

                    {/* Shop Info */}
                    <div className="flex items-start gap-2 mb-3 pb-3 border-b border-border">
                      <IoLocationOutline className="w-5 h-5 text-primary-green mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-primary-text text-sm">
                          {order.shopName}
                        </p>
                        <p className="text-xs text-secondary-text">
                          {order.shopAddress}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-3">
                      <p className="text-xs text-secondary-text mb-2">
                        {order.items.length} item
                        {order.items.length !== 1 ? "s" : ""}
                      </p>
                      <div className="space-y-1">
                        {order.items.slice(0, 2).map((item, index) => (
                          <p key={index} className="text-sm text-primary-text">
                            {item.quantity}x {item.name}
                          </p>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-xs text-secondary-text">
                            +{order.items.length - 2} more item
                            {order.items.length - 2 !== 1 ? "s" : ""}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Pickup Time & Total */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IoTimeOutline className="w-4 h-4 text-primary-green" />
                        <p className="text-xs text-secondary-text">
                          Pickup:{" "}
                          {estimatedPickupTime.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-primary-green">
                        ${order.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Info Note */}
        {sortedOrders.length > 0 && (
          <section className="px-4 pb-8">
            <div className="bg-soft-teal/30 rounded-xl p-4 border border-soft-teal">
              <p className="text-xs text-secondary-text text-center">
                💡 Orders are stored locally and will be cleared when you
                refresh the page
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
