"use client";
import { SafeUser } from "@/types";
import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
import SearchBarOpen from "./SearchBarOpen";
import UserMenu from "./UserMenu";
import { useState } from "react";
import useSearchModal from "@/hooks/searchTrip/useSearchModal";
import useDestinationModal from "@/hooks/searchTrip/useDestinationModal";
import SearchBar from "@/components/navbar/SearchBar";
import useCalendarModal from "@/hooks/searchTrip/useCalendarModal";
import useGuestModal from "@/hooks/searchTrip/useGuestModal";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const searchModal = useSearchModal();
  const destinationModal = useDestinationModal();
  const calenderModal = useCalendarModal();
  const guestModal = useGuestModal();

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm ">
      <div
        className={`
          py-4 
          ${
            destinationModal.isOpen || calenderModal.isOpen || guestModal.isOpen
              ? "pb-28 "
              : null
          }
          border-b-[1px]
        `}
      >
        <Container>
          <div
            className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
          >
            <Logo />
            {!destinationModal.isOpen &&
              !calenderModal.isOpen &&
              !guestModal.isOpen && <SearchBarOpen />}
            {destinationModal.isOpen ||
            calenderModal.isOpen ||
            guestModal.isOpen ? (
              <SearchBar />
            ) : null}

            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
