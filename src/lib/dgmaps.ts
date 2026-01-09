declare global {
  interface Window {
    mapgl: any;
  }
}

let mapglPromise: Promise<any> | null = null;

export async function load2gisMaps() {
  if (mapglPromise) return mapglPromise;

  mapglPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve(null);
      return;
    }

    if (window.mapgl) {
      resolve(window.mapgl);
      return;
    }

    const checkMapgl = setInterval(() => {
      if (window.mapgl) {
        clearInterval(checkMapgl);
        resolve(window.mapgl);
      }
    }, 100);

    // Timeout after 10 seconds
    setTimeout(() => {
      clearInterval(checkMapgl);
      if (!window.mapgl) {
        reject(new Error("2gis Maps failed to load"));
      }
    }, 10000);
  });

  return mapglPromise;
}
