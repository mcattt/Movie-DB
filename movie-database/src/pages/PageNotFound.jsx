import { useEffect } from "react";
import { Link } from "react-router-dom";
import { appTitle } from "../globals/globals";
import sadFace from "/assets/images/unhappy-face.png";
import AOS from 'aos';
import 'aos/dist/aos.css';

const PageNotFound = () => {
  useEffect(() => {
    document.title = `${appTitle} - Page Not Found`;
    AOS.init();
  }, []);

  return (

      <section data-aos="fade-in" className="page-not-found-section flex flex-col justify-center items-center content-center flex-wrap mt-[7rem] breakpoint-small:mt-[2rem] text-xl">
        <img
              src={sadFace}
              alt="sad face icon"
              className=" w-[10rem] breakpoint-small:mt-24"
            />
        <h2 className="mt-4">404 ... : (</h2>
        <p>Page not found.</p>
        <p>
          Go to <Link to="/" className="underline tablet-b:hover:text-bright-orange transition duration-500">Home</Link> page.
        </p>
      </section>
  
  );
};

export default PageNotFound;
