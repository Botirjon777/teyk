import Button from "@/components/ui/Button";
export default function ButtonSection() {
  return (
    <section className="mb-5 xl:mb-10 container">
      <h2 className="text-2xl font-semibold text-primary-text mb-2.5 xl:mb-5">
        Buttons
      </h2>
      <div className="bg-card-background rounded-xl p-2.5 xl:p-5 border border-border">
        <div className="space-y-[15px] xl:space-y-[25px]">
          {/* Primary Buttons */}
          <div>
            <h3 className="text-sm font-medium text-secondary-text mb-2.5 xl:mb-5">
              Primary Buttons
            </h3>
            <div className="flex flex-col xl:flex-row flex-wrap gap-2.5 xl:gap-5 items-start">
              <Button variant="primary" size="small">
                Small Button
              </Button>
              <Button variant="primary" size="medium">
                Medium Button
              </Button>
              <Button variant="primary" size="large">
                Large Button
              </Button>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div>
            <h3 className="text-sm font-medium text-secondary-text mb-2.5 xl:mb-5">
              Secondary Buttons
            </h3>
            <div className="flex flex-col xl:flex-row flex-wrap gap-2.5 xl:gap-5 items-start">
              <Button variant="secondary" size="small">
                Small Button
              </Button>
              <Button variant="secondary" size="medium">
                Medium Button
              </Button>
              <Button variant="secondary" size="large">
                Large Button
              </Button>
            </div>
          </div>

          {/* Disabled Buttons */}
          <div>
            <h3 className="text-sm font-medium text-secondary-text mb-2.5 xl:mb-5">
              Disabled Buttons
            </h3>
            <div className="flex flex-col xl:flex-row flex-wrap gap-2.5 xl:gap-5 items-start">
              <Button variant="primary" size="small" disabled>
                Disabled Small Primary
              </Button>
              <Button variant="secondary" size="small" disabled>
                Disabled Small Secondary
              </Button>
              <Button variant="primary" size="medium" disabled>
                Disabled Medium Primary
              </Button>
              <Button variant="secondary" size="medium" disabled>
                Disabled Medium Secondary
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
