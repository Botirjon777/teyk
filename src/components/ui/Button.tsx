import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "disabled";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "medium",
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-medium rounded-lg transition-all duration-200 cursor-pointer touch-manipulation select-none";

  const variantStyles = {
    primary:
      "bg-primary-green text-white border-none shadow-shadow-sm hover:bg-[#006456] hover:shadow-shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-shadow-sm active:bg-[#005a4d]",
    secondary:
      "bg-card-background text-primary-green border-2 border-primary-green hover:bg-soft-teal hover:border-secondary-teal active:scale-[0.98] active:bg-secondary-teal",
    disabled:
      "bg-disabled-gray text-white border-none cursor-not-allowed opacity-60",
  };

  const sizeStyles = {
    small: "px-[12px] py-[10px] text-[14px]",
    medium: "px-[15px] py-[12px] text-[15px]",
    large: "px-[22px] py-[14px] text-[17px]",
  };

  const appliedVariant = disabled ? "disabled" : variant;

  return (
    <button
      className={`${baseStyles} ${variantStyles[appliedVariant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
