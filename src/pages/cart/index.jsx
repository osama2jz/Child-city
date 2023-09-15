import {
  Anchor,
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
import React, { useEffect, useMemo, useState } from "react";
import logo from "../../assets/logo.png";
import { useStyles } from "./styles";
import { Trash, Upload } from "tabler-icons-react";
import Button from "../../component/Button";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const [paymentMode, setPaymentMode] = useState("cod");
  const [subtotal, setSubtotal] = useState(0);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("cart")) ?? []
  );
  useEffect(() => {
    setSubtotal(
      wishlist.reduce((acc, currentItem) => {
        let itemTotal = 0;
        if (currentItem.sale > 0) {
          itemTotal =
            currentItem.selectedQuantity *
            (currentItem?.price * ((100 - currentItem?.sale) / 100));
        } else {
          itemTotal = currentItem.selectedQuantity * currentItem.price;
        }
        return acc + itemTotal;
      }, 0)
    );
  }, [wishlist, subtotal]);

  const handleRemove = (data) => {
    let removed = wishlist.filter((obj) => obj?._id !== data?._id);
    localStorage.setItem("wishlist", JSON.stringify(removed));
    setWishlist(removed);
    toast.success("Removed from Wishlist!");
    return;
  };

  const handleQuantity = (value, data) => {
    setSubtotal(null);
    data.selectedQuantity = value;
    if (wishlist.some((obj) => obj?._id === data?._id)) {
      wishlist.map((obj, ind) => {
        if (obj?._id === data?._id) wishlist[ind] = data;
      });
      localStorage.setItem("cart", JSON.stringify(wishlist));
    }
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
          {wishlist.length > 0 ? (
            wishlist?.map((obj, ind) => (
              <Flex
                key={ind}
                align={"center"}
                justify={"space-around"}
                py="md"
                miw={500}
                bg={ind % 2 == 0 ? "" : "rgb(0,0,0,0.05)"}
              >
                <Image src={obj.images[0]} width={100} withPlaceholder />
                <Stack spacing={"2px"}>
                  <Anchor
                    onClick={() =>
                      navigate(`/product/${obj?._id}`, { state: { data: obj } })
                    }
                    color={theme.colors.primary}
                  >
                    {obj?.title}
                  </Anchor>
                  <Text>size: {obj?.selectedSize}</Text>
                  <Text>Color: {obj?.selectedColor}</Text>
                </Stack>
                <Group>
                  <Text
                    style={{ textDecoration: "line-through", opacity: 0.7 }}
                  >
                    Rs. {obj?.price}
                  </Text>
                  <Text color={theme.colors.primary}>
                    Rs. {obj?.price * ((100 - obj?.sale) / 100)}
                  </Text>
                </Group>
                <NumberInput
                  defaultValue={obj?.selectedQuantity}
                  w={70}
                  min={0}
                  onChange={(e) => handleQuantity(e, obj)}
                />
                <Trash
                  cursor={"pointer"}
                  color="red"
                  onClick={() => handleRemove(obj)}
                />
              </Flex>
            ))
          ) : (
            <Stack align="center" opacity={0.4}>
              <Image src={logo} width="200px" />
              <Title order={4} color={"gray"}>
                Your Cart is Empty
              </Title>
            </Stack>
          )}
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
            <Stack spacing={"5px"}>
              {wishlist.map((obj, ind) => {
                return (
                  <Text color="gray" key={ind}>
                    Rs{" "}
                    {obj?.sale ? obj.price - ((100 - obj.sale) / 100) : obj.price}{" "}
                    x {obj?.selectedQuantity}
                  </Text>
                );
              })}
              <Text
                color="black"
                style={{ borderBottom: "1px solid rgb(0,0,0,0.2)" }}
                pb={20}
              >
                Rs {subtotal}
              </Text>
            </Stack>
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
          <Group position="center" noWrap>
            <Button
              label={"Continue Shopping"}
              color="blue"
              size={isMobile ? "xs" : "md"}
              onClick={() => navigate("/")}
            />
            <Button label={"PROCEED TO PAY"} size={isMobile ? "xs" : "md"} />
          </Group>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Cart;
