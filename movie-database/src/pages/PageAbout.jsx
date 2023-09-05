// Page - About

import { useEffect } from "react";
import { appTitle } from "../globals/globals";

const PageAbout = () => {
  useEffect(() => {
    document.title = `${appTitle} - About`;
  }, []);

  return (
    <section>
      <h2 className="bold text-blue-500">About Page</h2>
      <p>
        Saepe vitae deserunt cupiditate vel reiciendis adipisci quasi. At,
        dolore qui, saepe similique id repellat ipsam sapiente repellendus
        commodi deleniti natus itaque hic temporibus nam nobis tempora enim
        suscipit quas!
      </p>
    </section>
  );
};

export default PageAbout;
