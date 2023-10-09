import { Carousel } from "@mantine/carousel";
import React, { useState } from "react";
import ProductCard from "../ProductCard";
import { Box, Center, Loader, Title } from "@mantine/core";
import { useQuery } from "react-query";
import { backendUrl } from "../../constants";
import axios from "axios";

const SimilarProduct = ({ cat, id }) => {
  const [data, setData] = useState([]);
  //all products
  const { status } = useQuery(
    "fetchProductsSimilar",
    () => {
      return axios.get(backendUrl + "/product");
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        let neww = data.filter(
          (item) =>
            !item.blocked && item.category._id === cat && item._id !== id
        );
        setData(neww);
      },
    }
  );
  return (
    <Box>
      <Title align="center" order={2} my="xl">
        Similar Products
      </Title>
      {status === "loading" ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <Carousel
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
      )}
    </Box>
  );
};

export default SimilarProduct;
