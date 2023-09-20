import {
  Box,
  Center,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import logo from "../../assets/logo.png";
import { useStyles } from "./styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../component/Button";

const OrderReceipt = () => {
  const { classes } = useStyles();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(state?.data ?? {});
  useEffect(() => {
    setReceipt(state?.data);
  }, [state?.data]);
  console.log(receipt);
  return (
    <Box>
      <Box className={classes.main}>
        <Title align="center" color="rgb(0,0,0,0.8)">
          Shopping Cart
        </Title>
      </Box>
      <Box
        style={{
          border: "2px dashed rgb(0,0,0,0.1)",
          width: "90%",
          borderRadius: "20px",
          padding: "50px",
          margin: "50px auto",
        }}
      >
        <Group position="right">
          <Title style={{ margin: "auto" }}> Order Invoice</Title>
          <Image src={logo} width={100} />
        </Group>
        <Stack>
          <Text>
            <b>Name: </b>Muhammad Usama
          </Text>
          <Text>
            <b>Order #: </b>
            {receipt?.orderNo}
          </Text>
          <Text>
            <b>Date: </b>
            {new Date().toLocaleDateString()}
          </Text>
          <Text>
            <b>Delivery Address: </b>
            {receipt.address.address +
              ", " +
              receipt.address.city +
              ", " +
              receipt.address.province}
          </Text>
          <Title align="center" order={3}>
            {" "}
            Order Details
          </Title>
          <Grid bg="rgb(0,0,0,0.1)">
            <Grid.Col span={2}>
              <Title order={5}>Qty.</Title>
            </Grid.Col>
            <Grid.Col span={6}>
              <Title order={5}>Product</Title>
            </Grid.Col>
            <Grid.Col span={2}>
              <Title order={5}>Unit Price</Title>
            </Grid.Col>
            <Grid.Col span={2}>
              <Title order={5}>Amount</Title>
            </Grid.Col>
          </Grid>
          {receipt.product.map((obj, ind) => (
            <Grid key={ind}>
              <Grid.Col span={2}>
                <Text order={5}>{obj?.quantity}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Box>
                  <Text fw="bold">{obj?.product?.title}</Text>
                  {obj?.product?.selectedColor && (
                    <Text fz={"sm"}>Color: {obj?.product?.selectedColor}</Text>
                  )}
                  {obj?.product?.selectedSize && (
                    <Text fz={"sm"}>Size: {obj?.product?.selectedSize}</Text>
                  )}
                </Box>
              </Grid.Col>
              <Grid.Col span={2}>
                <Text>
                  Rs.{" "}
                  {obj?.product?.sale > 0
                    ? (obj?.product?.price * (100 - obj?.product?.sale)) / 100
                    : obj?.product?.price}
                </Text>
              </Grid.Col>
              <Grid.Col span={2}>
                <Text>
                  Rs.{" "}
                  {obj?.product?.sale > 0
                    ? Math.round(
                        ((obj?.product?.price * (100 - obj?.product?.sale)) /
                          100) *
                          obj?.quantity
                      )
                    : obj?.product?.price * obj?.quantity}
                </Text>
              </Grid.Col>
            </Grid>
          ))}
          <Group position="right">
            <Text>
              SubTotal:{" "}
              {receipt?.totalPrice < 3000
                ? receipt?.totalPrice - 149
                : receipt?.totalPrice}
            </Text>
          </Group>
          <Group position="right">
            <Text>Delivery: {receipt.totalPrice > 3000 ? 0 : 149}</Text>
          </Group>
          <Group position="right">
            <Text fw={"bold"}>Total: {receipt?.totalPrice}</Text>
          </Group>
        </Stack>
      </Box>
      <Center my="xl">
        <Button
          label={"Continue Shopping"}
          color="blue"
          onClick={() => navigate("/")}
        />
      </Center>
    </Box>
  );
};

export default OrderReceipt;
