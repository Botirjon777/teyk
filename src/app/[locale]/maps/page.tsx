"use client";

import PlaceholderPage from "@/components/ui/PlaceholderPage";
import { useTranslations } from "next-intl";

export default function MapsPage() {
  const t = useTranslations("BottomNav");
  return <PlaceholderPage title={t("maps")} />;
}
