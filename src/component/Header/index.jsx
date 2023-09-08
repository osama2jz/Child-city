import {
  Box,
  Burger,
  CloseButton,
  Flex,
  Indicator,
  Menu,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
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

const Header = ({ opened, toggle }) => {
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [show, setShow] = useState(true);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { classes } = useStyles({ opened, show });
  return (
    <>
      {show && (
        <Flex
          bg={"#ff8087"}
          className={classes.delivery}
          justify={"center"}
          py="xs"
        >
          <marquee>
            Free Delivery Available Over 2999. Flat 50% Off on All Summer
            Collection & Upto 20% Off on Pre Winter Collection.
          </marquee>
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
              shop@childcity.shop
            </Text>
          </Flex>
          <Flex gap="sm">
            <Phone />
            <Text fz={isMobile ? "xs" : "md"} fw="bold">
              {" "}
              +92-336-7866668
            </Text>
          </Flex>
        </Flex>
        <Flex gap={"lg"} align={"center"}>
          <Text fz={isMobile ? "xs" : "md"} fw="bold">
            Contact us on:
          </Text>
          <BrandFacebook
            className={classes.icon}
            onClick={() =>
              window.open(
                "https://www.facebook.com/Childcity.shop?mibextid=ZbWKwL",
                "_blank"
              )
            }
          />
          <BrandInstagram
            className={classes.icon}
            onClick={() =>
              window.open(
                "https://instagram.com/childcity.shop?igshid=MzRlODBiNWFlZA==",
                "_blank"
              )
            }
          />
          <BrandYoutube
            className={classes.icon}
            onClick={() => window.open("www.youtube.com", "_blank")}
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
        <Flex
          align="center"
          className={classes.logo}
          onClick={() => navigate("/")}
        >
          <img src={logo} width={isMobile ? 100 : 100} />
        </Flex>
        <Flex gap={"lg"} align={"center"} className={classes.navigationBar}>
          <Link
            className={classes.link}
            to="/shop"
            onClick={() => isMobile && toggle()}
          >
            Shop All
          </Link>
          {/* <Link
            className={classes.link}
            to="/product-category/Clothing/New Born"
            onClick={() => isMobile && toggle()}
          >
            New Born
          </Link> */}
          <Menu trigger="hover">
            <Menu.Target>
              <Link
                className={classes.link}
                to="/product-category/Clothing/Boys"
              >
                Boys Clothing
              </Link>
            </Menu.Target>
            <Menu.Dropdown>
              <Flex>
                <Box>
                  <Menu.Label>Pre Winter</Menu.Label>
                  <Menu.Item
                    onClick={() => {
                      isMobile && toggle();
                    }}
                  >
                    3-9M
                  </Menu.Item>

                  <Menu.Item
                    onClick={() => {
                      isMobile && toggle();
                    }}
                  >
                    1-4Y
                  </Menu.Item>
                </Box>
                <Box>
                  <Menu.Label>Summer Collection</Menu.Label>
                  <Menu.Item
                    onClick={() => {
                      isMobile && toggle();
                    }}
                  >
                    3-6M
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      isMobile && toggle();
                    }}
                  >
                    6-9M
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      isMobile && toggle();
                    }}
                  >
                    9-12M
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      isMobile && toggle();
                    }}
                  >
                    1-2Y
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      isMobile && toggle();
                    }}
                  >
                    2-3Y
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      isMobile && toggle();
                    }}
                  >
                    3-4Y
                  </Menu.Item>
                </Box>
              </Flex>
            </Menu.Dropdown>
          </Menu>
          <Menu trigger="hover">
            <Menu.Target>
              <Link
                className={classes.link}
                to="/product-category/Clothing/Girls"
              >
                Girls Clothing
              </Link>
            </Menu.Target>
            <Menu.Dropdown>
              <Flex>
                <Box>
                  <Menu.Label>Pre Winter</Menu.Label>
                  <Menu.Item
                    onClick={() => {
                      isMobile && toggle();
                    }}
                  >
                    3-9M
                  </Menu.Item>

                  <Menu.Item
                    onClick={() => {
                      isMobile && toggle();
                    }}
                  >
                    1-4Y
                  </Menu.Item>
                </Box>
                <Box>
                  <Menu.Label>Summer Collection</Menu.Label>
                  <Menu.Item
                    onClick={() => {
                      isMobile && toggle();
                    }}
                  >
                    3-6M
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      isMobile && toggle();
                    }}
                  >
                    6-9M
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      isMobile && toggle();
                    }}
                  >
                    9-12M
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      isMobile && toggle();
                    }}
                  >
                    1-2Y
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      isMobile && toggle();
                    }}
                  >
                    2-3Y
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      isMobile && toggle();
                    }}
                  >
                    3-4Y
                  </Menu.Item>
                </Box>
              </Flex>
            </Menu.Dropdown>
          </Menu>
          <Link
            className={classes.link}
            to="/product-category/Toys & Games"
            onClick={() => isMobile && toggle()}
          >
            Toys & Games
          </Link>
          <Link
            className={classes.link}
            to="/product-category/Accessories"
            onClick={() => isMobile && toggle()}
          >
            Accessories
          </Link>
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
            label={"0"}
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
            label={"0"}
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
              onClick={() => setIsLoggedIn(false)}
            />
          ) : (
            <User className={classes.iconS} onClick={() => setOpen(true)} />
          )}
        </Flex>
        {isMobile && <Burger opened={opened} onClick={toggle} color="black" />}
      </Box>
      <Signin open={open} setOpen={setOpen} />
    </>
  );
};
export default Header;
