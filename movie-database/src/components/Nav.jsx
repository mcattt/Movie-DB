import { NavLink } from "react-router-dom";

const Nav = () => {
  function blur(e) {
    e.target.blur();
  }

  return (
    <nav className="main-nav self-center" onClick={blur}>
      <ul className="text-light-purple font-bold flex">
        <li className="pr-32 text-4xl">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="pr-32 text-4xl">
          <NavLink to="/about">About</NavLink>
        </li>
        <li className="pr-16 text-4xl">
          <NavLink to="/favourites">Favourites</NavLink>
        </li>
        {/* <li className="pr-16">
          <NavLink to="/contact">Contact</NavLink>
        </li> */}
      </ul>
    </nav>
  );
};

export default Nav;
