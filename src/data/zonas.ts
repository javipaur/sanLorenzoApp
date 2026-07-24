export interface Zona {
  id: string;
  nombre: string;
  descripcion: string;
  color: string;
}

export interface LugaresMapa {
  id: string;
  nombre: string;
  lat: number;
  lng: number;
  zona: string;
  direccion?: string;
}

export const zonas: Zona[] = [
  { id: "centro", nombre: "Centro Histórico", descripcion: "Plaza de Navarra, Catedral, Plaza San Lorenzo", color: "#ef4444" },
  { id: "coso-bajo", nombre: "Coso Bajo", descripcion: "Coso Bajo y alrededores", color: "#3b82f6" },
  { id: "coso-alto", nombre: "Coso Alto", descripcion: "Coso Alto y Porches de Galicia", color: "#22c55e" },
  { id: "san-lorenzo", nombre: "Barrio de San Lorenzo", descripcion: "Zona de la Basílica y Plaza de San Lorenzo", color: "#8b5cf6" },
  { id: "santiago", nombre: "Barrio de Santiago", descripcion: "Calle Santo Cristo de los Milagros", color: "#f97316" },
  { id: "encarnacion", nombre: "Barrio de La Encarnación", descripcion: "Avenida Martínez de Velasco", color: "#06b6d4" },
  { id: "maria-auxiliadora", nombre: "Barrio de María Auxiliadora", descripcion: "Zona sur de la ciudad", color: "#ec4899" },
  { id: "santo-domingo", nombre: "Barrio de Santo Domingo", descripcion: "Parque San Martín", color: "#14b8a6" },
  { id: "perpetuo-socorro", nombre: "Barrio del Perpetuo Socorro", descripcion: "Parque del Encuentro", color: "#f59e0b" },
  { id: "universidad", nombre: "Zona Universidad", descripcion: "Parque Universidad", color: "#6366f1" },
  { id: "plaza-toros", nombre: "Plaza de Toros", descripcion: "Recinto taurino", color: "#dc2626" },
  { id: "palacio-congresos", nombre: "Palacio de Congresos", descripcion: "Espacio escénico exterior", color: "#7c3aed" },
  { id: "europa", nombre: "Plaza Europa", descripcion: "Zona de deportes y torneos", color: "#059669" },
  { id: "walqa", nombre: "Parque Tecnológico Walqa", descripcion: "Planetario de Aragón", color: "#0284c7" },
  { id: "extrarradio", nombre: "Extrarradio", descripcion: "Residencias y barrios periféricos", color: "#6b7280" },
];

