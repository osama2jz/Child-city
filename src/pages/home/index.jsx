import {
  Box,
  Center,
  Flex,
  Group,
  Image,
  Loader,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useContext, useRef, useState } from "react";
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
import { UserContext } from "../../context/UserContext";
import { useQuery } from "react-query";
import { backendUrl } from "../../constants";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";

const Home = () => {
  const navigate = useNavigate();
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const { aboutUs } = useContext(UserContext);
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const [data, setData] = useState([]);
  const { status } = useQuery(
    "fetchProducts",
    () => {
      return axios.get(backendUrl + "/product", {});
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        let neww = data.filter((item) => !item.blocked && item.showOnHome);
        setData(neww);
      },
    }
  );
  return (
    <Box>
      <Carousel
        w="100%"
        withIndicators
        height={isMobile ? 250 : 550}
        loop
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        styles={{
          indicator: { backgroundColor: theme.colors.primary },
          viewport: {
            height: "100%",
          },
          container: {
            height: "100%",
          },
          slide: {
            height: "100%",
          },
          root: { aspectRatio: isMobile ? "5/2" : "3" },
        }}
      >
        {aboutUs?.sliderImages &&
          aboutUs?.sliderImages.map((obj, ind) => {
            return (
              <Carousel.Slide key={ind}>
                <Box className={classes.main}>
                  <Image
                    src={obj}
                    fit="cover"
                    height={"100%"}
                    width={"100%"}
                    styles={{ root: { height: "100%" } }}
                    // style={{ height:'100%' }}
                  />
                  <Group mt="xl" className={classes.buttons}>
                    <Button
                      label={"Shop Girls"}
                      compact={isMobile && true}
                      size={isMobile ? "xs" : "md"}
                      onClick={() => navigate("/product-category/Girls")}
                    />
                    <Button
                      label={"Shop Boys"}
                      size={isMobile ? "xs" : "md"}
                      compact={isMobile && true}
                      color="blue"
                      onClick={() => navigate("/product-category/Boys")}
                    />
                  </Group>
                </Box>
              </Carousel.Slide>
            );
          })}
      </Carousel>

      <Group position="center" spacing={"xl"} my="50px" mx="md">
        <CategoryCard
          img={boys}
          title1={"Boys"}
          title2={"Clothing"}
          text={"Incredible Quality"}
          to="/Boys"
        />
        <CategoryCard
          img={girls}
          title1={"Girls"}
          title2={"Clothing"}
          text={"World's Best Brands"}
          to="/Girls"
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
      <Group position="center" spacing={isMobile ? 20 : "70px"} my="50px">
        {status === "loading" ? (
          <Loader />
        ) : (
          data
            ?.slice(0, 12)
            .map((obj, ind) => <ProductCard data={obj} key={ind} />)
        )}
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
          <Button
            label={"Shop Colection"}
            onClick={() => navigate("/product-category/Girls")}
          />
        </Box>
        <Image src={pink} height={440} />
      </Flex>
    </Box>
  );
};

export default Home;
