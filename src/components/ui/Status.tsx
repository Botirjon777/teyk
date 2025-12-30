import React from "react";

export interface StatusProps {
  status: "active" | "inactive" | "pending" | "error";
  label?: string;
  className?: string;
}

export default function Status({ status, label, className = "" }: StatusProps) {
  const statusConfig = {
    active: {
      color: "bg-primary-green",
      text: "text-primary-green",
      label: label || "Active",
    },
    inactive: {
      color: "bg-disabled-gray",
      text: "text-secondary-text",
      label: label || "Inactive",
    },
    pending: {
      color: "bg-rating-yellow",
      text: "text-rating-yellow",
      label: label || "Pending",
    },
    error: {
      color: "bg-red",
      text: "text-red",
      label: label || "Error",
    },
  };

  const config = statusConfig[status];

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`w-2 h-2 rounded-full ${config.color}`} />
      <span className={`text-sm font-medium ${config.text}`}>
        {config.label}
      </span>
    </div>
  );
}
