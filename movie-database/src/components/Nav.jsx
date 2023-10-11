import { NavLink, useLocation } from "react-router-dom";

const Nav = () => {

  const location = useLocation();

  function blur(e) {
    e.target.blur();
  }

  return (
    <nav className="main-nav self-center hidden sm:block " onClick={blur}>
      <ul className="text-light-purple font-bold flex sm:text-2xl lg:text-3xl xl:text-4xl">
        <li className="px-2 mr-8 border-transparent border-2 border-solid rounded-lg hover:text-bright-orange hover:border-solid hover:border-2 hover:border-bright-orange hover:rounded-lg tablet-s:mr-16 tablet-b:mr-32 transition duration-500">
          <NavLink to="/"
            className={location.pathname === "/" ? "text-bright-orange" : ""}>Home</NavLink>
        </li>
        <li className="px-2 mr-8 border-transparent border-2 border-solid rounded-lg hover:text-bright-orange hover:border-solid hover:border-2 hover:border-bright-orange hover:rounded-lg tablet-s:mr-16 tablet-b:mr-32 transition duration-500">
          <NavLink to="/about"
            className={location.pathname === "/about" ? "text-bright-orange" : ""}>About</NavLink>
        </li>
        <li className="px-2 mr-4 border-transparent border-2 border-solid rounded-lg hover:text-bright-orange hover:border-solid hover:border-2 hover:border-bright-orange hover:rounded-lg tablet-s:mr-8 tablet-b:mr-16 transition duration-500">
          <NavLink to="/favourites"
            className={location.pathname === "/favourites" ? "text-bright-orange" : ""}>Favourites</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
