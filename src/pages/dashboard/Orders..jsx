import {
  Badge,
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
import { useStyles } from "./styles";
import logo from "../../assets/example.jpg";
import { useMediaQuery } from "@mantine/hooks";

const MyOrders = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const [orders, setOrders] = useState([
    {
      img: logo,
      title: "CC033-Girls Dresses",
      price: "2999",
      salePrice: "1999",
      inStock: true,
      size: "1-2Y",
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
  return (
    <Box>
      <Stack style={{ overflowX: "scroll" }} my="xl">
        {orders.map((obj, ind) => (
          <Flex
            key={ind}
            align={"center"}
            justify={"space-around"}
            py="md"
            gap="xl"
            miw={1000}
            bg={ind % 2 == 0 ? "" : "rgb(0,0,0,0.05)"}
          >
            <Image src={obj.img} width={100} withPlaceholder />
            <Stack miw={200} spacing={"xs"}>
              <Text color={theme.colors.primary}>{obj?.title}</Text>
              <Text>size: {obj?.size}</Text>
            </Stack>
            <Group>
              <Text style={{ textDecoration: "line-through", opacity: 0.7 }}>
                {obj?.price}
              </Text>
              <Text color={theme.colors.primary}>{obj?.salePrice}</Text>
            </Group>
            <Text miw={100} align="center">
              Quantity
              <br /> 1
            </Text>
            <Text miw={100} align="center">
              Date
              <br />
              10-aug-2023
            </Text>
            <Badge variant="gradient" miw="100px">
              Delivered
            </Badge>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};

export default MyOrders;
