export interface Shop {
  id: number;
  name: string;
  brand: string;
  address: string;
  city: string;
  region: string;
  coordinates: [number, number]; // [longitude, latitude]
  phone: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  amenities: string[];
  rating: number;
  image?: string;
}

export const SHOPS: Shop[] = [
  // Tashkent - Coffelitto
  {
    id: 1,
    name: "Coffelitto - Amir Temur",
    brand: "Coffelitto",
    address: "Amir Temur Avenue 107, Tashkent",
    city: "Tashkent",
    region: "Tashkent",
    coordinates: [69.240562, 41.311081],
    phone: "+998 71 123 4567",
    hours: {
      weekdays: "08:00 - 22:00",
      weekends: "09:00 - 23:00",
    },
    amenities: ["WiFi", "Outdoor Seating", "Takeaway", "Delivery"],
    rating: 4.5,
  },
  {
    id: 2,
    name: "Coffelitto - Chilanzar",
    brand: "Coffelitto",
    address: "Chilanzar 9, Tashkent",
    city: "Tashkent",
    region: "Tashkent",
    coordinates: [69.203422, 41.275568],
    phone: "+998 71 234 5678",
    hours: {
      weekdays: "08:00 - 22:00",
      weekends: "09:00 - 23:00",
    },
    amenities: ["WiFi", "Parking", "Takeaway", "Delivery"],
    rating: 4.3,
  },
  {
    id: 3,
    name: "Coffelitto - Yunusabad",
    brand: "Coffelitto",
    address: "Yunusabad 4, Tashkent",
    city: "Tashkent",
    region: "Tashkent",
    coordinates: [69.289321, 41.337401],
    phone: "+998 71 345 6789",
    hours: {
      weekdays: "08:00 - 22:00",
      weekends: "09:00 - 23:00",
    },
    amenities: ["WiFi", "Outdoor Seating", "Takeaway"],
    rating: 4.6,
  },

  // Tashkent - Starbucks
  {
    id: 4,
    name: "Starbucks - Tashkent City",
    brand: "Starbucks",
    address: "Tashkent City Mall, Tashkent",
    city: "Tashkent",
    region: "Tashkent",
    coordinates: [69.279321, 41.327401],
    phone: "+998 71 456 7890",
    hours: {
      weekdays: "07:00 - 23:00",
      weekends: "08:00 - 00:00",
    },
    amenities: ["WiFi", "Parking", "Outdoor Seating", "Takeaway", "Drive-thru"],
    rating: 4.7,
  },
  {
    id: 5,
    name: "Starbucks - Mirzo Ulugbek",
    brand: "Starbucks",
    address: "Mirzo Ulugbek District, Tashkent",
    city: "Tashkent",
    region: "Tashkent",
    coordinates: [69.334015, 41.314556],
    phone: "+998 71 567 8901",
    hours: {
      weekdays: "07:00 - 23:00",
      weekends: "08:00 - 00:00",
    },
    amenities: ["WiFi", "Parking", "Takeaway"],
    rating: 4.5,
  },

  // Tashkent - Coffee House
  {
    id: 6,
    name: "Coffee House - Samarkand Darvoza",
    brand: "Coffee House",
    address: "Samarkand Darvoza, Tashkent",
    city: "Tashkent",
    region: "Tashkent",
    coordinates: [69.250562, 41.321081],
    phone: "+998 71 678 9012",
    hours: {
      weekdays: "08:00 - 21:00",
      weekends: "09:00 - 22:00",
    },
    amenities: ["WiFi", "Outdoor Seating", "Takeaway"],
    rating: 4.2,
  },

  // Fergana - Coffelitto
  {
    id: 7,
    name: "Coffelitto - Fergana Center",
    brand: "Coffelitto",
    address: "Al-Fergani Street 12, Fergana",
    city: "Fergana",
    region: "Fergana",
    coordinates: [71.784569, 40.383333],
    phone: "+998 73 123 4567",
    hours: {
      weekdays: "08:00 - 22:00",
      weekends: "09:00 - 23:00",
    },
    amenities: ["WiFi", "Outdoor Seating", "Takeaway", "Delivery"],
    rating: 4.4,
  },
  {
    id: 8,
    name: "Coffelitto - Fergana Mall",
    brand: "Coffelitto",
    address: "Mustaqillik Avenue 45, Fergana",
    city: "Fergana",
    region: "Fergana",
    coordinates: [71.771234, 40.391234],
    phone: "+998 73 234 5678",
    hours: {
      weekdays: "08:00 - 22:00",
      weekends: "09:00 - 23:00",
    },
    amenities: ["WiFi", "Parking", "Takeaway"],
    rating: 4.3,
  },

  // Samarkand - Starbucks
  {
    id: 9,
    name: "Starbucks - Registan",
    brand: "Starbucks",
    address: "Near Registan Square, Samarkand",
    city: "Samarkand",
    region: "Samarkand",
    coordinates: [66.975463, 39.65481],
    phone: "+998 66 123 4567",
    hours: {
      weekdays: "07:00 - 23:00",
      weekends: "08:00 - 00:00",
    },
    amenities: ["WiFi", "Outdoor Seating", "Takeaway", "Historical View"],
    rating: 4.8,
  },
  {
    id: 10,
    name: "Coffee House - Samarkand Center",
    brand: "Coffee House",
    address: "Rudaki Avenue 15, Samarkand",
    city: "Samarkand",
    region: "Samarkand",
    coordinates: [66.959876, 39.627123],
    phone: "+998 66 234 5678",
    hours: {
      weekdays: "08:00 - 21:00",
      weekends: "09:00 - 22:00",
    },
    amenities: ["WiFi", "Parking", "Takeaway"],
    rating: 4.1,
  },

  // Bukhara - Coffee House
  {
    id: 11,
    name: "Coffee House - Bukhara Old City",
    brand: "Coffee House",
    address: "Bahouddin Naqshband Street, Bukhara",
    city: "Bukhara",
    region: "Bukhara",
    coordinates: [64.421234, 39.768234],
    phone: "+998 65 123 4567",
    hours: {
      weekdays: "08:00 - 21:00",
      weekends: "09:00 - 22:00",
    },
    amenities: ["WiFi", "Outdoor Seating", "Takeaway", "Historical Setting"],
    rating: 4.6,
  },

  // Namangan - Coffelitto
  {
    id: 12,
    name: "Coffelitto - Namangan Plaza",
    brand: "Coffelitto",
    address: "Uychi Street 23, Namangan",
    city: "Namangan",
    region: "Namangan",
    coordinates: [71.672559, 40.997614],
    phone: "+998 69 123 4567",
    hours: {
      weekdays: "08:00 - 22:00",
      weekends: "09:00 - 23:00",
    },
    amenities: ["WiFi", "Parking", "Takeaway", "Delivery"],
    rating: 4.2,
  },
  {
    id: 13,
    name: "Starbucks - Namangan Park",
    brand: "Starbucks",
    address: "Navoi Street 67, Namangan",
    city: "Namangan",
    region: "Namangan",
    coordinates: [71.64321, 41.004567],
    phone: "+998 69 234 5678",
    hours: {
      weekdays: "07:00 - 23:00",
      weekends: "08:00 - 00:00",
    },
    amenities: ["WiFi", "Outdoor Seating", "Takeaway"],
    rating: 4.4,
  },

  // Andijan - Coffee House
  {
    id: 14,
    name: "Coffee House - Andijan Center",
    brand: "Coffee House",
    address: "Bobur Avenue 34, Andijan",
    city: "Andijan",
    region: "Andijan",
    coordinates: [72.344376, 40.782778],
    phone: "+998 74 123 4567",
    hours: {
      weekdays: "08:00 - 21:00",
      weekends: "09:00 - 22:00",
    },
    amenities: ["WiFi", "Parking", "Takeaway"],
    rating: 4.0,
  },
];

// Helper functions
export function getShopById(id: number): Shop | undefined {
  return SHOPS.find((shop) => shop.id === id);
}

export function getShopsByCity(city: string): Shop[] {
  return SHOPS.filter((shop) => shop.city === city);
}

export function getShopsByBrand(brand: string): Shop[] {
  return SHOPS.filter((shop) => shop.brand === brand);
}

export function getAllCities(): string[] {
  return Array.from(new Set(SHOPS.map((shop) => shop.city)));
}

export function getAllBrands(): string[] {
  return Array.from(new Set(SHOPS.map((shop) => shop.brand)));
}
