import { Nunito } from "next/font/google";

import Navbar from "@/components/navbar/Navbar";

import "./globals.css";
import ToasterProvider from "@/providers/ToasterProvider";
import RegisterModal from "@/components/modals/RegisterModal";
import getCurrentUser from "@/actions/getCurrentUser";
import LoginModal from "@/components/modals/LoginModal";

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
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
