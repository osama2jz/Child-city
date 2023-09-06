import {
  Box,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import logo from "../../assets/example.jpg";
import { useStyles } from "./styles";
import { Trash } from "tabler-icons-react";

const Wishlist = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [wishlist, setWishlist] = useState([
    {
      img: logo,
      title: "CC033-Girls Dresses",
      price: "2999",
      salePrice: "1999",
      inStock: true,
    },
    {
      img: logo,
      title: "CC033-Girls Dresses",
      price: "2999",
      salePrice: "1999",
      inStock: true,
    },
    {
      img: logo,
      title: "CC033-Girls Dresses",
      price: "2999",
      salePrice: "1999",
      inStock: true,
    },
    {
      img: logo,
      title: "CC033-Girls Dresses",
      price: "2999",
      salePrice: "1999",
      inStock: true,
    },
  ]);

  const handleRemove = (key) => {
    setWishlist(wishlist.filter((obj, ind) => ind !== key));
  };
  return (
    <Box>
      <Box className={classes.main}>
        <Title align="center" color="rgb(0,0,0,0.8)">
          My Wishlist
        </Title>
      </Box>
      <Stack my="100px" style={{ overflowX: "scroll" }}>
        {wishlist.map((obj, ind) => (
          <Flex
            key={ind}
            align={"center"}
            justify={"space-around"}
            py="md"
            miw={500}
            bg={ind % 2 == 0 ? "" : "rgb(0,0,0,0.05)"}
          >
            <Image src={obj.img} width={100} withPlaceholder />
            <Title color={theme.colors.primary} order={4}>
              {obj?.title}
            </Title>
            <Group>
              <Text style={{ textDecoration: "line-through", opacity: 0.7 }}>
                {obj?.price}
              </Text>
              <Text color={theme.colors.primary}>{obj?.salePrice}</Text>
            </Group>
            <Text>{obj?.inStock ? "In Stock" : "Out of Stock"}</Text>
            <Trash
              cursor={"pointer"}
              color="red"
              onClick={(e) => handleRemove(ind)}
            />
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};

export default Wishlist;
