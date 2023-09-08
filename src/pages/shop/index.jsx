import React from "react";
import { useStyles } from "./styles";
import girls from "../../assets/girls.jpg";
import boys from "../../assets/boys.jpg";
import toys from "../../assets/toys.jpg";
import access from "../../assets/access.jpg";
import newBorn from "../../assets/newBorn.jpg";
import CategoryCard from "../home/CategoryCard";
import { Box, Group, Title } from "@mantine/core";

const Shop = () => {
  const { classes } = useStyles();
  return (
    <Box>
      <Box className={classes.main}>
        <Title align="center" color="rgb(0,0,0,0.8)">
          Baby Shop
        </Title>
      </Box>
      <Group position="center" my="50px" spacing={"30px"}>
        <CategoryCard
          img={boys}
          title1={"Boys"}
          title2={"Clothing"}
          text={"Incredible Quality"}
          to="/Clothing/Boys"
        />
        <CategoryCard
          img={girls}
          title1={"Girls"}
          title2={"Clothing"}
          text={"World's Best Brands"}
          to="/Clothing/Girls"
        />
        <CategoryCard
          img={toys}
          title1={"Toys"}
          title2={"& Games"}
          text={"For all ages"}
          to="/Toys & Games"
        />
        <CategoryCard
          img={access}
          title1={"Accessories"}
          title2={"kids"}
          text={"For all ages"}
          to="/Accessories"
        />
        <CategoryCard
          img={newBorn}
          title1={"New Born"}
          title2={"Babies"}
          text={"Cute Stuff"}
          to="/Clothing/New Born"
        />
      </Group>
    </Box>
  );
};

export default Shop;
