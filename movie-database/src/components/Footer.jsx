import { getYear } from "../utilities/dates";
import { Link } from "react-router-dom";
import footerLogo from "/assets/images/secondary-logo.png";

const Footer = () => {
  return (
    <footer className="bg-dark-purple py-4 shadow-[1px_2px_5px_1px_white]">
      <Link to="/">
        <img className="w-16 mx-auto my-0" src={footerLogo} alt="Logo" />
      </Link>
      <p className="text-light-purple text-center italic">
        &copy;{getYear()} by Cat, Jack & Preston
      </p>
    </footer>
  );
};

export default Footer;
