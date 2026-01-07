/**
 * Geolocation and distance calculation utilities
 */

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param coord1 [longitude, latitude]
 * @param coord2 [longitude, latitude]
 * @returns distance in kilometers
 */
export function calculateDistance(
    coord1: [number, number],
    coord2: [number, number]
): number {
    const R = 6371; // Earth's radius in km
    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
}

/**
 * Calculate travel time estimates
 * @param distance Distance in kilometers
 * @returns Object with walking and driving time in minutes
 */
export function calculateTravelTime(distance: number): {
    walkingMinutes: number;
    drivingMinutes: number;
} {
    const WALKING_SPEED_KMH = 5; // Average walking speed
    const DRIVING_SPEED_KMH = 30; // Average city driving speed with traffic

    return {
        walkingMinutes: Math.round((distance / WALKING_SPEED_KMH) * 60),
        drivingMinutes: Math.round((distance / DRIVING_SPEED_KMH) * 60),
    };
}

/**
 * Format time in minutes to human-readable string
 */
export function formatTime(minutes: number): string {
    if (minutes < 1) return "< 1 min";
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

/**
 * Get user's current location using browser geolocation API
 */
export function getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by your browser"));
            return;
        }

        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        });
    });
}

/**
 * Watch user's location for continuous updates
 */
export function watchLocation(
    onSuccess: (position: GeolocationPosition) => void,
    onError: (error: GeolocationPositionError) => void
): number {
    if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by your browser");
    }

    return navigator.geolocation.watchPosition(onSuccess, onError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000, // Cache position for 30 seconds
    });
}
