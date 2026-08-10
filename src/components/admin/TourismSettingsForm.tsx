"use client";

import { Trash2 } from "lucide-react";
import { useActionState, useState } from "react";

import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  updateTourismSettings,
  type TourismSettingsState,
} from "@/lib/actions/tourism-settings";
import { parseAboutImages } from "@/lib/about-images";
import { parseSocialLinks } from "@/lib/social-links";

// Shape mínimo (sin `@prisma/client`, ver CONTRACT.md).
type TenantLite = {
  name: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
  whatsappPhone: string | null;
  contactEmail: string | null;
  socialLinks: unknown;
  aboutText: string | null;
  aboutImages: unknown;
};

const inputClass =
  "rounded-md border border-neutral-300 bg-white px-3 py-2 text-base font-normal text-neutral-900 outline-none focus:border-emerald-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100";

const initialState: TourismSettingsState = {};

type ImageRow = { id: string; url: string };

function newImageRow(url = ""): ImageRow {
  return { id: Math.random().toString(36).slice(2), url };
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-neutral-200 p-5 dark:border-neutral-800">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        {title}
      </p>
      {children}
    </section>
  );
}

// Copia visual de src/components/admin/TourismSettingsForm.tsx.
export function TourismSettingsForm({ tenant }: { tenant: TenantLite }) {
  const [state, formAction, isPending] = useActionState(updateTourismSettings, initialState);

  const [aboutImageRows, setAboutImageRows] = useState<ImageRow[]>(() =>
    parseAboutImages(tenant.aboutImages).map((url) => newImageRow(url)),
  );
  const initialSocialLinks = parseSocialLinks(tenant.socialLinks);

  function updateAboutImageRow(id: string, url: string) {
    setAboutImageRows((current) => current.map((row) => (row.id === id ? { ...row, url } : row)));
  }
  function addAboutImageRow() {
    if (aboutImageRows.length >= 6) return;
    setAboutImageRows((current) => [...current, newImageRow()]);
  }
  function removeAboutImageRow(id: string) {
    setAboutImageRows((current) => current.filter((row) => row.id !== id));
  }
  const aboutImagesPayload = JSON.stringify(aboutImageRows.map((row) => row.url).filter(Boolean));

  return (
    <form action={formAction} className="flex max-w-lg flex-col gap-6">
      <SettingsSection title="Datos generales">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Nombre del negocio
          <input name="name" defaultValue={tenant.name} required className={inputClass} />
        </label>
      </SettingsSection>

      <SettingsSection title="Marca">
        <ImageUploadField id="logo" name="logoUrl" label="Logo" defaultValue={tenant.logoUrl} />
        <ImageUploadField name="faviconUrl" label="Favicon (opcional)" defaultValue={tenant.faviconUrl} />
      </SettingsSection>

      <SettingsSection title="Portada (home)">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Título principal
          <input
            name="heroTitle"
            defaultValue={tenant.heroTitle ?? ""}
            placeholder={tenant.name}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Subtítulo
          <textarea
            name="heroSubtitle"
            defaultValue={tenant.heroSubtitle ?? ""}
            rows={2}
            placeholder="Experiencias auténticas, diseñadas para vos."
            className={inputClass}
          />
        </label>
      </SettingsSection>

      <SettingsSection title="Contacto">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Teléfono / WhatsApp
          <input
            name="whatsappPhone"
            defaultValue={tenant.whatsappPhone ?? ""}
            placeholder="Ej. 51987654321 (con código de país)"
            required
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Email de contacto
          <input name="contactEmail" type="email" defaultValue={tenant.contactEmail ?? ""} className={inputClass} />
        </label>
      </SettingsSection>

      <SettingsSection title="Redes sociales">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Facebook
          <input
            name="facebookUrl"
            type="url"
            defaultValue={initialSocialLinks.facebook ?? ""}
            placeholder="https://facebook.com/tu-negocio"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Instagram
          <input
            name="instagramUrl"
            type="url"
            defaultValue={initialSocialLinks.instagram ?? ""}
            placeholder="https://instagram.com/tu-negocio"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          TikTok
          <input
            name="tiktokUrl"
            type="url"
            defaultValue={initialSocialLinks.tiktok ?? ""}
            placeholder="https://tiktok.com/@tu-negocio"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          YouTube
          <input
            name="youtubeUrl"
            type="url"
            defaultValue={initialSocialLinks.youtube ?? ""}
            placeholder="https://youtube.com/@tu-negocio"
            className={inputClass}
          />
        </label>
      </SettingsSection>

      <SettingsSection title="Sobre nosotros">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Descripción
          <textarea
            name="aboutText"
            defaultValue={tenant.aboutText ?? ""}
            rows={5}
            placeholder="Contales a tus viajeros quién está detrás de la agencia..."
            className={inputClass}
          />
        </label>

        <input type="hidden" name="aboutImages" value={aboutImagesPayload} />
        <p className="text-sm font-medium">Fotos (opcional, hasta 6, en orden)</p>
        <div className="flex flex-col gap-3">
          {aboutImageRows.map((row, index) => (
            <div key={row.id} className="flex flex-col gap-2 rounded-md border border-neutral-200 p-3 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Foto {index + 1}</span>
                <button type="button" onClick={() => removeAboutImageRow(row.id)} className="text-red-600 dark:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <ImageUploadField
                name={`aboutImageFile-${row.id}`}
                label="Imagen"
                defaultValue={row.url}
                onValueChange={(value) => updateAboutImageRow(row.id, value)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addAboutImageRow}
            disabled={aboutImageRows.length >= 6}
            className="self-start rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-100 disabled:opacity-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            + Agregar foto
          </button>
        </div>
      </SettingsSection>

      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      {state.success && <p className="text-sm text-emerald-600 dark:text-emerald-400">Guardado.</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-fit rounded-md bg-neutral-900 px-4 py-2.5 font-medium text-white hover:bg-neutral-700 disabled:opacity-60 dark:bg-white dark:text-neutral-900"
      >
        {isPending ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
