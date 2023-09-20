import {
  Box,
  Center,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import logo from "../../assets/logo.png";
import { useStyles } from "./styles";
import { Trash } from "tabler-icons-react";
import toast from "react-hot-toast";
import Button from "../../component/Button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Wishlist = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const {  setWishlist } = useContext(UserContext);

  const [wishlistFromLocal, setWishlistFromLocal] = useState(
    JSON.parse(localStorage.getItem("wishlist")) ?? []
  );
  const handleRemove = (data) => {
    let removed = wishlistFromLocal.filter((obj) => obj?._id !== data?._id);
    localStorage.setItem("wishlist", JSON.stringify(removed));
    setWishlistFromLocal(removed);
    setWishlist(removed);
    toast.success("Removed from Wishlist!");
    return;
  };
  return (
    <Box>
      <Box className={classes.main}>
        <Title align="center" color="rgb(0,0,0,0.8)">
          My Wishlist
        </Title>
      </Box>
      <Stack
        my="100px"
        mx="2%"
        style={{
          overflowX: "scroll",
          border: wishlistFromLocal.length > 0 && "2px dashed rgb(0,0,0,0.1)",
          borderRadius: "10px",
        }}
      >
        {wishlistFromLocal.length > 0 ? (
          wishlistFromLocal.map((obj, ind) => (
            <Flex
              key={ind}
              align={"center"}
              justify={"space-around"}
              py="md"
              miw={500}
              bg={ind % 2 == 0 ? "" : "rgb(0,0,0,0.05)"}
            >
              <Image src={obj.images[0]} width={100} withPlaceholder />
              <Title color={theme.colors.primary} order={4}>
                {obj?.title}
              </Title>
              <Group>
                <Text style={{ textDecoration: "line-through", opacity: 0.7 }}>
                  Rs. {obj?.price}
                </Text>
                <Text color={theme.colors.primary}>
                  Rs. {obj?.price * ((100 - obj?.sale) / 100)}
                </Text>
              </Group>
              <Text>{obj?.quantity > 0 ? "In Stock" : "Out of Stock"}</Text>
              <Trash
                cursor={"pointer"}
                color="red"
                onClick={(e) => handleRemove(obj)}
              />
            </Flex>
          ))
        ) : (
          <Stack align="center" opacity={0.4}>
            <Image src={logo} width="200px" />
            <Title order={4} color={"gray"}>
              No Product Found in wishlist
            </Title>
          </Stack>
        )}
      </Stack>
      <Center mb="40px">
        <Button label={"Continue Shopping"} onClick={() => navigate("/")} />
      </Center>
    </Box>
  );
};

export default Wishlist;
