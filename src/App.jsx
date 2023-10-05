import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useContext, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { BrandMessenger, BrandWhatsapp, Search } from "tabler-icons-react";
import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Inventory from "./pages/Inventory";
import AboutUs from "./pages/about";
import Blog from "./pages/blog";
import Cart from "./pages/cart";
import Contact from "./pages/contact";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Shop from "./pages/shop";
import ViewProduct from "./pages/viewProduct";
import Wishlist from "./pages/wishlist";
import SaleAlert from "./pages/home/saleAlert";
import { SpotlightProvider } from "@mantine/spotlight";
import Spotlight from "./component/Spotlight";
import OrderReceipt from "./pages/cart/OrderReceipt";
import ViewBlog from "./pages/blog/ViewBlog";
import Faqs from "./pages/faqs";
import { UserContext } from "./context/UserContext";

const App = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { aboutUs } = useContext(UserContext);
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
      <SaleAlert />
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
      <Box
        style={{
          position: "fixed",
          bottom: 80,
          right: 20,
          zIndex: 999,
          padding: "10px",
          borderRadius: "50%",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: "#017cf7",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() =>
          window.open(`https://m.me/${aboutUs.facebook.split("/")[aboutUs.facebook.split("/").length-1]}`)
        }
      >
        <BrandMessenger color="white" size={30} />
      </Box>
      <SpotlightProvider
        searchPlaceholder="Search Product..."
        actions={Spotlight()}
        searchIcon={<Search size="1.2rem" />}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/product-category/:cat?/:subCat?/:size?"
            element={<Inventory />}
          />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:title" element={<ViewProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/my-dashboard" element={<Dashboard />} />
          <Route path="/order/receipt" element={<OrderReceipt />} />
          <Route path="/view-blog/:id" element={<ViewBlog />} />
          <Route path="/faqs" element={<Faqs />} />
        </Routes>
      </SpotlightProvider>
      <Footer />
    </Box>
  );
};

export default App;
