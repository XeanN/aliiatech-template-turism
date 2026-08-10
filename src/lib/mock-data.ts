// Datos de mentira para todo el vertical Turismo (público + admin) —
// mismo espíritu que mock-data.ts en los otros repos satélite. Un solo
// archivo porque acá el público y el admin comparten los mismos tours
// (a diferencia de Glosscanner, donde hub/salón son tenants distintos).

export const TENANT = {
  id: "tenant-demo",
  name: "South Trails Perú",
  logoUrl: null as string | null,
  faviconUrl: null as string | null,
  heroTitle: "Vive el Perú auténtico",
  heroSubtitle: "Tours privados y en grupo por Cusco, diseñados por gente de acá.",
  whatsappPhone: "51987654321",
  contactEmail: "hola@southtrails.pe",
  aboutText: "Somos una agencia local con más de 8 años armando experiencias a medida por el sur del Perú.",
  aboutImages: [] as unknown,
  socialLinks: { instagram: "https://instagram.com/southtrails.pe" } as unknown,
  legalTerms: null as unknown,
  legalPrivacy: null as unknown,
  legalCookies: null as unknown,
  customDomain: null as string | null,
};

export type MockTour = {
  id: string;
  slug: string;
  title: string;
  destination: string | null;
  price: number;
  currency: string;
  description: string;
  images: string[];
  includes: string[];
  excludes: string[];
  itinerary: string[];
  faqs: { question: string; answer: string }[];
  extras: { name: string; price: number }[];
  status: "DRAFT" | "PUBLISHED";
};

export const TOURS: MockTour[] = [
  {
    id: "tour-1",
    slug: "machu-picchu-full-day",
    title: "Machu Picchu Full Day",
    destination: "Cusco",
    price: 450,
    currency: "PEN",
    description:
      "Recorré la ciudadela inca en un día completo, con guía certificado y tren incluido desde Ollantaytambo.",
    images: [],
    includes: ["Tren ida y vuelta", "Bus Aguas Calientes - Machu Picchu", "Guía certificado", "Entrada a la ciudadela"],
    excludes: ["Almuerzo", "Propinas"],
    itinerary: ["04:00 Recojo en el hotel", "06:00 Tren a Aguas Calientes", "09:00 Ingreso a Machu Picchu", "14:00 Retorno"],
    faqs: [{ question: "¿Incluye guía?", answer: "Sí, guía turístico certificado en español e inglés." }],
    extras: [{ name: "Almuerzo buffet premium", price: 45 }, { name: "Guía privado", price: 120 }],
    status: "PUBLISHED",
  },
  {
    id: "tour-2",
    slug: "valle-sagrado",
    title: "Valle Sagrado en un día",
    destination: "Cusco",
    price: 180,
    currency: "PEN",
    description: "Pisac, Ollantaytambo y el mercado local — la mejor introducción a la cultura andina.",
    images: [],
    includes: ["Transporte turístico", "Guía", "Entrada a sitios arqueológicos"],
    excludes: ["Almuerzo"],
    itinerary: ["08:00 Recojo", "09:00 Pisac", "12:00 Almuerzo (opcional)", "14:00 Ollantaytambo"],
    faqs: [],
    extras: [{ name: "Almuerzo típico", price: 35 }],
    status: "PUBLISHED",
  },
  {
    id: "tour-3",
    slug: "montana-7-colores",
    title: "Montaña de 7 Colores",
    destination: "Cusco",
    price: 220,
    currency: "PEN",
    description: "Trekking de dificultad moderada hasta el mirador de Vinicunca.",
    images: [],
    includes: ["Transporte", "Guía", "Entrada"],
    excludes: ["Equipo de trekking", "Caballo (opcional, se paga en sitio)"],
    itinerary: ["03:30 Recojo", "06:00 Inicio del trekking", "09:00 Cumbre", "16:00 Retorno"],
    faqs: [],
    extras: [],
    status: "DRAFT",
  },
];

