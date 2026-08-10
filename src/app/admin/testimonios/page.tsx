import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TestimonialActions } from "@/components/admin/TestimonialActions";
import { RatingStars } from "@/components/storefront/RatingStars";
import { TESTIMONIALS, TOURS } from "@/lib/mock-data";

// Copia visual de src/app/admin/testimonios/page.tsx.
export default function AdminTestimonialsPage() {
  const pending = TESTIMONIALS.filter((t) => t.status === "PENDING");
  const resolved = TESTIMONIALS.filter((t) => t.status !== "PENDING");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <AdminPageHeader title="Testimonios" />

        <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
              <tr>
                <th className="px-4 py-3 font-medium">Autor</th>
                <th className="px-4 py-3 font-medium">Tour</th>
                <th className="px-4 py-3 font-medium">Calificación</th>
                <th className="px-4 py-3 font-medium">Texto</th>
                <th className="px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {pending.map((testimonial) => (
                <tr key={testimonial.id}>
                  <td className="px-4 py-3 font-medium">{testimonial.authorName}</td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">
                    {TOURS.find((t) => t.id === testimonial.tourId)?.title ?? "Tienda"}
                  </td>
                  <td className="px-4 py-3">
                    <RatingStars average={testimonial.rating} />
                  </td>
                  <td className="max-w-xs px-4 py-3 text-neutral-500 dark:text-neutral-400">{testimonial.text}</td>
                  <td className="px-4 py-3">
                    <TestimonialActions id={testimonial.id} />
                  </td>
                </tr>
              ))}
              {pending.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-neutral-500 dark:text-neutral-400">
                    No hay testimonios pendientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {resolved.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-neutral-500 dark:text-neutral-400">Resueltos recientemente</h2>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Autor</th>
                  <th className="px-4 py-3 font-medium">Calificación</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {resolved.map((testimonial) => (
                  <tr key={testimonial.id}>
                    <td className="px-4 py-3 font-medium">{testimonial.authorName}</td>
                    <td className="px-4 py-3">
                      <RatingStars average={testimonial.rating} />
                    </td>
                    <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">
                      {testimonial.status === "APPROVED" ? "Aprobado" : "Rechazado"}
                    </td>
                    <td className="px-4 py-3">
                      <TestimonialActions id={testimonial.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
