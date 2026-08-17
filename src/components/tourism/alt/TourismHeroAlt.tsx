"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Search, MapPin } from "lucide-react";

const AUTOPLAY_MS = 6000;

// Hero alternativo con carrusel de fondo + buscador por destino — mismo
// origen que TourismHeaderAlt.tsx (portado del sandbox de Ecommerce). A
// diferencia del original, el buscador "¿A dónde vas?" es real acá: hace
// GET a /tours?destino=... (el mismo query param que ya soporta
// src/app/tours/page.tsx), en vez del widget decorativo con Fechas/
// Pasajeros que no llevaba a ningún lado en el sandbox de Ecommerce. Se
// quitaron esos dos campos porque no hay filtro real de fecha/pasajeros
// en /tours todavía — agregarlos sería prometer algo que no existe.
export function TourismHeroAlt({
  basePath,
  storeName,
  heroTitle,
  heroSubtitle,
  bannerImages,
  destinations,
}: {
  basePath: string;
  storeName: string;
  heroTitle: string;
  heroSubtitle: string;
  bannerImages: string[];
  destinations: { name: string; imageUrl?: string | null }[];
}) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (bannerImages.length <= 1) return;
    timerRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((c) => (c + 1) % bannerImages.length);
        setFading(false);
      }, 500);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [bannerImages.length]);

  const banner = bannerImages[index];

  return (
    <>
      <style>{`
        .img-fade { transition: opacity 0.8s ease-in-out, transform 8s linear; }
        .img-fade-out { opacity: 0; }
        .hero-zoom { transform: scale(1.05); }
      `}</style>

      <div className="relative w-full h-[85vh] min-h-[600px] bg-slate-900 overflow-hidden">
        {banner ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={banner}
            alt={storeName}
            className={`absolute inset-0 w-full h-full object-cover img-fade ${fading ? "img-fade-out" : "hero-zoom"}`}
          />
        ) : (
          <div className="absolute inset-0 bg-sky-900" />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

        <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-16 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="text-sky-300 font-medium tracking-[0.3em] uppercase text-sm mb-4 block">
              Explora el mundo con nosotros
            </span>
            <h1 className="text-5xl md:text-7xl font-light text-white leading-tight mb-6 drop-shadow-lg">
              {heroTitle}
            </h1>
            <p className="text-lg text-slate-200 mb-10 max-w-xl font-light leading-relaxed drop-shadow">
              {heroSubtitle}
            </p>

            <form
              action={`${basePath}/tours`}
              className="bg-white dark:bg-neutral-900 p-2 md:p-3 rounded-full flex flex-col md:flex-row items-center gap-2 md:gap-4 shadow-2xl max-w-2xl"
            >
              <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full">
                <MapPin className="text-sky-500 h-5 w-5 shrink-0" />
                <input
                  type="text"
                  name="destino"
                  placeholder="¿A dónde vas?"
                  className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400 font-medium"
                />
              </div>
              <button
                type="submit"
                className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-8 py-3.5 font-medium transition-colors w-full md:w-auto text-center shrink-0 flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" /> Buscar Tour
              </button>
            </form>
          </div>
        </div>

        {destinations.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent pt-12 pb-6 px-6">
            <div className="mx-auto max-w-7xl flex gap-6 overflow-x-auto snap-x no-scrollbar">
              {destinations.map((dest) => (
                <Link
                  key={dest.name}
                  href={`${basePath}/tours?destino=${encodeURIComponent(dest.name)}`}
                  className="snap-start shrink-0 group"
                >
                  <div className="relative h-20 w-32 md:h-24 md:w-40 rounded-xl overflow-hidden border border-white/20 transition-transform group-hover:-translate-y-2">
                    {dest.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={dest.imageUrl} alt={dest.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="h-full w-full bg-sky-900/50 backdrop-blur-sm flex items-center justify-center">
                        <MapPin className="text-white/50 h-8 w-8" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <span className="absolute bottom-2 left-3 text-white font-medium text-sm drop-shadow-md">
                      {dest.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
