"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Evento } from "@/types/evento";
import { lugares, zonas, getLugarByNombre, getGoogleMapsUrl, getZonaById } from "@/data/zonas";

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
  const circlesRef = useRef<L.Circle[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [42.1360, -0.4089],
      zoom: 14,
      zoomControl: true,
    });

    // CartoDB Positron - fondo blanco y limpio
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
      subdomains: "abcd",
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Dibujar zonas como círculos semitransparentes (solo las que tienen eventos)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    circlesRef.current.forEach((c) => c.remove());
    circlesRef.current = [];

    const zonaCentros: Record<string, { lat: number; lng: number; radio: number }> = {
      "centro":             { lat: 42.1358, lng: -0.4085, radio: 200 },
      "coso-bajo":          { lat: 42.1353, lng: -0.4073, radio: 150 },
      "coso-alto":          { lat: 42.1344, lng: -0.4053, radio: 150 },
      "san-lorenzo":        { lat: 42.1343, lng: -0.4062, radio: 200 },
      "santiago":           { lat: 42.1315, lng: -0.4035, radio: 150 },
      "encarnacion":        { lat: 42.1305, lng: -0.4020, radio: 150 },
      "maria-auxiliadora":  { lat: 42.1290, lng: -0.4030, radio: 150 },
      "santo-domingo":      { lat: 42.1330, lng: -0.4058, radio: 150 },
      "perpetuo-socorro":   { lat: 42.1330, lng: -0.4040, radio: 150 },
      "universidad":        { lat: 42.1395, lng: -0.4115, radio: 180 },
      "plaza-toros":        { lat: 42.1385, lng: -0.4120, radio: 120 },
      "palacio-congresos":  { lat: 42.1390, lng: -0.4135, radio: 120 },
      "europa":             { lat: 42.1348, lng: -0.4112, radio: 150 },
      "walqa":              { lat: 42.1078, lng: -0.4572, radio: 300 },
      "extrarradio":        { lat: 42.1310, lng: -0.4010, radio: 150 },
    };

    // Zonas que tienen al menos un evento en la lista filtrada
    const zonasConEventos = new Set<string>();
    eventos.forEach((e) => {
      const lugar = getLugarByNombre(e.lugar);
      if (lugar) zonasConEventos.add(lugar.zona);
    });

    zonas.forEach((zona) => {
      const c = zonaCentros[zona.id];
      if (!c) return;

      const tieneEventos = zonasConEventos.has(zona.id);
      const isVisible = (!filtroZona || filtroZona === zona.id) && tieneEventos;

      const circle = L.circle([c.lat, c.lng], {
        radius: c.radio,
        fillColor: zona.color,
        fillOpacity: isVisible ? 0.15 : 0,
        color: zona.color,
        weight: isVisible ? 2 : 0,
        opacity: isVisible ? 0.5 : 0,
      }).addTo(map);

      circlesRef.current.push(circle);
    });
  }, [eventos, filtroZona]);

  // Dibujar marcadores de eventos
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

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

    const eventosPorLugar = new Map<string, Evento[]>();
    eventosFiltrados.forEach((evento) => {
      const lugar = getLugarByNombre(evento.lugar);
      const key = lugar?.id || evento.lugar;
      if (!eventosPorLugar.has(key)) {
        eventosPorLugar.set(key, []);
      }
      eventosPorLugar.get(key)!.push(evento);
    });

    eventosPorLugar.forEach((eventosEnLugar, lugarKey) => {
      const lugar = lugares.find((l) => l.id === lugarKey);
      if (!lugar) return;

      const zona = getZonaById(lugar.zona);

      const icon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            background-color: ${zona?.color || '#007a5a'};
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 13px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.25);
            border: 2.5px solid white;
          ">
            ${eventosEnLugar.length}
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const marker = L.marker([lugar.lat, lugar.lng], { icon }).addTo(map);

      const popupContent = `
        <div style="min-width: 200px; max-width: 300px; font-family: system-ui, sans-serif;">
          <h3 style="font-weight: 700; font-size: 14px; margin: 0 0 2px; color: ${zona?.color || '#007a5a'};">
            ${lugar.nombre}
          </h3>
          <p style="font-size: 11px; color: #888; margin: 0 0 8px;">
            ${zona?.nombre || ''}
          </p>
          <div style="max-height: 180px; overflow-y: auto;">
            ${eventosEnLugar.slice(0, 5).map((e) => `
              <div style="padding: 4px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px;">
                <span style="color: ${zona?.color || '#007a5a'}; font-weight: 600;">${e.hora}</span>
                <span style="color: #333;">${e.titulo}</span>
              </div>
            `).join('')}
            ${eventosEnLugar.length > 5 ? `
              <p style="font-size: 11px; color: #aaa; margin: 4px 0 0;">
                +${eventosEnLugar.length - 5} más
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
              padding: 5px 10px;
              background-color: #007a5a;
              color: white;
              border-radius: 6px;
              font-size: 11px;
              font-weight: 600;
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
      className="w-full h-full rounded-xl overflow-hidden"
      style={{
        zIndex: 0,
        border: "1px solid var(--color-borde)",
      }}
    />
  );
}
