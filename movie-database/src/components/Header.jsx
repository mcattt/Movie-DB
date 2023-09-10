// Header

import Nav from "./Nav";
import { Link } from "react-router-dom";
import headerLogo from "/assets/images/primary-logo.png";

const Header = () => {
  return (
    <header className="header flex justify-between content-center py-6 bg-dark-purple shadow-[0_3px_1px_0px_rgba(134,134,134,0.16)]">
      
        <Link to="/">
        <img className="w-72 ml-16" src={headerLogo} alt="Logo" />
          </Link>
      
      <Nav />
    </header>
  );
};

export default Header;
