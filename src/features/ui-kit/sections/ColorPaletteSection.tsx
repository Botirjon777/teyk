export default function ColorPaletteSection() {
  return (
    <section className="container mb-5 xl:mb-10">
      <h2 className="text-2xl font-semibold text-primary-text mb-2.5 xl:mb-5">
        Color Palette
      </h2>
      <div className="bg-card-background rounded-xl p-2.5 xl:p-5 border border-border">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <div className="w-full h-20 rounded-lg bg-primary-green mb-2"></div>
            <p className="text-sm font-medium text-primary-text">
              Primary Green
            </p>
            <p className="text-xs text-secondary-text">#007B6A</p>
          </div>
          <div>
            <div className="w-full h-20 rounded-lg bg-secondary-teal mb-2"></div>
            <p className="text-sm font-medium text-primary-text">
              Secondary Teal
            </p>
            <p className="text-xs text-secondary-text">#71B5AD</p>
          </div>
          <div>
            <div className="w-full h-20 rounded-lg bg-soft-teal mb-2"></div>
            <p className="text-sm font-medium text-primary-text">Soft Teal</p>
            <p className="text-xs text-secondary-text">#C8E0DC</p>
          </div>
          <div>
            <div className="w-full h-20 rounded-lg bg-rating-yellow mb-2"></div>
            <p className="text-sm font-medium text-primary-text">
              Rating Yellow
            </p>
            <p className="text-xs text-secondary-text">#DBAD78</p>
          </div>
          <div>
            <div className="w-full h-20 rounded-lg bg-red mb-2"></div>
            <p className="text-sm font-medium text-primary-text">Red</p>
            <p className="text-xs text-secondary-text">#FF4B4B</p>
          </div>
        </div>
      </div>
    </section>
  );
}