export function tourBySlug(slug: string) {
  return TOURS.find((tour) => tour.slug === slug) ?? null;
}

export type MockAvailability = { id: string; tourId: string; date: string; capacity: number };

function futureDate(daysFromNow: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

export const AVAILABILITY: MockAvailability[] = [
  { id: "avail-1", tourId: "tour-1", date: futureDate(5), capacity: 8 },
  { id: "avail-2", tourId: "tour-1", date: futureDate(9), capacity: 4 },
  { id: "avail-3", tourId: "tour-1", date: futureDate(14), capacity: 10 },
  { id: "avail-4", tourId: "tour-2", date: futureDate(3), capacity: 12 },
  { id: "avail-5", tourId: "tour-2", date: futureDate(7), capacity: 12 },
];

export function availabilityForTour(tourId: string) {
  return AVAILABILITY.filter((a) => a.tourId === tourId);
}

export type MockTestimonial = {
  id: string;
  tourId: string | null;
  authorName: string;
  rating: number;
  text: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export const TESTIMONIALS: MockTestimonial[] = [
  { id: "test-1", tourId: "tour-1", authorName: "Laura M.", rating: 5, text: "Increíble experiencia, el guía súper preparado.", status: "APPROVED" },
  { id: "test-2", tourId: null, authorName: "Diego R.", rating: 5, text: "Todo coordinado a la perfección, volvería a reservar.", status: "APPROVED" },
  { id: "test-3", tourId: "tour-2", authorName: "Carla P.", rating: 4, text: "Muy buen tour, un poco corto el tiempo en Pisac.", status: "PENDING" },
];

export type MockPromotion = {
  id: string;
  title: string;
  badge: string | null;
  description: string | null;
  image: string | null;
  discountPercent: number | null;
  tourId: string | null;
  startDate: Date | null;
  endDate: Date | null;
  active: boolean;
};

export const PROMOTIONS: MockPromotion[] = [
  {
    id: "promo-1",
    title: "Reserva anticipada Machu Picchu",
    badge: "Early Bird",
    description: "15% off reservando con 30 días de anticipación.",
    image: null,
    discountPercent: 15,
    tourId: "tour-1",
    startDate: null,
    endDate: null,
    active: true,
  },
];

export type MockCoupon = {
  id: string;
  code: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  minAmount: number | null;
  maxUses: number | null;
  usedCount: number;
  active: boolean;
  validFrom: Date | null;
  validUntil: Date | null;
};

export const COUPONS: MockCoupon[] = [
  {
    id: "coupon-1",
    code: "VERANO25",
    discountType: "PERCENTAGE",
    discountValue: 25,
    minAmount: 100,
    maxUses: 50,
    usedCount: 12,
    active: true,
    validFrom: null,
    validUntil: null,
  },
];

export type MockBooking = {
  id: string;
  tourId: string;
  tourTitle: string;
  date: Date;
  pax: number;
  totalAmount: number;
  currency: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: Date;
};

export const BOOKINGS: MockBooking[] = [
  {
    id: "book-1",
    tourId: "tour-1",
    tourTitle: "Machu Picchu Full Day",
    date: new Date(futureDate(5)),
    pax: 2,
    totalAmount: 900,
    currency: "PEN",
    clientName: "Fernanda Quispe",
    clientEmail: "fernanda@example.com",
    clientPhone: "987654321",
    status: "PENDING",
    createdAt: new Date(),
  },
  {
    id: "book-2",
    tourId: "tour-2",
    tourTitle: "Valle Sagrado en un día",
    date: new Date(futureDate(3)),
    pax: 4,
    totalAmount: 720,
    currency: "PEN",
    clientName: "Gabriela Salazar",
    clientEmail: "gabriela@example.com",
    clientPhone: "976543210",
    status: "CONFIRMED",
    createdAt: new Date(),
  },
];
