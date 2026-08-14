"use client";

export default function AbrirFeedback() {
  return (
    <button
      type="button"
      className="feedback-btn-primary"
      onClick={() => window.dispatchEvent(new CustomEvent("feedback:abrir"))}
    >
      Enviar sugerencia o aporte
    </button>
  );
}
