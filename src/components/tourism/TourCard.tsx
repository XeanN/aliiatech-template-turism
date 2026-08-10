import Link from "next/link";

import { formatCurrency } from "@/lib/format";

// Shape mínimo (sin `import type { Tour } from "@prisma/client"` — este
// repo no tiene Prisma, ver CONTRACT.md).
type TourLite = {
  slug: string;
  title: string;
  destination: string | null;
  price: number;
  currency: string;
  images: unknown;
};

export function TourCard({ tour, basePath }: { tour: TourLite; basePath: string }) {
  const images = Array.isArray(tour.images) ? (tour.images as string[]) : [];

  return (
    <Link
      href={`${basePath}/tours/${tour.slug}`}
      className="group block overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="aspect-4/3 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        {images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={images[0]}
            alt={tour.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
            Sin foto
          </div>
        )}
      </div>
      <div className="p-4">
        {tour.destination && (
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            {tour.destination}
          </p>
        )}
        <h3 className="mt-1 text-base font-semibold">{tour.title}</h3>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Desde{" "}
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            {formatCurrency(Number(tour.price))} {tour.currency}
          </span>
        </p>
      </div>
    </Link>
  );
}
