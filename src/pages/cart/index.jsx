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
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Trash, Upload } from "tabler-icons-react";
import logo from "../../assets/logo.png";
import Button from "../../component/Button";
import { backendUrl } from "../../constants";
import { uploadSingleFile } from "../../firebase";
import { useStyles } from "./styles";
import { UserContext } from "../../context/UserContext";

const Cart = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const now = new Date();
  const { user } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const [paymentMode, setPaymentMode] = useState("cod");
  const [subtotal, setSubtotal] = useState(0);
  const [validate, setValidate] = useState(false);
  const [file, setFile] = useState(null);
  const [coupenOff, setCoupenOff] = useState(0);
  const [loading, setLoading] = useState(null);
  const [address, setAddress] = useState({
    province: "",
    city: "",
    address: "",
    postalCode: null,
  });
  const [coupen, setCoupen] = useState("");
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("cart")) ?? []
  );

  //subtotal
  useEffect(() => {
    setSubtotal(
      Math.round(
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
      )
    );
  }, [wishlist, subtotal]);

  //remove
  const handleRemove = (data) => {
    let removed = wishlist.filter((obj) => obj?._id !== data?._id);
    localStorage.setItem("cart", JSON.stringify(removed));
    setWishlist(removed);
    toast.success("Removed from Cart!");
    return;
  };

  //quantity
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

  const Validate = () => {
    if (
      !address.city ||
      !address.province ||
      !address.address ||
      (paymentMode !== "cod" && !file)
    ) {
      setValidate(true);
      return;
    } else {
      handleOrder.mutate();
    }
  };
  const handleOrder = useMutation(
    async () => {
      const product = wishlist.map((obj) => ({
        product: obj,
        quantity: obj.selectedQuantity,
      }));
      //orderNumber
      const year = now.getFullYear() % 100;
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const randomComponent = Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, "0");

      let values = {
        address: address,
        product: product,
        paymentMode: paymentMode,
        totalPrice: subtotal + 149,
        status: "Pending",
        orderNo: "CC" + `${year}${month}${day}${randomComponent}`,
      };
      if (paymentMode !== "cod") values.paymentReceipt = file;
      if (user?.token) values.userId = user?.userId;
      return axios.post(`${backendUrl + "/order"}`, values, {});
    },
    {
      onSuccess: (response) => {
        toast.success("Order Placed");
        localStorage.setItem("cart", JSON.stringify([]));
        setWishlist([]);
      },
    }
  );

  const handleCoupen = useMutation(
    async () => {
      return await axios.post(`${backendUrl + `/coupen/${coupen}`}`, {});
    },
    {
      onSuccess: (response) => {
        toast.success("Coupen Applied");
        setCoupenOff(response.data.found);
      },
      onError: (err) => {
        toast.error("Invalid Coupen");
        setCoupenOff(0);
      },
    }
  );

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
                  {obj?.sale && (
                    <Text
                      style={{ textDecoration: "line-through", opacity: 0.7 }}
                    >
                      Rs. {obj?.price}
                    </Text>
                  )}
                  <Text color={theme.colors.primary}>
                    Rs. {obj?.price * ((100 - obj?.sale) / 100)}
                  </Text>
                </Group>
                <NumberInput
                  defaultValue={obj?.selectedQuantity}
                  w={70}
                  min={1}
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
        {wishlist.length > 0 && (
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
                      {obj?.sale
                        ? obj.price - (100 - obj.sale) / 100
                        : obj.price}{" "}
                      x {obj?.selectedQuantity}
                    </Text>
                  );
                })}
                <Text
                  color="black"
                  style={{ borderBottom: "1px solid rgb(0,0,0,0.2)" }}
                  pb={20}
                >
                  Rs {Math.round(subtotal)}
                </Text>
              </Stack>
              <Text fw={600}>Shipping</Text>
              <Stack
                style={{ borderBottom: "1px solid rgb(0,0,0,0.2)" }}
                pb={20}
              >
                <Text color="gray" fz="sm">
                  Rs 149
                </Text>
                <Text color="gray" fz="sm">
                  Shipping Address
                </Text>
                <Select
                  error={
                    validate && address.province.length < 1 && "Select Province"
                  }
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
                  onChange={(e) =>
                    setAddress((add) => ({ ...add, province: e }))
                  }
                />
                <TextInput
                  placeholder="City"
                  onChange={(e) =>
                    setAddress((add) => ({ ...add, city: e.target.value }))
                  }
                  error={
                    validate && address.city.length < 1 && "Enter City Name"
                  }
                />
                <TextInput
                  placeholder="Zip Code (Optional)"
                  type="number"
                  onChange={(e) =>
                    setAddress((add) => ({
                      ...add,
                      postalCode: e.target.value,
                    }))
                  }
                />
                <Textarea
                  placeholder="Address"
                  error={
                    validate && address.address.length < 1 && "Enter Address"
                  }
                  onChange={(e) =>
                    setAddress((add) => ({ ...add, address: e.target.value }))
                  }
                />
              </Stack>
              <Text fw={600}>Discount Coupen</Text>
              <Group position="apart">
                <TextInput
                  placeholder="Code"
                  maxLength={8}
                  w={120}
                  onChange={(e) => setCoupen(e.target.value)}
                />
                <Button
                  label={"Apply"}
                  compact={true}
                  size="xs"
                  disabled={coupen.length !== 8}
                  onClick={handleCoupen.mutate}
                />
              </Group>
              {coupenOff > 0 && <Text fw={600}>Coupen Discount: </Text>}
              {coupenOff > 0 && <Text>{coupenOff}% </Text>}
              <Text fw={600}>Total</Text>
              <Text
                fw={600}
                fz={"xl"}
                style={{ borderBottom: "1px solid rgb(0,0,0,0.2)" }}
                pb={20}
              >
                Rs. {(subtotal * (100 - coupenOff)) / 100 + 149}{" "}
                <small>(Including Tax)</small>
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
                  {paymentMode === "bank"
                    ? "(pk3242432432) "
                    : "(03367866668)  "}
                  and upload screenshot.
                </Text>
                <FileInput
                  placeholder="Upload Screenshot"
                  w={"175px"}
                  error={
                    validate && !file && "Please upload Payment Screenshot"
                  }
                  icon={<Upload color="gray" />}
                  radius={"30px"}
                  variant="filled"
                  accept="image/*,file/*"
                  onChange={(file) => {
                    uploadSingleFile({
                      file,
                      folderName: "Payments",
                      urlSetter: setFile,
                      setProgress: setLoading,
                    });
                  }}
                  styles={{
                    root: {
                      margin: "auto",
                    },
                    input: {
                      border: "1px dashed gray",
                    },
                    error: { textAlign: "center" },
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
              <Button
                label={"PROCEED TO PAY"}
                size={isMobile ? "xs" : "md"}
                disabled={wishlist.length < 1}
                onClick={Validate}
                loading={loading && loading < 100}
              />
            </Group>
          </Stack>
        )}
      </Flex>
    </Box>
  );
};

export default Cart;