export const lugares: LugaresMapa[] = [
  // Centro Histórico
  { id: "plaza-navarra", nombre: "Plaza de Navarra", lat: 42.1360, lng: -0.4089, zona: "centro", direccion: "Plaza de Navarra, 22002 Huesca" },
  { id: "catedral", nombre: "Catedral de Huesca", lat: 42.1364, lng: -0.4083, zona: "centro", direccion: "Plaza de la Catedral, 22001 Huesca" },
  { id: "palacio-consistorial", nombre: "Palacio Consistorial", lat: 42.1362, lng: -0.4086, zona: "centro", direccion: "Plaza de la Catedral, 22001 Huesca" },
  { id: "plaza-san-lorenzo", nombre: "Plaza de San Lorenzo", lat: 42.1347, lng: -0.4067, zona: "san-lorenzo", direccion: "Plaza de San Lorenzo, 22002 Huesca" },
  { id: "basilica-san-lorenzo", nombre: "Basílica de San Lorenzo", lat: 42.1346, lng: -0.4065, zona: "san-lorenzo", direccion: "Plaza de San Lorenzo, 22002 Huesca" },
  { id: "plaza-general-alsina", nombre: "Plaza General Alsina", lat: 42.1355, lng: -0.4078, zona: "centro", direccion: "Plaza General Alsina, 22002 Huesca" },
  { id: "plaza-luis-lopez-allue", nombre: "Plaza Luis López Allué", lat: 42.1358, lng: -0.4095, zona: "centro", direccion: "Plaza Luis López Allué, 22002 Huesca" },
  { id: "plaza-fueros-aragon", nombre: "Plaza de los Fueros de Aragón", lat: 42.1352, lng: -0.4082, zona: "centro", direccion: "Plaza de los Fueros de Aragón, 22002 Huesca" },
  { id: "plaza-europa", nombre: "Plaza Europa", lat: 42.1348, lng: -0.4112, zona: "europa", direccion: "Plaza Europa, 22002 Huesca" },
  { id: "plaza-san-antonio", nombre: "Plaza de San Antonio", lat: 42.1338, lng: -0.4058, zona: "san-lorenzo", direccion: "Plaza de San Antonio, 22002 Huesca" },
  { id: "plaza-inmaculada", nombre: "Plaza de la Inmaculada", lat: 42.1350, lng: -0.4072, zona: "centro", direccion: "Plaza de la Inmaculada, 22002 Huesca" },
  { id: "plaza-santo-domingo", nombre: "Plaza Santo Domingo", lat: 42.1335, lng: -0.4062, zona: "santo-domingo", direccion: "Plaza Santo Domingo, 22002 Huesca" },
  { id: "plaza-justicia", nombre: "Plaza del Justicia", lat: 42.1342, lng: -0.4075, zona: "centro", direccion: "Plaza del Justicia, 22002 Huesca" },

  // Coso
  { id: "coso-bajo", nombre: "Coso Bajo", lat: 42.1353, lng: -0.4073, zona: "coso-bajo", direccion: "Coso Bajo, 22002 Huesca" },
  { id: "coso-alto", nombre: "Coso Alto", lat: 42.1345, lng: -0.4055, zona: "coso-alto", direccion: "Coso Alto, 22002 Huesca" },
  { id: "porches-galicia", nombre: "Porches de Galicia", lat: 42.1343, lng: -0.4050, zona: "coso-alto", direccion: "Porches de Galicia, 22002 Huesca" },

  // Parques
  { id: "parque-servet", nombre: "Parque Miguel Servet", lat: 42.1375, lng: -0.4098, zona: "centro", direccion: "Parque Miguel Servet, 22002 Huesca" },
  { id: "parque-universidad", nombre: "Parque Universidad", lat: 42.1395, lng: -0.4115, zona: "universidad", direccion: "Parque Universidad, 22002 Huesca" },
  { id: "parque-encuentro", nombre: "Parque del Encuentro", lat: 42.1330, lng: -0.4040, zona: "perpetuo-socorro", direccion: "Parque del Encuentro, Barrio Perpetuo Socorro, 22002 Huesca" },
  { id: "parque-san-martin", nombre: "Parque San Martín", lat: 42.1325, lng: -0.4055, zona: "santo-domingo", direccion: "Parque San Martín, Barrio de Santo Domingo, 22002 Huesca" },
  { id: "parque-walqa", nombre: "Parque Tecnológico Walqa", lat: 42.0950, lng: -0.3850, zona: "walqa", direccion: "Parque Tecnológico Walqa, Carretera de Barbastre, km 1, 22197 Huesca" },

  // Equipamientos
  { id: "plaza-toros", nombre: "Plaza de Toros", lat: 42.1385, lng: -0.4120, zona: "plaza-toros", direccion: "Plaza de Toros, 22003 Huesca" },
  { id: "palacio-congresos", nombre: "Palacio de Congresos", lat: 42.1390, lng: -0.4135, zona: "palacio-congresos", direccion: "Palacio de Congresos de Huesca, Avenida de la Constitución, 22002 Huesca" },

  // Barrios
  { id: "barrio-santiago", nombre: "Barrio de Santiago", lat: 42.1315, lng: -0.4035, zona: "santiago", direccion: "Calle Santo Cristo de los Milagros, Barrio de Santiago, 22002 Huesca" },
  { id: "barrio-encarnacion", nombre: "Barrio de La Encarnación", lat: 42.1305, lng: -0.4020, zona: "encarnacion", direccion: "Avenida Martínez de Velasco, Barrio de La Encarnación, 22002 Huesca" },
  { id: "barrio-maria-auxiliadora", nombre: "Barrio de María Auxiliadora", lat: 42.1290, lng: -0.4030, zona: "maria-auxiliadora", direccion: "Calle Alcalde Emilio Miravé, Barrio de María Auxiliadora, 22002 Huesca" },

  // Extrarradio
  { id: "colegio-salesianos", nombre: "Colegio Salesianos San Bernardo", lat: 42.1310, lng: -0.4010, zona: "extrarradio", direccion: "Colegio Salesianos San Bernardo, 22002 Huesca" },
  { id: "casa-aisa", nombre: "Casa Aísa", lat: 42.1368, lng: -0.4105, zona: "centro", direccion: "Casa Aísa, Huesca" },
  { id: "restaurante-olla", nombre: "Restaurante La Olla", lat: 42.1372, lng: -0.4110, zona: "centro", direccion: "Restaurante La Olla de Huesca" },
];

export function getGoogleMapsUrl(direccion: string): string {
  const encoded = encodeURIComponent(direccion);
  return `https://www.google.com/maps/search/?api=1&query=${encoded}`;
}

export function getZonaById(id: string): Zona | undefined {
  return zonas.find((z) => z.id === id);
}

export function getLugarByNombre(nombre: string): LugaresMapa | undefined {
  // Buscar coincidencia exacta o parcial
  const normalizado = nombre.toLowerCase().trim();
  
  // Buscar coincidencia exacta
  const exacto = lugares.find((l) => l.nombre.toLowerCase() === normalizado);
  if (exacto) return exacto;
  
  // Buscar coincidencia parcial
  const parcial = lugares.find((l) => 
    normalizado.includes(l.nombre.toLowerCase()) || 
    l.nombre.toLowerCase().includes(normalizado)
  );
  if (parcial) return parcial;

  // Buscar por zona en el nombre
  for (const lugar of lugares) {
    if (normalizado.includes(lugar.zona)) return lugar;
  }

  return undefined;
}

export function getZonaByLugar(nombreLugar: string): string {
  const lugar = getLugarByNombre(nombreLugar);
  return lugar?.zona || "centro";
}
