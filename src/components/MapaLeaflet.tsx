"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Evento } from "@/types/evento";
import { lugares, getLugarByNombre, getGoogleMapsUrl, getZonaById } from "@/data/zonas";

interface MapaLeafletProps {
  eventos: Evento[];
  eventoSeleccionado?: Evento;
  filtroZona: string | null;
  filtroCategoria: string | null;
}

export default function MapaLeaflet({
  eventos,
  eventoSeleccionado,
  filtroZona,
  filtroCategoria,
}: MapaLeafletProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on Huesca
    const map = L.map(mapRef.current, {
      center: [42.1360, -0.4089],
      zoom: 14,
      zoomControl: true,
    });

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Filter events
    let eventosFiltrados = eventos;
    if (filtroZona) {
      eventosFiltrados = eventosFiltrados.filter((e) => {
        const lugar = getLugarByNombre(e.lugar);
        return lugar?.zona === filtroZona;
      });
    }
    if (filtroCategoria) {
      eventosFiltrados = eventosFiltrados.filter((e) => e.categoria === filtroCategoria);
    }

    // Group events by location
    const eventosPorLugar = new Map<string, Evento[]>();
    eventosFiltrados.forEach((evento) => {
      const lugar = getLugarByNombre(evento.lugar);
      const key = lugar?.id || evento.lugar;
      if (!eventosPorLugar.has(key)) {
        eventosPorLugar.set(key, []);
      }
      eventosPorLugar.get(key)!.push(evento);
    });

    // Create markers
    eventosPorLugar.forEach((eventosEnLugar, lugarKey) => {
      const lugar = lugares.find((l) => l.id === lugarKey);
      if (!lugar) return;

      const zona = getZonaById(lugar.zona);

      // Create custom icon
      const icon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            background-color: ${zona?.color || '#ef4444'};
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            border: 2px solid white;
          ">
            ${eventosEnLugar.length}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([lugar.lat, lugar.lng], { icon }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px; max-width: 300px;">
          <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 4px; color: ${zona?.color || '#ef4444'};">
            ${lugar.nombre}
          </h3>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">
            ${zona?.nombre || ''}
          </p>
          <div style="max-height: 200px; overflow-y: auto;">
            ${eventosEnLugar.slice(0, 5).map((e) => `
              <div style="padding: 4px 0; border-bottom: 1px solid #eee; font-size: 12px;">
                <span style="color: #666;">${e.hora}</span>
                <span style="font-weight: 500;">${e.titulo}</span>
              </div>
            `).join('')}
            ${eventosEnLugar.length > 5 ? `
              <p style="font-size: 11px; color: #999; margin-top: 4px;">
                +${eventosEnLugar.length - 5} eventos más
              </p>
            ` : ''}
          </div>
          <a 
            href="${getGoogleMapsUrl(lugar.direccion || lugar.nombre)}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              display: inline-block;
              margin-top: 8px;
              padding: 4px 8px;
              background-color: #3b82f6;
              color: white;
              border-radius: 4px;
              font-size: 12px;
              text-decoration: none;
            "
          >
            Cómo llegar
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);
    });

    // If there's a selected event, zoom to it
    if (eventoSeleccionado) {
      const lugar = getLugarByNombre(eventoSeleccionado.lugar);
      if (lugar) {
        map.setView([lugar.lat, lugar.lng], 16);
        const marker = markersRef.current.find((m) => {
          const pos = m.getLatLng();
          return Math.abs(pos.lat - lugar.lat) < 0.0001 && Math.abs(pos.lng - lugar.lng) < 0.0001;
        });
        if (marker) {
          marker.openPopup();
        }
      }
    }
  }, [eventos, eventoSeleccionado, filtroZona, filtroCategoria]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[500px] rounded-lg border border-gray-200"
      style={{ zIndex: 0 }}
    />
  );
}
