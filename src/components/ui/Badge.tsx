import React from "react";

export interface BadgeProps {
  variant?: "teal" | "yellow" | "red";
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = "teal",
  children,
  className = "",
}: BadgeProps) {
  const baseStyles = "inline-block px-3 py-1 rounded-full text-xs font-medium";

  const variantStyles = {
    teal: "bg-soft-teal text-primary-green",
    yellow: "bg-rating-yellow text-white",
    red: "bg-red text-white",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
