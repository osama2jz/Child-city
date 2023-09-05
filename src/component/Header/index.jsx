import {
  Box,
  Burger,
  CloseButton,
  Divider,
  Flex,
  Indicator,
  Menu,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BrandFacebook,
  BrandInstagram,
  Heart,
  Mail,
  Phone,
  Search,
  ShoppingBag,
  User,
} from "tabler-icons-react";
import logo from "../../assets/logo.png";
import { useStyles } from "./styles";

const Header = ({ opened, toggle }) => {
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const navigate = useNavigate();
  const { classes } = useStyles({ opened });
  const [show, setShow] = useState(true);
  return (
    <>
      <Flex
        bg="#1e73be"
        style={{
          color: "white",
          display: show ? "flex" : "none",
          // borderBottom: "1px dashed white",
          position: "sticky",
          top: 0,
          zIndex: 999,
        }}
        justify={"center"}
        py="xs"
      >
        <Text
          fz={isMobile ? "8px" : "sm"}
          align="center"
          style={{ justifySelf: "flex-start" }}
          mr={isMobile ? 30 : 0}
          // w={isMobile ? "90%" : "100%"}
        >
          Free Delivery Available Over 2999. Flat 50% Off on All Summer
          Collection & Upto 20% Off on Pre Winter Collection.
        </Text>
        <CloseButton
          variant={"light"}
          onClick={() => setShow(false)}
          style={{ position: "absolute", right: isMobile ? 10 : 50 }}
        />
      </Flex>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "#1e73be",
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
            <Text fz={isMobile ? "xs" : "md"}>shop@childcity.shop,</Text>
          </Flex>
          <Flex gap="sm">
            <Phone />
            <Text fz={isMobile ? "xs" : "md"}> +92 300 7171197</Text>
          </Flex>
        </Flex>
        <Flex gap={"lg"} align={"center"}>
          <Text fz={isMobile ? "xs" : "md"}>Contact us on:</Text>
          <BrandFacebook
            className={classes.icon}
            onClick={() => window.open("", "_blank")}
          />
          <BrandInstagram
            className={classes.icon}
            onClick={() => window.open("", "_blank")}
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
          <img src={logo} width={isMobile ? 100 : 150} />
        </Flex>
        <Flex gap={"lg"} align={"center"} className={classes.navigationBar}>
          <Link
            className={classes.link}
            to="/product-category/New Born"
            onClick={() => isMobile && toggle()}
          >
            New Born
          </Link>
          <Menu trigger="hover">
            <Menu.Target>
              <Link
                className={classes.link}
                to="/product-category/Boys Clothing"
              >
                Boys Clothing
              </Link>
            </Menu.Target>
            <Menu.Dropdown>
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
              <Divider />
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
              <Divider />
              <Menu.Label>Traditional</Menu.Label>
              <Menu.Item
                onClick={() => {
                  isMobile && toggle();
                }}
              >
                Shalwar Kamez
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Menu trigger="hover">
            <Menu.Target>
              <Link
                className={classes.link}
                to="/product-category/Girls Clothing"
              >
                Girls Clothing
              </Link>
            </Menu.Target>
            <Menu.Dropdown>
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
              <Divider />
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
              <Divider />
              <Menu.Label>Frocks</Menu.Label>
              <Menu.Item
                onClick={() => {
                  isMobile && toggle();
                }}
              >
                Frocks
              </Menu.Item>
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
            to="/product-category/accessories"
            onClick={() => isMobile && toggle()}
          >
            Accessories
          </Link>
        </Flex>
        <Flex
          gap="md"
          className={classes.icons}
          align={"center"}
          style={{ transform: isMobile ? "scale(0.8)" : "" }}
        >
          <User className={classes.iconS} />
          <Indicator
            color="pink"
            label={"0"}
            size={"md"}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Heart className={classes.iconS} />
          </Indicator>
          <Indicator
            color="pink"
            size={"md"}
            label={"0"}
            style={{ display: "flex", alignItems: "center" }}
          >
            <ShoppingBag className={classes.iconS} />
          </Indicator>
          <Search className={classes.iconS} />
        </Flex>

        {isMobile && <Burger opened={opened} onClick={toggle} color="black" />}
      </Box>
    </>
  );
};
export default Header;
