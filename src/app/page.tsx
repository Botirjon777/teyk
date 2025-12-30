"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button
        onClick={() => {
          router.push("/ui");
        }}
      >
        Go to Check our UI Kit
      </Button>
    </div>
  );
}
