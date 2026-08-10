// Galería ordenada de fotos para "Sobre nosotros" — a diferencia de
// bannerImages/promoImages, son solo ilustrativas (sin link, no
// clickeables), así que el shape es un array plano de URLs.
export function parseAboutImages(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.length > 0);
}
