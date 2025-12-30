"use client";

import Dropdown from "@/components/ui/Dropdown";
import { useState } from "react";

export default function DropdownSection() {
  const [dropdownValue, setDropdownValue] = useState("");

  const dropdownOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  return (
    <section className="container mb-5 xl:mb-10">
      <h2 className="text-2xl font-semibold text-primary-text mb-2.5 xl:mb-5">
        Dropdowns
      </h2>
      <div className="bg-card-background rounded-xl p-2.5 xl:p-5 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Dropdown
            label="Select Option"
            options={dropdownOptions}
            placeholder="Choose an option..."
            value={dropdownValue}
            onChange={(value) => setDropdownValue(value)}
          />
          <Dropdown
            label="Disabled Dropdown"
            options={dropdownOptions}
            placeholder="Disabled..."
            disabled
          />
        </div>
      </div>
    </section>
  );
}
