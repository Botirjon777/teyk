"use client";

import React, { useState, useRef, useEffect } from "react";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export default function Dropdown({
  label,
  options,
  placeholder = "Select an option",
  value,
  onChange,
  disabled = false,
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update internal state when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    if (onChange) {
      onChange(optionValue);
    }
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-primary-text">
          {label}
        </label>
      )}
      <div className="relative">
        {/* Dropdown Button */}
        <button
          type="button"
          onClick={toggleDropdown}
          disabled={disabled}
          className={`w-full px-4 py-3 rounded-lg border border-border transition-all duration-200 font-normal bg-card-background focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent text-left flex items-center justify-between ${
            disabled
              ? "bg-gray-100 cursor-not-allowed opacity-60"
              : "cursor-pointer hover:border-secondary-teal"
          } ${selectedValue ? "text-primary-text" : "text-secondary-text"}`}
        >
          <span>{displayText}</span>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="#007B6A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Dropdown Options */}
        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-2 bg-card-background border border-border rounded-lg shadow-shadow-lg overflow-hidden animate-fadeIn">
            <div className="max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full px-4 py-3 text-left transition-colors duration-150 ${
                    option.value === selectedValue
                      ? "bg-soft-teal text-primary-green font-medium"
                      : "text-primary-text hover:bg-soft-teal"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
