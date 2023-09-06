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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product-category/:cat/:subCat?/:size?"
          element={<Inventory />}
        />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:title" element={<ViewProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
