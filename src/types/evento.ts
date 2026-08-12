export type Categoria = 
  | "musica"
  | "infantil"
  | "religioso"
  | "tradicional"
  | "deportivo"
  | "cultural"
  | "taurino"
  | "otro";

export type Momento = "manana" | "tarde" | "noche";

export interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  hora: string;
  lugar: string;
  categoria: Categoria;
  momento: Momento;
  dia: number;
  mes: number;
  anio: number;
  organizador?: string;
  // Evolución a agenda de ocio (post-fiestas): campos opcionales.
  // Fecha/hora de fin para eventos con rango (exposiciones, ciclos...).
  diaFin?: number;
  mesFin?: number;
  anioFin?: number;
  horaFin?: string;
  // Metadatos de venta e información.
  precio?: string;
  url?: string;
  urlOrigen?: string;
  imagen?: string;
  etiquetas?: string[];
  fuente?: string;
  todoDia?: boolean;
  estado?: "publicado" | "borrador";
}

export interface DiaFiesta {
  id: string;
  nombre: string;
  fecha: string;
  dia: number;
  mes: number;
  anio: number;
  eventos: Evento[];
}
