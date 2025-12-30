import Button from "./Button";

export interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  price: number;
  rating?: number;
  onAddToCart?: () => void;
  className?: string;
}

export default function ProductCard({
  image,
  name,
  description,
  price,
  rating = 0,
  onAddToCart,
  className = "",
}: ProductCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-rating-yellow">
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="text-rating-yellow">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div
      className={`bg-card-background border border-border rounded-xl overflow-hidden shadow-shadow-lg hover:shadow-shadow-md transition-all duration-300 ${className}`}
    >
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-2.5 xl:p-5">
        <h3 className="text-lg font-semibold text-primary-text mb-2 line-clamp-1">
          {name}
        </h3>

        <p className="text-sm text-secondary-text mb-3 line-clamp-2">
          {description}
        </p>

        {rating > 0 && (
          <div className="flex items-center gap-1 mb-3 text-lg">
            {renderStars(rating)}
            <span className="text-xs text-secondary-text ml-1">
              ({rating.toFixed(1)})
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-text">
            ${price.toFixed(2)}
          </span>

          {onAddToCart && (
            <Button variant="primary" size="small" onClick={onAddToCart}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
