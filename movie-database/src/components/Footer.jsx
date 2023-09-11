import { getYear } from "../utilities/dates";
import { Link } from "react-router-dom";
import footerLogo from "/assets/images/secondary-logo.png";
import ThumbNav from "./ThumbNav";

const Footer = () => {
  return (
    <footer className="bg-dark-purple py-4 shadow-[1px_2px_5px_1px_white] w-full fixed bottom-0 sm:relative">
      <Link to="/">
        <img className="w-16 mx-auto my-0 hidden sm:block" src={footerLogo} alt="Logo" />
      </Link>
      <p className="text-light-purple text-center italic hidden sm:block">
        &copy;{getYear()} by Cat, Jack & Preston
      </p>
      <ThumbNav />
    </footer>
  );
};

export default Footer;
