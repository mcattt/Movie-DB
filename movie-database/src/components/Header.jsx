// Header

import Nav from "./Nav";
import { appTitle } from "../globals/globals";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
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
