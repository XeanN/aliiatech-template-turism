import { notFound } from "next/navigation";

import { TestimonialsSection } from "@/components/tourism/TestimonialsSection";
import { TourBookingForm } from "@/components/tourism/TourBookingForm";
import { availabilityForTour, TESTIMONIALS, tourBySlug } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

// Copia visual de src/app/sites/[subdomain]/tours/[slug]/page.tsx.
export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = tourBySlug(slug);
  if (!tour || tour.status !== "PUBLISHED") {
    notFound();
  }

  const availability = availabilityForTour(tour.id);
  const testimonials = TESTIMONIALS.filter((t) => t.tourId === tour.id && t.status === "APPROVED");

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 py-10 sm:px-6">
      <div>
        {tour.destination && (
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            {tour.destination}
          </p>
        )}
        <h1 className="mt-1 text-3xl font-bold">{tour.title}</h1>
        <p className="mt-2 text-xl text-neutral-500 dark:text-neutral-400">
          Desde {formatCurrency(tour.price)} {tour.currency}
        </p>
        <p className="mt-4 whitespace-pre-line text-neutral-700 dark:text-neutral-300">{tour.description}</p>
      </div>

      {(tour.includes.length > 0 || tour.excludes.length > 0) && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {tour.includes.length > 0 && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">Incluye</h2>
              <ul className="flex flex-col gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                {tour.includes.map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
            </div>
          )}
          {tour.excludes.length > 0 && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">No incluye</h2>
              <ul className="flex flex-col gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                {tour.excludes.map((item) => (
                  <li key={item}>✕ {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {tour.itinerary.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold">Itinerario</h2>
          <ol className="flex flex-col gap-2 border-l-2 border-emerald-200 pl-4 text-sm text-neutral-700 dark:border-emerald-900 dark:text-neutral-300">
            {tour.itinerary.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      {tour.faqs.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold">Preguntas frecuentes</h2>
          <div className="flex flex-col gap-3">
            {tour.faqs.map((faq) => (
              <div key={faq.question}>
                <p className="font-medium">{faq.question}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <TourBookingForm
        tourId={tour.id}
        price={tour.price}
        currency={tour.currency}
        availability={availability}
        extras={tour.extras}
      />

      <TestimonialsSection tenantId="tenant-demo" basePath={`/tours/${tour.slug}`} tourId={tour.id} testimonials={testimonials} />
    </div>
  );
}
