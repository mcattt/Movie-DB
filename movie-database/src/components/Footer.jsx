import { getYear } from "../utilities/dates";
import { Link } from "react-router-dom";
import footerLogo from "/assets/images/secondary-logo.png";
import ThumbNav from "./ThumbNav";

const Footer = () => {
  return (
    <footer className="bg-dark-purple py-4 shadow-[0px_-4px_4px_-4px_white] w-full fixed bottom-0 tablet-b:static z-50">
      <Link to="/" className="block w-[64px] mx-auto my-0">
        <img className="w-16 mx-auto my-0 hidden tablet-b:block" src={footerLogo} alt="Logo" />
      </Link>
      <p className="text-light-purple text-center italic hidden tablet-b:block">
        &copy;{getYear()} by Cat, Jack & Preston
      </p>
      <ThumbNav />
    </footer>
  );
};

export default Footer;
