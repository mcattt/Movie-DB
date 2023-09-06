// Header

import Nav from "./Nav";
import { appTitle } from "../globals/globals";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header flex justify-between my-8">
      {/* The below anchor tag code is incorrect...
			    Use React Router's Link component for internal 
				links */}
      <h1>
        <Link to="/">{appTitle}</Link>
      </h1>
      <Nav />
    </header>
  );
};

export default Header;
