import { Carousel } from "@mantine/carousel";
import React, { useState } from "react";
import ProductCard from "../ProductCard";
import { Box, Title } from "@mantine/core";

const SimilarProduct = () => {
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
      <Title align="center" order={2} my="xl">Similar Products</Title>
      <Carousel
        withIndicators
        height={350}
        slideSize="25%"
        slideGap="md"
        loop
        align="start"
        styles={{ indicator: { backgroundColor: "pink" } }}
        breakpoints={[
          { maxWidth: "md", slideSize: "50%" },
          { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
        ]}
      >
        {data.map((obj, ind) => (
          <Carousel.Slide
            key={ind}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <ProductCard data={obj} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
};

export default SimilarProduct;
