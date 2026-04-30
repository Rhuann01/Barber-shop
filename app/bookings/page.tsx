import Header from "../_components/header";

import { BookingItem } from "../_components/booking-item";
import { getUserBookings } from "../_actions/get-booking";
import SectionTitle from "../_components/sectionTitle";

export default async function BooakingPage() {
  const bookings = await getUserBookings();
  const confirmedBooking = bookings.filter((fb) => new Date() < fb.date);
  const pastBooking = bookings.filter((pb) => new Date() > pb.date);

  return (
    <>
      <Header />
      <section className=" p-5">
        <h1 className=" font-bold text-xl">Bookings</h1>
        <SectionTitle text="Confirmados">
          {confirmedBooking.map((b) => (
            <BookingItem
              key={b.id}
              booking={b}
              services={b.service}
              barberShop={b.service.barberShop}
            />
          ))}
        </SectionTitle>
        <SectionTitle text="Finalizado">
          {pastBooking.map((b) => (
            <BookingItem
              key={b.id}
              booking={b}
              services={b.service}
              barberShop={b.service.barberShop}
            />
          ))}
        </SectionTitle>
      </section>
    </>
  );
}
