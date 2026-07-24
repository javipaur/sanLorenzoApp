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
