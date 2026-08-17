import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import { MapPin } from "lucide-react";

type TourLite = {
  slug: string;
  title: string;
  destination: string | null;
  price: number;
  currency: string;
  images: unknown;
};

// Grilla de tours alternativa — mismo origen que TourismHeroAlt.tsx. El
// original (sandbox de Ecommerce) mostraba "4.9" y "5 días, 4 noches"
// hardcodeados iguales en cada card sin dato real detrás; acá se sacaron
// esos dos badges en vez de inventar datos falsos — cuando el modelo Tour
// real tenga rating/duración agregada, se pueden volver a sumar.
export function TourismDestinationsGridAlt({
  tours,
  basePath,
  title = "Destinos Recomendados",
}: {
  tours: TourLite[];
  basePath: string;
  title?: string;
}) {
  if (!tours.length) return null;

  return (
    <section className="bg-slate-50 dark:bg-neutral-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-light text-slate-900 dark:text-white mb-4">{title}</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl font-light">
            Explora nuestra selección de los mejores lugares para tu próximo viaje. Aventuras inolvidables a un clic de distancia.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tours.map((tour) => {
            const images = Array.isArray(tour.images) ? (tour.images as string[]) : [];
            return (
              <Link
                key={tour.slug}
                href={`${basePath}/tours/${tour.slug}`}
                className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-neutral-800 flex flex-col hover:-translate-y-1"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100 dark:bg-neutral-800">
                  {images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={images[0]} alt={tour.title} className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <MapPin className="text-slate-300 h-12 w-12" />
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  {tour.destination && (
                    <div className="flex items-center gap-1 text-sky-600 dark:text-sky-400 text-xs font-medium uppercase tracking-wider mb-2">
                      <MapPin className="w-3 h-3" /> {tour.destination}
                    </div>
                  )}

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2 mb-2 leading-tight">
                    {tour.title}
                  </h3>

                  <div className="mt-auto flex items-end justify-between pt-4 border-t border-slate-100 dark:border-neutral-800">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Desde</span>
                      <span className="text-xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(Number(tour.price))} {tour.currency}
                      </span>
                    </div>
                    <span className="text-sky-600 dark:text-sky-400 font-medium text-sm group-hover:underline">
                      Ver detalles
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href={`${basePath}/tours`}
            className="px-8 py-3 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
          >
            Ver todos los destinos
          </Link>
        </div>
      </div>
    </section>
  );
}
