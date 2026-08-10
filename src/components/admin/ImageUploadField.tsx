"use client";

import { Image as ImageIcon, Loader2, UploadCloud, X } from "lucide-react";
import { useRef, useState } from "react";

const inputClass =
  "rounded-md border border-neutral-300 bg-white px-3 py-2 text-base font-normal text-neutral-900 outline-none focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

// Mock — en el repo real esto sube a Vercel Blob (@vercel/blob/client,
// con recompresión a WebP antes de subir — ver
// src/components/admin/ImageUploadField.tsx del repo principal). Acá
// simula la subida con un delay, sin credenciales de storage real.
export function ImageUploadField({
  name,
  label,
  defaultValue,
  onValueChange,
  id,
  hideUrlMode,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  onValueChange?: (value: string) => void;
  id?: string;
  anonymousUploadToken?: string;
  hideUrlMode?: boolean;
}) {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [value, setValue] = useState(defaultValue ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function setAndNotify(next: string) {
    setValue(next);
    setImageError(false);
    onValueChange?.(next);
  }

  async function handleFile(file: File) {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Selecciona un archivo de imagen");
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError("El archivo es muy pesado. El máximo permitido es 5MB.");
      return;
    }
    setIsUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setAndNotify(`#mock-upload/${encodeURIComponent(file.name)}`);
    setIsUploading(false);
  }

  return (
    <div id={id} className="flex flex-col gap-2">
      <span className="text-sm font-medium">{label}</span>
      <input type="hidden" name={name} value={value} />

      {!hideUrlMode && (
        <div className="flex w-fit gap-1 rounded-md border border-neutral-200 p-1 dark:border-neutral-800">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`rounded px-3 py-1 text-xs font-medium ${
              mode === "upload"
                ? "bg-violet-600 text-white"
                : "text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            }`}
          >
            Subir archivo
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`rounded px-3 py-1 text-xs font-medium ${
              mode === "url"
                ? "bg-violet-600 text-white"
                : "text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            }`}
          >
            Pegar URL
          </button>
        </div>
      )}

      {mode === "url" && !hideUrlMode ? (
        <input
          type="url"
          placeholder="https://..."
          value={value}
          onChange={(e) => setAndNotify(e.target.value)}
          className={inputClass}
        />
      ) : (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
              e.target.value = "";
            }}
          />
          {value ? (
            <div className="flex items-center gap-3">
              {!imageError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={value}
                  alt="Vista previa"
                  onError={() => setImageError(true)}
                  className="h-20 w-20 rounded-md border border-neutral-200 object-cover dark:border-neutral-800"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-md border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
                  <ImageIcon className="h-6 w-6 text-neutral-300 dark:text-neutral-700" />
                </div>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                >
                  Reemplazar
                </button>
                <button
                  type="button"
                  onClick={() => setAndNotify("")}
                  className="flex items-center gap-1 rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-red-400 dark:hover:bg-neutral-800"
                >
                  <X className="h-3.5 w-3.5" />
                  Quitar
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (file) void handleFile(file);
              }}
              disabled={isUploading}
              className={`flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed px-4 py-8 text-sm text-neutral-500 transition-colors dark:text-neutral-400 ${
                isDragging
                  ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10"
                  : "border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Subiendo...
                </>
              ) : (
                <>
                  <UploadCloud className="h-6 w-6" />
                  <span>Arrastra una imagen o haz click para subir</span>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500">
                    1080x1080 recomendado
                  </span>
                </>
              )}
            </button>
          )}
        </>
      )}

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
