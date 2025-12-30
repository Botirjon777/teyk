import {
  ButtonSection,
  ColorPaletteSection,
  DropdownSection,
  Header,
  InputSection,
  ModalSection,
  ProductCardsSection,
  StatusSection,
  BadgesSection,
} from "./sections";

export default function Page() {
  return (
    <div className="page">
      <Header />

      {/* Button Section */}
      <ButtonSection />

      {/* Inputs Section */}
      <InputSection />

      {/* Dropdowns Section */}
      <DropdownSection />

      {/* Badges Section */}
      <BadgesSection />

      {/* Status Section */}
      <StatusSection />

      {/* Product Cards Section */}
      <ProductCardsSection />

      {/* Modal Section */}
      <ModalSection />

      {/* Color Palette Section */}
      <ColorPaletteSection />
    </div>
  );
}
