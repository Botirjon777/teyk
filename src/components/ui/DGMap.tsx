"use client";

import React, { useEffect, useRef, useState } from "react";
import { load2gisMaps } from "@/lib/dgmaps";

interface DGMapProps {
  center: [number, number]; // [longitude, latitude]
  zoom: number;
  markers?: Array<{
    coordinates: [number, number];
    html?: string;
    onClick?: () => void;
    isUserLocation?: boolean;
    isSelected?: boolean;
  }>;
  style?: React.CSSProperties;
  className?: string;
  onMapLoad?: (map: any) => void;
}

const DGMap: React.FC<DGMapProps> = ({
  center,
  zoom,
  markers = [],
  style,
  className,
  onMapLoad,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mapInstance: any;

    load2gisMaps()
      .then((mapgl) => {
        if (!mapContainerRef.current) return;

        mapInstance = new mapgl.Map(mapContainerRef.current, {
          center: center,
          zoom: zoom,
          key: "94f4216a-411c-4acd-b9ad-47eb23ba467f",
        });

        mapRef.current = mapInstance;
        setIsLoaded(true);

        if (onMapLoad) {
          onMapLoad(mapInstance);
        }
      })
      .catch((err) => {
        console.error("Failed to initialize 2gis map:", err);
      });

    return () => {
      if (mapInstance) {
        mapInstance.destroy();
      }
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    load2gisMaps().then((mapgl) => {
      // Clear existing markers
      markersRef.current.forEach((m) => m.destroy());
      markersRef.current = [];

      // Add new markers
      markers.forEach((markerData) => {
        // Create marker element
        const markerElement = document.createElement("div");

        if (markerData.isUserLocation) {
          // User location marker - pulsing blue dot
          markerElement.innerHTML = `
            <div style="position: relative;">
              <div style="position: absolute; inset: 0; width: 48px; height: 48px; transform: translate(-50%, -50%); left: 50%; top: 50%;">
                <div style="position: absolute; inset: 0; background: #007B6A; border-radius: 50%; opacity: 0.3; animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              </div>
              <div style="position: relative; width: 24px; height: 24px; background: #007B6A; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border: 3px solid white; transform: translate(-50%, -50%);">
                <div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
              </div>
            </div>
          `;
        } else {
          // Shop marker
          const bgColor = markerData.isSelected ? "#FFC107" : "#007B6A";
          const scale = markerData.isSelected ? "1.25" : "1";
          markerElement.innerHTML = `
            <div style="width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border: 2px solid white; background: ${bgColor}; transform: scale(${scale}); transition: all 0.2s; cursor: pointer;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          `;
        }

        const marker = new mapgl.HtmlMarker(mapRef.current, {
          coordinates: markerData.coordinates,
          html: markerElement,
        });

        if (markerData.onClick) {
          markerElement.addEventListener("click", markerData.onClick);
        }

        markersRef.current.push(marker);
      });
    });
  }, [isLoaded, markers]);

  // Update center and zoom
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;
    mapRef.current.setCenter(center);
    mapRef.current.setZoom(zoom);
  }, [center, zoom, isLoaded]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "100%",
        touchAction: "pan-y pinch-zoom",
        ...style,
      }}
      className={className}
    />
  );
};

export default DGMap;
