"use client";
import { SafeUser } from "@/types";
import Container from "../Container";
import Logo from "./Logo";
import SearchBarOpen from "./SearchBarOpen";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm ">
      <div
        className={`
          py-4 pb-28 border-b-[1px]
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
            <SearchBarOpen />

            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
