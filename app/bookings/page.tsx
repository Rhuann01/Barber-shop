import Header from "../_components/header";

import { BookingItem } from "../_components/booking-item";
import { getUserBookings } from "../_actions/get-booking";

export default async function BooakingPage() {
  const bookings = await getUserBookings();
  return (
    <>
      <Header />
      <section className=" p-5 space-y-3">
        <h1 className=" font-bold text-xl">Bookings</h1>
        {bookings.map((b) => (
          <BookingItem
            key={b.id}
            booking={b}
            services={b.service}
            barberShop={b.service.barberShop}
          />
        ))}
        {/* <SectionTitle text="Confirmados">confirmado</SectionTitle>
        <SectionTitle text="Finalizado">Finalizado</SectionTitle> */}
      </section>
    </>
  );
}
