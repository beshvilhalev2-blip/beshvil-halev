"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

export type MapStop = {
  /** מספר התחנה לפי סדר הופעתה בטבלה */
  number: number;
  name: string;
  kindLabel: string;
  lat: number;
  lng: number;
  wazeUrl: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default function HanukkahMaccabeesMap({ stops }: { stops: MapStop[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || stops.length === 0) return;

    let disposed = false;
    let map: import("leaflet").Map | undefined;

    import("leaflet").then((L) => {
      if (disposed) return;

      map = L.map(container, {
        scrollWheelZoom: false,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
      }).addTo(map);

      const bounds = L.latLngBounds([]);
      stops.forEach((stop) => {
        const icon = L.divIcon({
          className: "",
          // Inline styles so the number always shows, regardless of global CSS reloads.
          html: `<span class="hanukkah-map-pin" aria-hidden="true" style="display:flex;align-items:center;justify-content:center;width:32px;height:32px"><span style="transform:rotate(45deg);color:#fdf6e7;font:700 14px/1 var(--font-heebo),Arial,sans-serif">${stop.number}</span></span>`,
          iconSize: [32, 40],
          iconAnchor: [16, 38],
          popupAnchor: [0, -34],
        });
        const point = L.latLng(stop.lat, stop.lng);
        bounds.extend(point);
        L.marker(point, {
          icon,
          title: `תחנה ${stop.number}: ${stop.name}`,
          alt: `תחנה ${stop.number}: ${stop.name}`,
          keyboard: true,
        })
          .addTo(map!)
          .bindPopup(
            `<div dir="rtl" class="hanukkah-map-popup">
              <strong>${stop.number}. ${escapeHtml(stop.name)}</strong>
              <span>${escapeHtml(stop.kindLabel)}</span>
              <a href="${escapeHtml(stop.wazeUrl)}" target="_blank" rel="noopener noreferrer" aria-label="ניווט ב־Waze אל ${escapeHtml(stop.name)}">ניווט ב־Waze</a>
            </div>`,
          );
      });

      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 14 });
    });

    return () => {
      disposed = true;
      map?.remove();
    };
  }, [stops]);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e7dcc6] shadow-[0_12px_40px_-26px_rgba(31,59,45,0.35)] dark:border-stone-700/60">
      <div
        ref={containerRef}
        role="region"
        aria-label="מפת התחנות בטיול בעקבות המכבים"
        className="relative z-0 h-[320px] w-full bg-[#efe8d8] sm:h-[400px]"
      />
    </div>
  );
}
