"use client";
import Container from "@/components/Container";
import Logo from "@/components/navbar/Logo";
import SearchBarOpen from "@/components/navbar/SearchBarOpen";
import UserMenu from "@/components/navbar/UserMenu";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm ">
      <div
        className={`
          py-4 
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
            <SearchBarOpen />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
