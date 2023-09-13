import {
  Box,
  Center,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import { useStyles } from "./styles";
import Button from "../../component/Button";
import CategoryCard from "./CategoryCard";
import girls from "../../assets/girls.jpg";
import boys from "../../assets/boys.jpg";
import toys from "../../assets/toys.jpg";
import pink from "../../assets/pink.jpg";
import ProductCard from "../../component/ProductCard";
import wave1 from "../../assets/wave-top.png";
import wave2 from "../../assets/wave-mid.png";
import wave3 from "../../assets/wave-bot.png";
import { useNavigate } from "react-router-dom";
import { Carousel } from "@mantine/carousel";

const Home = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const [data, setData] = useState([
    {
      category: "Clothing",
      title: "This is a title",
      gender: "Girls",
      type: "Kamez Shalwar",
      size: ["1-2Y", "2-3Y", "3-4Y", "3-6M"],
      season: "summer",
      price: 1999,
      salePrice: 1500,
    },
    {
      category: "Clothing",
      title: "Some dress",
      gender: "Boys",
      type: "Western",
      season: "winter",
      size: ["1-2Y", "3-4Y", "3-6M"],
      price: 1500,
      salePrice: 900,
    },
    {
      category: "Clothing",
      gender: "Boys",
      title: "Pretty dress",
      type: "Western",
      season: "summer",
      size: ["1-2Y", "2-3Y", "3-4Y", "6-9M"],
      price: 800,
    },
    {
      category: "Clothing",
      gender: "Girls",
      title: "Pretty dress for girls",
      type: "Kamez Shalwar",
      season: "Winter Collection",
      size: ["1-2Y", "2-3Y", "3-4Y", "6-9M"],
      price: 800,
    },
    {
      category: "Accessories",
      title: "Pretty Socks",
      season: "Winter Collection",
      size: ["1-2Y", "2-3Y", "3-4Y", "6-9M"],
      price: 800,
    },
  ]);
  return (
    <Box>
      <Carousel
        w="100%"
        withIndicators
        height={550}
        loop
        styles={{ indicator: { backgroundColor: theme.colors.primary } }}
      >
        <Carousel.Slide>
          <Box className={classes.main}>
            <Title fz={isMobile ? 60 : 80} ff={"satisfy"}>
              Shine Bright
            </Title>
            <Title order={3}>Like a Superstar</Title>
            <Group mt="xl">
              <Button
                label={"Shop Girls"}
                onClick={() => navigate("/product-category/Clothing/Girls")}
              />
              <Button
                label={"Shop Boys"}
                color="blue"
                onClick={() => navigate("/product-category/Clothing/Boys")}
              />
            </Group>
            <Image src={wave1} className={classes.wave} />
            <Image src={wave2} className={classes.wave2} />
            <Image src={wave3} className={classes.wave1} />
          </Box>
        </Carousel.Slide>
        <Carousel.Slide>
          <Box className={classes.main}>
            <Title fz={isMobile ? 60 : 80} ff={"satisfy"}>
              Shine Bright
            </Title>
            <Title order={3}>Like a Superstar</Title>
            <Group mt="xl">
              <Button
                label={"Shop Girls"}
                onClick={() => navigate("/product-category/Clothing/Girls")}
              />
              <Button
                label={"Shop Boys"}
                color="blue"
                onClick={() => navigate("/product-category/Clothing/Boys")}
              />
            </Group>
            <Image src={wave1} className={classes.wave} />
            <Image src={wave2} className={classes.wave2} />
            <Image src={wave3} className={classes.wave1} />
          </Box>
        </Carousel.Slide>
      </Carousel>

      <Group position="center" spacing={"xl"} my="50px" mx="md">
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
      </Group>
      <Group position="center" my="md" onClick={() => navigate("/shop")}>
        <Button label={"Shop All"} />
      </Group>
      <Stack align="center">
        <Title ff={"satisfy"} fz={60} color="rgb(0,0,0,0.7)">
          You'll ❤ This
        </Title>
        <Text align="center" color="gray">
          We’ve picked few pieces we’re pretty sure you’ll love.
          <br /> Check back often and enjoy.
        </Text>
      </Stack>
      <Group position="center" spacing={isMobile ? 20 : "50px"} my="50px">
        {data?.map((obj, ind) => (
          <ProductCard data={obj} key={ind} />
        ))}
      </Group>
      <Center mb="50px">
        <Button
          label={"Shop All Products"}
          color="blue"
          onClick={() => navigate("/product-category")}
        />
      </Center>
      <Flex direction={{ lg: "row", base: "column" }} mb="xl">
        <Box className={classes.dark}>
          <Text>BACK TO SCHOOL</Text>
          <Title fz={isMobile ? 40 : 60} ff={"satisfy"}>
            Girls Collection
          </Title>
          <Text fz={isMobile ? "sm" : "md"} px={{ lg: 100, base: 10 }}>
            We celebrate childhood by supporting babies, children, and families
            with thoughtful designs, quality materials and construction, and
            convenient shopping options.
          </Text>
          <Button label={"Shop Colection"} />
        </Box>
        <Image src={pink} height={440} />
      </Flex>
    </Box>
  );
};

export default Home;
