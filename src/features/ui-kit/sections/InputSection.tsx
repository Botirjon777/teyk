"use client";

import Input from "@/components/ui/Input";
import { useState } from "react";

export default function InputSection() {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  return (
    <section className="container mb-5 xl:mb-10">
      <h2 className="text-2xl font-semibold text-primary-text mb-2.5 xl:mb-5">
        Inputs
      </h2>
      <div className="bg-card-background rounded-xl p-2.5 xl:p-5 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Text Input"
            variant="text"
            placeholder="Enter text..."
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
          />
          <Input
            label="Email Input"
            variant="email"
            placeholder="Enter email..."
          />
          <Input
            label="Password Input"
            variant="password"
            placeholder="Enter password..."
          />
          <Input
            label="Number Input"
            variant="number"
            placeholder="Enter number..."
          />
          <Input
            label="Input with Error"
            variant="text"
            placeholder="This has an error..."
            error="This field is required"
          />
          <Input
            label="Disabled Input"
            variant="text"
            placeholder="Disabled..."
            disabled
          />
        </div>
        <div className="mt-6">
          <Input
            label="Textarea"
            variant="textarea"
            placeholder="Enter long text..."
            rows={4}
            value={textareaValue}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setTextareaValue(e.target.value)
            }
          />
        </div>
      </div>
    </section>
  );
}
