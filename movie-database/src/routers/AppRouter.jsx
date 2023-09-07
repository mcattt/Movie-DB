// AppRouter

// Router Components
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
// Pages
import PageHome from "../pages/PageHome";

// import PageSingle from "../pages/PageSingle";
import PageAbout from "../pages/PageAbout";
import PageFavourites from "../pages/PageFavourites";
import PageNotFound from "../pages/PageNotFound";

function AppRouter() {
  return (
    <BrowserRouter>
      <div className="wrapper bg-[#0E0113]">
        <Header />
        <main >
          <Routes>
            <Route path="/" exact element={<PageHome />} />
            <Route path="/about" element={<PageAbout />} />
            <Route path="/favourites" element={<PageFavourites />} />
            {/* <Route
              path="/single/:id"
              exact
              element={<PageSingle />}
            /> */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;