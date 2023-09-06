import { NavLink } from "react-router-dom";

const Nav = () => {
  function blur(e) {
    e.target.blur();
  }

  return (
    <nav className="main-nav" onClick={blur}>
      <ul className="text-blue-600/75 flex">
        <li className="pr-16">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="pr-16">
          <NavLink to="/about">About</NavLink>
        </li>
        <li className="pr-16">
          <NavLink to="/favourites">Favourites</NavLink>
        </li>
        <li className="pr-16">
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
