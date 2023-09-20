import { Box, Group, Image, Stack, Text, Title } from "@mantine/core";
import logo from "../../assets/logo.png";
import { useStyles } from "./styles";

const OrderReceipt = () => {
  const { classes } = useStyles();
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
          <Title style={{ margin: "auto" }}> Order Receipt</Title>
          <Image src={logo} width={100} />
        </Group>
        <Stack>
          <Text>
            <b>Name: </b>Muhammad Usama
          </Text>
          <Text>
            <b>Order #: </b>CC3243243
          </Text>
          <Text>
            <b>Date: </b>12-aug-2020
          </Text>
          <Text>
            <b>Date: </b>12-aug-2020
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default OrderReceipt;
