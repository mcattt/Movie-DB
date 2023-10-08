import React, { useState } from "react";
import upArrow from "/assets/images/up-arrow-thick.png";
// code inspired by https://www.geeksforgeeks.org/how-to-create-a-scroll-to-top-button-in-react-js/
const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div
      onClick={scrollToTop}
      className={` group hover:cursor-pointer fixed bottom-0 right-0 p-3 rounded-tl-[200px]  leading-tight shadow-md hover:bg-light-purple hover:bg-opacity-40  ${
        visible ? "opacity-100 " : "opacity-0 "
      } transition duration-[400ms] ease-in-out`}
    >
      <div className="">
        <img
          src={upArrow}
          alt=""
          className="w-4 mx-auto  opacity-40  transition group-hover:opacity-100 group-hover:filter group-hover:brightness-0"
        />
        <span className=" text-lg opacity-60 group-hover:opacity-100 group-hover:text-black transition duration-[400ms] ease-in-out ">
          Scroll to Top
        </span>
      </div>
    </div>
  );
};

export default ScrollButton;
