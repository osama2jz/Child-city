import {
  Box,
  FileInput,
  Flex,
  Group,
  Image,
  NumberInput,
  Radio,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import logo from "../../assets/example.jpg";
import { useStyles } from "./styles";
import { File, Trash, Upload } from "tabler-icons-react";
import Button from "../../component/Button";
import { useMediaQuery } from "@mantine/hooks";

const Cart = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const [paymentMode, setPaymentMode] = useState("cod");
  const [wishlist, setWishlist] = useState([
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
  const handleRemove = (key) => {
    setWishlist(wishlist.filter((obj, ind) => ind !== key));
  };
  return (
    <Box>
      <Box className={classes.main}>
        <Title align="center" color="rgb(0,0,0,0.8)">
          Shopping Cart
        </Title>
      </Box>
      <Flex
        justify={"space-evenly"}
        my="100px"
        gap="lg"
        direction={isMobile ? "column" : "row"}
      >
        <Stack w={isMobile ? "100%" : "60%"} style={{ overflowX: "scroll" }}>
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
              <Stack>
                <Text color={theme.colors.primary}>{obj?.title}</Text>
                <Text>size: {obj?.size}</Text>
              </Stack>
              <Group>
                <Text style={{ textDecoration: "line-through", opacity: 0.7 }}>
                  {obj?.price}
                </Text>
                <Text color={theme.colors.primary}>{obj?.salePrice}</Text>
              </Group>
              <NumberInput value={1} w={70} />
              <Trash
                cursor={"pointer"}
                color="red"
                onClick={() => handleRemove(ind)}
              />
            </Flex>
          ))}
        </Stack>
        <Stack className={classes.details} w={isMobile ? "100%" : "35%"}>
          <Text
            fw={500}
            style={{ borderBottom: "1px solid rgb(0,0,0,0.2)" }}
            pb={20}
          >
            Cart Totals
          </Text>
          <SimpleGrid cols={2}>
            <Text fw={600}>Subtotal</Text>
            <Text
              color="gray"
              style={{ borderBottom: "1px solid rgb(0,0,0,0.2)" }}
              pb={20}
            >
              Rs 1590
            </Text>
            <Text fw={600}>Shipping</Text>
            <Stack style={{ borderBottom: "1px solid rgb(0,0,0,0.2)" }} pb={20}>
              <Text color="gray" fz="sm">
                Rs 149
              </Text>
              <Text color="gray" fz="sm">
                Shipping Address
              </Text>
              <Select
                placeholder="Province"
                data={[
                  "Azad Kashmir",
                  "Balochistan",
                  "FATA",
                  "Gilgit Baltistan",
                  "Isalamabad",
                  "KPK",
                  "Punjab",
                  "Sindh",
                ]}
              />
              <TextInput placeholder="City" />
              <TextInput placeholder="Zip Code (Optional)" />
              <Textarea placeholder="Address" />
            </Stack>
            <Text fw={600}>Discount Coupen</Text>
            <Group position="apart">
              <TextInput placeholder="Code" w={120} />
              <Button label={"Apply"} compact={true} size="xs" />
            </Group>
            <Text fw={600}>Total</Text>
            <Text
              fw={600}
              fz={"xl"}
              style={{ borderBottom: "1px solid rgb(0,0,0,0.2)" }}
              pb={20}
            >
              1,747 <small>(Including Tax)</small>
            </Text>
            <Text fw={600}>Payment Mode</Text>
            <Radio.Group defaultValue={paymentMode} onChange={setPaymentMode}>
              <Stack spacing={"xs"}>
                <Radio value="cod" label="Cash On Delivery" />
                <Radio value="easypaisa" label="Easypaisa" />
                <Radio value="jazzcash" label="Jazzcash" />
                <Radio value="bank" label="Bank" />
              </Stack>
            </Radio.Group>
          </SimpleGrid>
          {paymentMode !== "cod" && (
            <Box>
              <Text fz="sm" align="center">
                Please transfer the amount on the account number{" "}
                {paymentMode === "bank" ? "(pk3242432432) " : "(03367866668)  "}
                and upload screenshot.
              </Text>
              <FileInput
                placeholder="Upload Screenshot"
                w={"175px"}
                icon={<Upload color="gray" />}
                radius={"30px"}
                variant="filled"
                style={{
                  border: "1px dashed gray",
                  borderRadius: "30px",
                  margin: "auto",
                }}
              />
            </Box>
          )}

          <Button label={"PROCEED TO PAY"} />
        </Stack>
      </Flex>
    </Box>
  );
};

export default Cart;
