import {
  Box,
  Burger,
  CloseButton,
  Flex,
  Indicator,
  Loader,
  Menu,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BrandFacebook,
  BrandInstagram,
  BrandYoutube,
  Heart,
  Logout,
  Mail,
  Phone,
  Search,
  ShoppingBag,
  User,
} from "tabler-icons-react";
import logo from "../../assets/logo.png";
import { useStyles } from "./styles";
import Signin from "../../pages/Signin";
import { spotlight } from "@mantine/spotlight";
import { UserContext } from "../../context/UserContext";
import { useQuery } from "react-query";
import { backendUrl, sizes } from "../../constants";
import axios from "axios";

const Header = ({ opened, toggle }) => {
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { aboutUs, cart, wishlist, user, setUser } = useContext(UserContext);
  const [show, setShow] = useState(true);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(user?.token ? true : false);
  const { classes } = useStyles({ opened, show });
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setIsLoggedIn(user?.token ? true : false);
  }, [user?.token]);
  const { status } = useQuery(
    "fetchCategories",
    () => {
      return axios.get(backendUrl + "/category", {});
    },
    {
      onSuccess: (res) => {
        let cat = res.data.data.filter((obj) => !obj?.blocked);
        setCategories(cat);
      },
    }
  );
  return (
    <>
      {show && aboutUs?.topAlert?.length > 0 && (
        <Flex
          bg={"#ff8087"}
          className={classes.delivery}
          justify={"center"}
          py="xs"
        >
          <marquee>{aboutUs?.topAlert}</marquee>
          <CloseButton
            variant={"light"}
            onClick={() => setShow(false)}
            style={{ position: "absolute", right: isMobile ? 10 : 50 }}
          />
        </Flex>
      )}
      <Box
        style={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: theme.colors.primary[0],
          color: "white",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          paddingBlock: "10px",
        }}
      >
        <Flex align={"center"} gap={"md"} wrap={"wrap"} justify={"center"}>
          <Flex gap={"sm"}>
            <Mail />
            <Text fz={isMobile ? "xs" : "md"} fw="bold">
              {aboutUs?.primaryEmail}
            </Text>
          </Flex>
          <Flex gap="sm">
            <Phone />
            <Text fz={isMobile ? "xs" : "md"} fw="bold">
              {aboutUs?.primaryPhone}
            </Text>
          </Flex>
        </Flex>
        <Flex gap={"lg"} align={"center"}>
          <Text fz={isMobile ? "xs" : "md"} fw="bold">
            Contact us on:
          </Text>
          <BrandFacebook
            className={classes.icon}
            onClick={() => window.open(aboutUs?.facebook, "_blank")}
          />
          <BrandInstagram
            className={classes.icon}
            onClick={() => window.open(aboutUs?.instagram, "_blank")}
          />
          <BrandYoutube
            className={classes.icon}
            onClick={() => window.open(aboutUs?.youtube, "_blank")}
          />
        </Flex>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          position: "relative",
          paddingBlock: isMobile ? "10px" : "10px",
          backgroundColor: "white",
          boxShadow: "0px 5px 5px rgb(0,0,0,0.1)",
        }}
      >
        {isMobile && <Burger opened={opened} onClick={toggle} color="black" />}
        <Flex
          align="center"
          className={classes.logo}
          onClick={() => navigate("/")}
        >
          <img src={logo} width={isMobile ? 70 : 100} />
        </Flex>
        <Flex gap={"lg"} align={"center"} className={classes.navigationBar}>
          {status === "loading" ? (
            <Loader />
          ) : (
            categories.slice(0, 6).map((obj, ind) => {
              if (obj?.subCategories.length < 1)
                return (
                  <Link
                    key={ind}
                    className={classes.link}
                    to={`/product-category/${obj?.title}`}
                    onClick={() => isMobile && toggle()}
                  >
                    {obj?.title}
                  </Link>
                );
              else {
                return (
                  <Menu trigger="hover" key={ind}>
                    <Menu.Target>
                      <Link
                        className={classes.link}
                        to={`/product-category/${obj?.title}`}
                      >
                        {obj?.title}
                      </Link>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Flex>
                        {obj?.subCategories.map((sub, ind2) => (
                          <Box key={ind2}>
                            <Menu.Label
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                isMobile && toggle();
                                navigate(
                                  `/product-category/${obj?.title}/${sub.title}`
                                );
                              }}
                            >
                              {sub?.title}
                            </Menu.Label>
                            {sub?.showFilters &&
                              sizes.map((size, s) => (
                                <Menu.Item
                                  key={s}
                                  onClick={() => {
                                    isMobile && toggle();
                                    navigate(
                                      `/product-category/${obj?.title}/${sub?.title}/${size}`
                                    );
                                  }}
                                >
                                  {size}
                                </Menu.Item>
                              ))}
                          </Box>
                        ))}
                      </Flex>
                    </Menu.Dropdown>
                  </Menu>
                );
              }
            })
          )}
          {isLoggedIn && (
            <Link
              className={classes.link}
              to="/my-dashboard"
              onClick={() => isMobile && toggle()}
            >
              My Dashboard
            </Link>
          )}
        </Flex>
        <Flex
          gap="md"
          className={classes.icons}
          align={"center"}
          style={{ transform: isMobile ? "scale(0.8)" : "" }}
        >
          <Search className={classes.iconS} onClick={spotlight.open} />
          <Indicator
            color="pink"
            label={wishlist?.length}
            styles={{ indicator: { width: 15 } }}
            size={"md"}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Heart
              className={classes.iconS}
              onClick={() => navigate("/wishlist")}
            />
          </Indicator>
          <Indicator
            color="pink"
            size={"md"}
            styles={{ indicator: { width: 15 } }}
            label={cart?.length}
            style={{ display: "flex", alignItems: "center" }}
          >
            <ShoppingBag
              className={classes.iconS}
              onClick={() => navigate("/cart")}
            />
          </Indicator>
          {isLoggedIn ? (
            <Logout
              className={classes.iconS}
              onClick={() => {
                localStorage.removeItem("user");
                setIsLoggedIn(false);
                window.location.href = "/";
              }}
            />
          ) : (
            <User className={classes.iconS} onClick={() => setOpen(true)} />
          )}
        </Flex>
      </Box>
      <Signin open={open} setOpen={setOpen} />
    </>
  );
};
export default Header;
