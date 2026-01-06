import { UserLocation } from "@/store/locationStore";

/**
 * Get user's current position using browser Geolocation API
 */
export async function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("Location permission denied"));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("Location information unavailable"));
            break;
          case error.TIMEOUT:
            reject(new Error("Location request timed out"));
            break;
          default:
            reject(new Error("An unknown error occurred"));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

/**
 * Reverse geocode coordinates to address using Yandex Geocoding API
 */
export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<{ address: string; city: string }> {
  try {
    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=4aaff061-a4fe-409d-9c0d-1452a5c030ce&geocode=${longitude},${latitude}&format=json&lang=en_US`
    );

    if (!response.ok) {
      throw new Error("Geocoding failed");
    }

    const data = await response.json();
    const geoObject =
      data.response.GeoObjectCollection.featureMember[0]?.GeoObject;

    if (!geoObject) {
      throw new Error("No address found");
    }

    const address = geoObject.metaDataProperty.GeocoderMetaData.text;
    const components =
      geoObject.metaDataProperty.GeocoderMetaData.Address.Components;

    // Find city from components
    const cityComponent = components.find(
      (c: any) => c.kind === "locality" || c.kind === "province"
    );
    const city = cityComponent?.name || "Tashkent";

    return { address, city };
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return {
      address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
      city: "Unknown",
    };
  }
}

/**
 * Get user location with address
 */
export async function getUserLocation(): Promise<UserLocation> {
  const position = await getCurrentPosition();
  const { latitude, longitude } = position.coords;

  const { address, city } = await reverseGeocode(latitude, longitude);

  return {
    latitude,
    longitude,
    address,
    city,
    timestamp: Date.now(),
  };
}
