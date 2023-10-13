import React, { useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import upArrow from "/assets/images/up-arrow-thick.png";
// code inspired by https://www.geeksforgeeks.org/how-to-create-a-scroll-to-top-button-in-react-js/
// where i got the idea from for the design (#7) https://elfsight.com/back-to-top-widget/examples/
const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 900px)");

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (isDesktop) {
      if (scrolled > 300) {
        setVisible(true);
      } else if (scrolled <= 300) {
        setVisible(false);
      }
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div
      onClick={scrollToTop}
      className={` hidden  w-32 tablet-b:block group hover:cursor-pointer sticky bottom-0 right-0 p-1 mb-[-2rem] rounded-tr-[200px] font-semibold  leading-tight shadow-md hover:bg-bright-orange hover:bg-opacity-80  ${
        visible ? "visible " : "invisible "
      } transition duration-[400ms] ease-in-out z-[9999]`}
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
