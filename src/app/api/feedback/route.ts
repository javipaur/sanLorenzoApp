import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const TIPOS = ["sugerencia", "mejora", "error", "otro"] as const;
type Tipo = (typeof TIPOS)[number];

const ETIQUETA_TIPO: Record<Tipo, string> = {
  sugerencia: "Sugerencia",
  mejora: "Mejora",
  error: "Error o incidencia",
  otro: "Otro",
};

function sanitize(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;
  const tipoRaw = data.tipo;
  const tipo = TIPOS.includes(tipoRaw as Tipo) ? (tipoRaw as Tipo) : "";
  const mensaje = sanitize(data.mensaje, 2000);
  const nombre = sanitize(data.nombre, 100);
  const email = sanitize(data.email, 200);
  const url = sanitize(data.url, 500);

  if (!tipo || mensaje.length < 3) {
    return NextResponse.json(
      { error: "El tipo y el mensaje son obligatorios" },
      { status: 400 }
    );
  }

  const user = process.env.SMTP_USER || process.env.EMAIL_USER || "";
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const esGmail = /@gmail\.com$/i.test(user);
  const host =
    process.env.SMTP_HOST ||
    process.env.EMAIL_SMTP_HOST ||
    (esGmail ? "smtp.gmail.com" : "");
  const port = Number(
    process.env.SMTP_PORT || process.env.EMAIL_SMTP_PORT || 587
  );
  const from = process.env.SMTP_FROM || user || "";
  const to = process.env.FEEDBACK_TO || user || "";

  if (!host || !to) {
    return NextResponse.json(
      { error: "El envío de email no está configurado" },
      { status: 500 }
    );
  }

  const asunto = `[Feedback San Lorenzo] ${nombre || "Anónimo"} — ${ETIQUETA_TIPO[tipo]}`;
  const cuerpo = [
    `Tipo: ${ETIQUETA_TIPO[tipo]}`,
    `Nombre: ${nombre || "Anónimo"}`,
    `Contacto: ${email || "—"}`,
    `Fecha: ${new Date().toLocaleString("es-ES")}`,
    `Página: ${url || "—"}`,
    "",
    "Mensaje:",
    mensaje,
    "",
    "---",
    "Enviado desde la agenda Fiestas de San Lorenzo 2026",
  ].join("\n");

  const config = {
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
  };

  try {
    const transporter = nodemailer.createTransport(config);
    await transporter.sendMail({
      from: from ? `"Fiestas San Lorenzo 2026" <${from}>` : undefined,
      to,
      subject: asunto,
      text: cuerpo,
      replyTo: email || undefined,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error enviando feedback:", error);
    return NextResponse.json(
      { error: "No se pudo enviar el feedback. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
