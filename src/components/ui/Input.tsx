import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "text" | "email" | "number" | "password";
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  variant: "textarea";
}

export default function Input({
  label,
  error,
  variant = "text",
  className = "",
  disabled,
  ...props
}: InputProps | TextareaProps) {
  const baseStyles =
    "w-full px-4 py-3 rounded-lg border transition-all duration-200 font-normal text-primary-text bg-card-background";
  const normalStyles =
    "border-border focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent";
  const errorStyles =
    "border-red focus:outline-none focus:ring-2 focus:ring-red focus:border-transparent";
  const disabledStyles = "bg-gray-100 cursor-not-allowed opacity-60";

  const inputStyles = `${baseStyles} ${error ? errorStyles : normalStyles} ${
    disabled ? disabledStyles : ""
  } ${className}`;

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-primary-text">
          {label}
        </label>
      )}
      {variant === "textarea" ? (
        <textarea
          className={inputStyles}
          disabled={disabled}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          type={variant}
          className={inputStyles}
          disabled={disabled}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <p className="mt-1 text-sm text-red">{error}</p>}
    </div>
  );
}
