import { RatingStars } from "@/components/storefront/RatingStars";

import { TestimonialForm } from "./TestimonialForm";

// Shape mínimo (sin `import type { Testimonial } from "@prisma/client"` —
// este repo no tiene Prisma, ver CONTRACT.md).
type TestimonialLite = { id: string; rating: number; text: string; authorName: string };

export function TestimonialsSection({
  tenantId,
  basePath,
  tourId,
  testimonials,
}: {
  tenantId: string;
  basePath: string;
  tourId?: string | null;
  testimonials: TestimonialLite[];
}) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">Lo que dicen nuestros viajeros</h2>

      {testimonials.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Todavía no hay testimonios — ¡sé el primero!
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col gap-2 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800"
            >
              <RatingStars average={testimonial.rating} />
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <p className="text-sm font-semibold">{testimonial.authorName}</p>
            </div>
          ))}
        </div>
      )}

      <div className="max-w-md">
        <TestimonialForm tenantId={tenantId} basePath={basePath} tourId={tourId} />
      </div>
    </section>
  );
}
