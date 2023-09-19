import {
  Badge,
  Box,
  Center,
  Flex,
  Group,
  Image,
  Loader,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import logo from "../../assets/example.jpg";
import { useStyles } from "./styles";
import { backendUrl } from "../../constants";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useQuery } from "react-query";

const MyOrders = () => {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const theme = useMantineTheme();
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

  const { status } = useQuery(
    "fetchOrders",
    () => {
      return axios.get(backendUrl + `/order/${user?.userId}`, {
        // headers: {
        //   authorization: `Bearer ${user.token}`,
        // },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        data.map((item) => {
          item.serialNo = data.indexOf(item) + 1;
          item.customerName ?? "Guest User";
        });
        setOrders(data);
      },
    }
  );
  return (
    <Box>
      {status === "loading" ? (
        <Center>
          <Loader />
        </Center>
      ) : (
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
              <Image
                src={obj?.product[0]?.product?.images?.[0]}
                width={100}
                withPlaceholder
                fit="cover"
              />
              <Stack miw={200} spacing={"xs"}>
                <Text>Order No.</Text>
                <Text color={theme.colors.primary[0]}>{obj?.orderNo}</Text>
              </Stack>
              <Stack miw={200} spacing={"xs"}>
                <Text>Price</Text>
                <Text color={theme.colors.primary}>Rs. {obj?.totalPrice}</Text>
              </Stack>
              <Text miw={100} align="center">
                Quantity
                <br /> 1
              </Text>
              <Text miw={100} align="center">
                Date
                <br />
                {new Date(obj?.createdAt).getDate() + "-"+
                  new Date(obj?.createdAt).getMonth() +"-"+
                  new Date(obj?.createdAt).getFullYear()}
              </Text>
              <Badge variant="gradient" miw="100px">
                {obj?.status}
              </Badge>
            </Flex>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default MyOrders;
