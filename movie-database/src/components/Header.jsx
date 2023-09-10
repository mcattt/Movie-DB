// Header

import Nav from "./Nav";
import { Link } from "react-router-dom";
import headerLogo from "/assets/images/primary-logo.png";

const Header = () => {
  
  return (
    <header className="header sm:flex sm:justify-between sm:content-center py-4 bg-dark-purple shadow-[0_3px_1px_0px_rgba(134,134,134,0.16)]">
      <Link to="/">
        <img
          className="xl:w-40 w-32 sm:ml-16 mx-auto sm:my-0 "
          src={headerLogo}
          alt="Logo"
        />
      </Link>
      <Nav />
    </header>
  );
};

export default Header;
