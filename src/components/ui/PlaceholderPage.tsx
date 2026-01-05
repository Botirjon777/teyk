import Navbar from "@/components/ui/Navbar";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";

export default function PlaceholderPage({ title }: { title: string }) {
  const t = useTranslations("Placeholder");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main
        className="px-4 flex flex-col items-center justify-center text-center"
        style={{ paddingTop: "calc(6rem + var(--safe-area-top))" }}
      >
        <div className="w-24 h-24 bg-soft-teal rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl text-primary-green">✨</span>
        </div>
        <h1 className="text-3xl font-bold text-primary-text mb-2">{title}</h1>
        <p className="text-secondary-text max-w-xs mx-auto">
          {t("description")}
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-8 bg-primary-green text-white px-8 py-3 rounded-xl font-semibold shadow-shadow-lg hover:opacity-90 active:scale-95 transition-all"
        >
          {t("backHome")}
        </button>
      </main>
    </div>
  );
}
