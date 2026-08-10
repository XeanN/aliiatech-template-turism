# Contrato con el repo principal

Este repo contiene todo lo visual del vertical **Turismo** — la tienda
pública de un negocio de tours (subdominio propio, ej.
`southtrails.aliiatech.com`) y su panel admin completo. Sin nada de lo
que hay detrás (base de datos, autenticación, envío de emails).

## Qué SÍ es real acá

**Público:**
- `src/components/tourism/{TourismLayout,TourCard,TourDatePicker,
  TourBookingForm,TestimonialsSection,TestimonialForm}.tsx` — copias del
  repo principal. `TourCard.tsx` y `TestimonialsSection.tsx` **adaptados**:
  sin `import type { Tour }` / `{ Testimonial }` de `@prisma/client`
  (este repo no tiene Prisma), mismo shape mínimo en un tipo local.
- `src/components/storefront/{RatingStars,CustomerLoginForm,
  CustomerRegisterForm}.tsx`, `src/components/marketplace/LocationSelects.tsx`
  + `src/lib/ubigeo/*` — genéricos, reusados tal cual (mismos que en
  `aliiatech-template-glosscanner`).
- `src/app/page.tsx` (home), `src/app/tours/page.tsx`,
  `src/app/tours/[slug]/page.tsx`, `src/app/cuenta/**` — JSX idéntico a
  la rama `TURISMO` de `src/app/sites/[subdomain]/{page.tsx,tours/**,
  cuenta/**}` del repo principal (esos archivos son compartidos con
  otros verticales; acá solo vive la rama de Turismo).

**Panel admin** (todo copiado tal cual del repo principal, salvo donde se
indica lo contrario):
- `src/components/admin/{AdminShell,AdminSidebarNav,AdminPageHeader,
  MetricCard,EmptyState,ThemeToggle,UserMenu,CustomDomainSection,
  TourActions,AvailabilityCalendar,AvailabilityForm,AvailabilityRangeForm,
  TourBookingActions,PromotionActions,CouponActions,TestimonialActions,
  PaymentGatewaySettingsForm}.tsx`.
- `src/components/admin/{TourForm,PromotionForm,CouponForm,
  TourismSettingsForm}.tsx` — **adaptados**: sin `import type` de
  `@prisma/client` (`Tour`/`Promotion`/`Coupon`/`Tenant`), tipos locales
  con el mismo shape mínimo.
- `src/components/admin/{ImageUploadField,LegalSettingsForm}.tsx` —
  **adaptados** (mismos que en `aliiatech-template-glosscanner`): el
  repo real sube archivos a Vercel Blob, acá se simula la subida.
- Las 13 páginas bajo `src/app/admin/**` (tours + nuevo/[id], disponibilidad,
  reservas, promociones + nuevo/[id], cupones + nuevo/[id], testimonios,
  clientes-turismo) — 100% Turismo en el repo principal (no comparten
  archivo con otro vertical), JSX idéntico con la fuente de datos
  cambiada de Prisma a `src/lib/mock-data.ts`.
- `src/app/admin/page.tsx` y `src/app/admin/configuracion/page.tsx` —
  solo la rama `TURISMO` de esos archivos compartidos del repo principal.
- `src/app/admin/legal/page.tsx` — genérico, igual que en los otros repos
  satélite.

## Qué está simulado

- `src/lib/actions/*` — mismo criterio en todos los repos satélite:
  simulan éxito/error con un `setTimeout`, **mantengan la firma exacta**.
  Cubre `tours`, `tour-availability`, `tour-bookings`, `tour-promotions`,
  `tour-coupons`, `testimonials`, `tourism-settings`, `payment-gateway`,
  `legal-settings`, `custom-domain`, `customer-auth`, `auth` (solo
  `logout`).
- `src/lib/mock-data.ts` — un tenant de mentira ("South Trails Perú") con
  3 tours, disponibilidad, testimonios, 1 promoción, 1 cupón y 2 reservas.
  No existe en el repo real.
- `src/app/admin/layout.tsx` — sin resolución real de sesión, siempre
  renderiza como si ya hubieras iniciado sesión como dueña del negocio.
- `/cuenta` no chequea sesión real (siempre muestra las reservas de
  ejemplo) — en el repo real redirige a `/cuenta/login` sin sesión.

## Qué NO existe acá (a propósito)

- Base de datos, Prisma, next-auth, variables de entorno con secretos,
  credenciales de Vercel Blob.
- **Páginas genéricas compartidas con otros verticales, excluidas a
  propósito**: `/blog`, `/contacto`, `/sobre-nosotros`, `/terminos`,
  `/privacidad`, `/cookies` (públicas) y `/admin/blog` — son las mismas
  para Ecommerce y Turismo, no definen la identidad visual propia de este
  vertical. `TourismLayout` (copiado tal cual) sigue linkeando a
  `/sobre-nosotros`, `/blog` y `/contacto` en su nav — esos links dan 404
  acá a propósito, no es un bug.
- Cualquier cosa de Ecommerce, Multiservicios/TuMaestro, Glosscanner,
  Belleza independiente o Landing de Servicios.

## Cómo se porta de vuelta

Los **componentes** se portan 1:1, el Action ya los whitelist-ea —
**excepto** `TourForm.tsx`, `PromotionForm.tsx`, `CouponForm.tsx`,
`TourismSettingsForm.tsx`, `TourCard.tsx`, `TestimonialsSection.tsx`
(tipos `@prisma/client` reemplazados por tipos locales) e
`ImageUploadField.tsx`/`LegalSettingsForm.tsx` (Vercel Blob mockeado):
esos requieren copiar a mano solo los cambios visuales, sin pisar los
tipos/lógica reales. Las **páginas** 100% Turismo (todo `/admin/tours`,
`/admin/disponibilidad`, etc., y las públicas `/`, `/tours/**`,
`/cuenta/**`) también son casi copy-paste — solo hay que reemplazar la
fuente de datos (`mock-data.ts` → `db.*` + `requireTenantId()`). Las
páginas compartidas (`/admin` dashboard, `/admin/configuracion`)
requieren pegar el JSX adaptado dentro de la rama `TURISMO`
correspondiente del archivo real, sin tocar las ramas de los otros
verticales.
