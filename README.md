# aliiatech-template-turismo

Repo de diseño del vertical **Turismo** — tienda pública + panel admin
completo. Ver [`CONTRACT.md`](./CONTRACT.md) para el detalle completo de
qué es real y qué está simulado.

## Setup

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Qué hay acá

**Público** ("South Trails Perú", ver `src/lib/mock-data.ts`):
- `/` — home con hero, destinos, promoción activa, tours destacados, testimonios.
- `/tours` — listado (filtrable por `?destino=`).
- `/tours/[slug]` — ficha de tour + reserva + testimonios (probar con `machu-picchu-full-day`, `valle-sagrado`).
- `/cuenta`, `/cuenta/login`, `/cuenta/registro` — cuenta de cliente.

**Panel admin**:
- `/admin` — dashboard (tours, reservas pendientes, fechas con poco cupo).
- `/admin/tours` (+ `/nuevo`, `/[id]`).
- `/admin/disponibilidad` — calendario de cupos por tour.
- `/admin/reservas` — confirmar/cancelar.
- `/admin/promociones` (+ `/nuevo`, `/[id]`).
- `/admin/cupones` (+ `/nuevo`, `/[id]`).
- `/admin/testimonios` — moderación.
- `/admin/clientes-turismo` — derivado de reservas.
- `/admin/configuracion`, `/admin/legal`.

Nada de esto pega contra una base de datos real — ver
`src/lib/mock-data.ts` y `src/lib/actions/*`.
