import Badge from "@/components/ui/Badge";

export default function BadgesSection() {
  return (
    <section className="container mb-5 xl:mb-10">
      <h2 className="text-2xl font-semibold text-primary-text mb-2.5 xl:mb-5">
        Badges
      </h2>
      <div className="bg-card-background rounded-xl p-2.5 xl:p-5 border border-border">
        <div className="flex flex-wrap gap-2.5 xl:gap-5">
          <Badge variant="teal">Teal Badge</Badge>
          <Badge variant="yellow">Yellow Badge</Badge>
          <Badge variant="red">Red Badge</Badge>
          <Badge variant="teal">New</Badge>
          <Badge variant="yellow">Featured</Badge>
          <Badge variant="red">Sale</Badge>
        </div>
      </div>
    </section>
  );
}
