import { NavLink } from "react-router-dom";

const Nav = () => {
  function blur(e) {
    e.target.blur();
  }

  return (
    <nav className="main-nav self-center hidden sm:block " onClick={blur}>
      <ul className="text-light-purple font-bold flex sm:text-2xl lg:text-3xl xl:text-4xl">
        <li className="pr-8 tablet-s:pr-16 tablet-b:pr-32">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="pr-8 tablet-s:pr-16 tablet-b:pr-32">
          <NavLink to="/about">About</NavLink>
        </li>
        <li className="pr-4 tablet-s:pr-8 tablet-b:pr-16">
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
