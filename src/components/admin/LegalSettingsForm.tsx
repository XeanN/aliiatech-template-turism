"use client";

import { FileText, Loader2, UploadCloud, X } from "lucide-react";
import { useActionState, useRef, useState } from "react";

import {
  updateLegalSettings,
  type LegalSettingsState,
} from "@/lib/actions/legal-settings";
import type { LegalDocument, LegalDocumentMode } from "@/lib/legal-document";

const inputClass =
  "rounded-md border border-neutral-300 bg-white px-3 py-2 text-base font-normal text-neutral-900 outline-none focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

const initialState: LegalSettingsState = {};

function termsTemplate(name: string) {
  return `Al comprar en ${name}, aceptas estas condiciones:

- Los precios están en soles (S/) y pueden cambiar sin previo aviso.
- Los pedidos se confirman por WhatsApp una vez coordinado el pago.
- El tiempo de entrega y las zonas de envío se coordinan directamente contigo al momento de tu pedido.
- Nos reservamos el derecho de cancelar un pedido si el producto ya no está disponible, avisándote de inmediato.`;
}

function privacyTemplate(name: string) {
  return `${name} recopila tu nombre, teléfono y dirección únicamente para procesar y entregar tu pedido.

No compartimos tus datos con terceros para fines de marketing. Si quieres que eliminemos tu información, escríbenos por WhatsApp y lo haremos a la brevedad.`;
}

function cookiesTemplate(name: string) {
  return `Esta tienda usa cookies esenciales para el funcionamiento del carrito de compras y tu sesión de navegación.

No usamos cookies de seguimiento de terceros, salvo que ${name} haya activado herramientas de marketing (como Facebook Pixel o Google Tag Manager) en su configuración — en ese caso, esas herramientas pueden instalar sus propias cookies sujetas a las políticas de Meta o Google.`;
}

const MODE_LABELS: Record<LegalDocumentMode, string> = {
  text: "Escribir texto",
  file: "Subir archivo",
  link: "Pegar link",
};

function LegalField({
  name,
  label,
  description,
  initialValue,
  template,
}: {
  name: string;
  label: string;
  description: string;
  initialValue: LegalDocument | null;
  template: string;
}) {
  const [mode, setMode] = useState<LegalDocumentMode>(
    initialValue?.mode ?? "text",
  );
  const [text, setText] = useState(
    !initialValue || initialValue.mode === "text" ? initialValue?.content ?? "" : "",
  );
  const [fileUrl, setFileUrl] = useState(
    initialValue?.mode === "file" ? initialValue.content : "",
  );
  const [linkUrl, setLinkUrl] = useState(
    initialValue?.mode === "link" ? initialValue.content : "",
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const content = mode === "text" ? text : mode === "file" ? fileUrl : linkUrl;
  const payload = JSON.stringify({ mode, content });
  const fileName = fileUrl ? decodeURIComponent(fileUrl.split("/").pop() ?? "archivo") : "";

  // Mock — en el repo real esto sube a Vercel Blob (@vercel/blob/client,
  // ver src/components/admin/LegalSettingsForm.tsx del repo principal).
  // Acá simula la subida con un delay y un nombre de archivo de mentira,
  // sin credenciales de storage real.
  async function handleFile(file: File) {
    setUploadError(null);
    const isDoc =
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    if (!isDoc) {
      setUploadError("Selecciona un archivo PDF o Word");
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setUploadError("El archivo es muy pesado. El máximo permitido es 5MB.");
      return;
    }
    setIsUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setFileUrl(`#mock-upload/${encodeURIComponent(file.name)}`);
    setIsUploading(false);
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-5 dark:border-neutral-800">
      <input type="hidden" name={name} value={payload} />

      <div className="flex items-center justify-between gap-3">
        <p className="font-medium">{label}</p>
        {mode === "text" && (
          <button
            type="button"
            onClick={() => setText(template)}
            className="shrink-0 rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            Usar plantilla de ejemplo
          </button>
        )}
      </div>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        {description}
      </p>

      <div className="flex w-fit gap-1 rounded-md border border-neutral-200 p-1 dark:border-neutral-800">
        {(["text", "file", "link"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setMode(option)}
            className={`rounded px-3 py-1 text-xs font-medium ${
              mode === option
                ? "bg-violet-600 text-white"
                : "text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            }`}
          >
            {MODE_LABELS[option]}
          </button>
        ))}
      </div>

      {mode === "text" && (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          maxLength={5000}
          placeholder="Vacío por ahora — usa la plantilla de ejemplo o escribe la tuya."
          className={inputClass}
        />
      )}

      {mode === "file" && (
        <div className="flex flex-col gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
              e.target.value = "";
            }}
          />
          {fileUrl ? (
            <div className="flex items-center gap-3">
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
              >
                <FileText className="h-4 w-4" />
                {fileName}
              </a>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
              >
                Reemplazar
              </button>
              <button
                type="button"
                onClick={() => setFileUrl("")}
                className="flex items-center gap-1 rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-red-400 dark:hover:bg-neutral-800"
              >
                <X className="h-3.5 w-3.5" />
                Quitar
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-neutral-300 px-4 py-8 text-sm text-neutral-500 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-900"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Subiendo...
                </>
              ) : (
                <>
                  <UploadCloud className="h-6 w-6" />
                  <span>Haz click para subir un PDF o Word</span>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500">
                    Máximo 5MB
                  </span>
                </>
              )}
            </button>
          )}
          {uploadError && (
            <p className="text-sm text-red-600" role="alert">
              {uploadError}
            </p>
          )}
        </div>
      )}

      {mode === "link" && (
        <input
          type="url"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          placeholder="https://... (ej. un Google Doc o documento ya publicado)"
          className={inputClass}
        />
      )}
    </div>
  );
}

export function LegalSettingsForm({
  tenantName,
  legalTerms,
  legalPrivacy,
  legalCookies,
}: {
  tenantName: string;
  legalTerms: LegalDocument | null;
  legalPrivacy: LegalDocument | null;
  legalCookies: LegalDocument | null;
}) {
  const [state, formAction, isPending] = useActionState(
    updateLegalSettings,
    initialState,
  );

  return (
    <form action={formAction} className="flex max-w-lg flex-col gap-6">
      <LegalField
        name="legalTerms"
        label="Términos y Condiciones"
        description="Condiciones de venta de tu tienda: precios, pedidos, envíos, cancelaciones."
        initialValue={legalTerms}
        template={termsTemplate(tenantName)}
      />

      <LegalField
        name="legalPrivacy"
        label="Política de Privacidad"
        description="Qué datos de tus clientes recopilas y para qué los usas."
        initialValue={legalPrivacy}
        template={privacyTemplate(tenantName)}
      />

      <LegalField
        name="legalCookies"
        label="Política de Cookies"
        description="Qué cookies usa tu tienda (carrito, sesión, y las que actives en Marketing)."
        initialValue={legalCookies}
        template={cookiesTemplate(tenantName)}
      />

      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Cada campo es opcional e independiente: escribe el texto directamente,
        sube un PDF o Word ya armado por tu abogado, o pega un link a un
        documento que ya tengas publicado (Google Docs, Notion, etc.). Si lo
        llenas, aparece como link en el pie de página de tu tienda. Estas
        plantillas son un punto de partida razonable, no asesoría legal.
      </p>

      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-sm text-emerald-600 dark:text-emerald-400">
          Cambios guardados.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded-md bg-violet-600 px-4 py-2.5 font-medium text-white hover:bg-violet-500 disabled:opacity-60"
      >
        {isPending ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
