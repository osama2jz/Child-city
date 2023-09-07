import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { Box } from "@mantine/core";
import Home from "./pages/home";
import Inventory from "./pages/Inventory";
import Wishlist from "./pages/wishlist";
import ViewProduct from "./pages/viewProduct";
import Cart from "./pages/cart";
import { BrandWhatsapp } from "tabler-icons-react";
import Blog from "./pages/blog";
import Contact from "./pages/contact";
import AboutUs from "./pages/about";
import Shop from "./pages/shop";

const App = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <Box>
      <Header opened={opened} toggle={toggle} />
      <Box
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 999,
          padding: "10px",
          borderRadius: "50%",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: "#35bb49",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() =>
          window.open(
            `https://api.whatsapp.com/send?phone=+923367866668&text=Hello, I have a query`
          )
        }
      >
        <BrandWhatsapp color="white" size={30} />
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product-category/:cat/:subCat?/:size?"
          element={<Inventory />}
        />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:title" element={<ViewProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
