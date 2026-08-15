import { eventos } from "./eventos";

export interface Destacado {
  eventoId: string;
  comentario: string;
}

// Selección editorial: lo que no hay que dejar escapar cada día.
// Los eventoId deben existir en data/eventos.ts.
export const destacadosPorDia: Record<string, Destacado[]> = {
  prelaurentis: [
    {
      eventoId: "pre-11",
      comentario: "Concierto de la Banda de Música en la plaza, para ir calentando motores.",
    },
    {
      eventoId: "pre-13",
      comentario: "Prelaurentis Peñista: las peñas adelantan la noche grande con Fundadores Manacor.",
    },
    {
      eventoId: "pre-18",
      comentario: "La presentación de las Mairalesas, el pistoletazo que anuncia que llegan las fiestas.",
    },
  ],
  portico: [
    {
      eventoId: "pt-15",
      comentario: "Capazo Night Live en la Plaza General Alsina: música en directo y ambiente en la calle.",
    },
    {
      eventoId: "pt-16",
      comentario: "\u201CVen a bailar la Jota de San Lorenzo\u201D. Si la jota es tuya, aquí se decide.",
    },
    {
      eventoId: "pt-23",
      comentario: "El reparto del pan de San Lorenzo en la Plaza de Navarra: toda la ciudad pasa por ahí.",
    },
  ],
  "9": [
    {
      eventoId: "9-5",
      comentario: "El cohete anunciador desde el balcón del Ayuntamiento. Llega pronto: la Plaza de Navarra se llena.",
    },
    {
      eventoId: "9-12",
      comentario: "La primera salida de Gigantes y Cabezudos. Si vienes con niños, es el momento.",
    },
    {
      eventoId: "9-15",
      comentario: "Primera verbena de la semana en la Plaza López Allué, con la Orquesta Centauro.",
    },
    {
      eventoId: "9-25",
      comentario: "Cierre de la primera noche a las tres de la madrugada en el Palacio de Congresos, si aguantas.",
    },
  ],
  "10": [
    {
      eventoId: "10-4",
      comentario: "Los Danzantes de Huesca a las 8:30 en la Plaza de San Lorenzo. Lo más emocionante de la fiesta.",
    },
    {
      eventoId: "10-6",
      comentario: "La Solemne Procesión de San Lorenzo. El día grande se vive desde temprano.",
    },
    {
      eventoId: "10-32",
      comentario: "Los fuegos artificiales desde el Parque Universidad. Busca hueco con vistas.",
    },
    {
      eventoId: "10-38",
      comentario: "Fangoria en el Palacio de Congresos. La noche del lunes se cierra con Alaska.",
    },
  ],
  "11": [
    {
      eventoId: "11-2",
      comentario: "Suelta de vaquillas a las ocho: la Plaza de Toros se llena de ambiente al amanecer.",
    },
    {
      eventoId: "11-7",
      comentario: "El encierro infantil con la charanga Chilindrón. Los peques corren sin riesgo.",
    },
    {
      eventoId: "11-23",
      comentario: "Reberde Fest en el Parque Universidad: el concierto de la Peña Albahaca Reberde.",
    },
    {
      eventoId: "11-37",
      comentario: "Nil Moliner en el Palacio de Congresos. El concierto grande de la noche del martes.",
    },
  ],
  "12": [
    {
      eventoId: "12-8",
      comentario: "El vermú charanguero de las mañanas peñistas en la Plaza de Navarra.",
    },
    {
      eventoId: "12-20",
      comentario: "El eclipse total de Sol en Walqa, con pantalla gigante y gafas homologadas. Cita única.",
    },
    {
      eventoId: "12-18",
      comentario: "Tercera corrida: Sebastián Castella, Roca Rey y Cristiano Torres.",
    },
    {
      eventoId: "12-30",
      comentario: "Las Perseidas, lágrimas de San Lorenzo. Acaba el día mirando al cielo en Walqa.",
    },
  ],
  "13": [
    {
      eventoId: "13-5",
      comentario: "Encierro infantil con mini bueyes. La tradición para los más pequeños.",
    },
    {
      eventoId: "13-19",
      comentario: "La corrida de Victorino Martín, la más exigente de la feria para los aficionados.",
    },
    {
      eventoId: "13-27",
      comentario: "Fuegos artificiales a las once desde el Parque Universidad.",
    },
    {
      eventoId: "13-33",
      comentario: "Nacha Pop en el Palacio de Congresos. Un clásico de la música española.",
    },
  ],
  "14": [
    {
      eventoId: "14-20",
      comentario: "La Trobada de Gaiteros de Aragón recorre el centro. Solo se ve en sitios así.",
    },
    {
      eventoId: "14-19",
      comentario: "Corrida de rejones: la elegancia a caballo en la Plaza de Toros.",
    },
    {
      eventoId: "14-28",
      comentario: "Salsa Punk Orkestra en la Plaza de Navarra para bailar la penúltima noche.",
    },
    {
      eventoId: "14-31",
      comentario: "Andrés Campo cierra los conciertos grandes en el Palacio de Congresos.",
    },
  ],
  "15": [
    {
      eventoId: "15-11",
      comentario: "La Ofrenda de Flores y Frutos: Danzantes, grupos folclóricos y Huesca entera.",
    },
    {
      eventoId: "15-12",
      comentario: "La cabalgata de fin de fiestas con las peñas y sus mairalesas.",
    },
    {
      eventoId: "15-15",
      comentario: "La traca final a medianoche. Hasta el año que viene.",
    },
  ],
};

export function validarDestacados(): void {
  const ids = new Set(eventos.map((e) => e.id));
  for (const [diaId, picks] of Object.entries(destacadosPorDia)) {
    for (const pick of picks) {
      if (!ids.has(pick.eventoId)) {
        console.warn(
          `[destacados] El destacado ${pick.eventoId} (día ${diaId}) no existe en data/eventos.ts`
        );
      }
    }
  }
}
