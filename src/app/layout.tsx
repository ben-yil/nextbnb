import { Nunito } from "next/font/google";

import Navbar from "@/components/navbar/Navbar";

import "./globals.css";
import ToasterProvider from "@/providers/ToasterProvider";
import RegisterModal from "@/components/modals/RegisterModal";
import getCurrentUser from "@/actions/getCurrentUser";
import LoginModal from "@/components/modals/LoginModal";
import RentModal from "@/components/modals/RentModal";
import DestinationModal from "@/components/modals/searchTrip/DestinationModal";
import CalendarModal from "@/components/modals/searchTrip/CalendarModal";
import GuestModal from "@/components/modals/searchTrip/GuestModal";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
          <ToasterProvider />
          <Navbar currentUser={currentUser} />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <DestinationModal />
          <CalendarModal />
          <GuestModal />
          <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
