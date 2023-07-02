"use client";
import { SafeUser } from "@/types";
import Container from "../Container";
import Logo from "./Logo";
import SearchBarOpen from "./SearchBarOpen";
import UserMenu from "./UserMenu";
import Categories from "@/components/navbar/Categories";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm ">
      <div
        className={`
          py-4 border-b-[1px]
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
      <Categories />
    </div>
  );
};

export default Navbar;
