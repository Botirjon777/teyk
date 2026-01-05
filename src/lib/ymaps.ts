import React from "react";
import ReactDOM from "react-dom";

declare global {
  interface Window {
    ymaps3: any;
  }
}

let ymapsPromise: Promise<any> | null = null;

export async function loadYandexMaps() {
  if (ymapsPromise) return ymapsPromise;

  ymapsPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve(null);
      return;
    }

    // Wait for ymaps3 to be available
    const checkYmaps = setInterval(() => {
      if (window.ymaps3) {
        clearInterval(checkYmaps);

        Promise.all([
          window.ymaps3.import("@yandex/ymaps3-reactify"),
          window.ymaps3.ready,
        ])
          .then(([ymaps3React]) => {
            const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
            const {
              YMap,
              YMapDefaultSchemeLayer,
              YMapDefaultFeaturesLayer,
              YMapMarker,
              YMapControls,
              YMapControlButton,
            } = reactify.module(window.ymaps3);

            resolve({
              reactify,
              YMap,
              YMapDefaultSchemeLayer,
              YMapDefaultFeaturesLayer,
              YMapMarker,
              YMapControls,
              YMapControlButton,
              ymaps3: window.ymaps3,
            });
          })
          .catch(reject);
      }
    }, 100);

    // Timeout after 10 seconds
    setTimeout(() => {
      clearInterval(checkYmaps);
      reject(new Error("Yandex Maps failed to load"));
    }, 10000);
  });

  return ymapsPromise;
}
