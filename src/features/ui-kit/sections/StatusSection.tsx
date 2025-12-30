import Status from "@/components/ui/Status";

export default function StatusSection() {
  return (
    <section className="container mb-5 xl:mb-10">
      <h2 className="text-2xl font-semibold text-primary-text mb-2.5 xl:mb-5">
        Status Indicators
      </h2>
      <div className="bg-card-background rounded-xl p-2.5 xl:p-5 border border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 xl:gap-5">
          <Status status="active" />
          <Status status="inactive" />
          <Status status="pending" />
          <Status status="error" />
          <Status status="active" label="In Stock" />
          <Status status="pending" label="Processing" />
          <Status status="error" label="Out of Stock" />
          <Status status="inactive" label="Discontinued" />
        </div>
      </div>
    </section>
  );
}
