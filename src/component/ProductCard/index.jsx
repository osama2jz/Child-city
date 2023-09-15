import {
  Badge,
  Box,
  Group,
  Image,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import React, { useCallback, useState } from "react";
import logo from "../../assets/example.jpg";
import { useStyles } from "./styles";
import { Heart, ShoppingBag } from "tabler-icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ data }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [show, setShow] = useState(false);
  const { classes } = useStyles({ show });
  const [inWishlist, setInWishlist] = useState(false);

  const addToWishlist = useCallback(
    (e) => {
      e.stopPropagation();
      let dataToadd = data;
      let wishlistFromLocal =
        JSON.parse(localStorage.getItem("wishlist")) ?? [];
      if (wishlistFromLocal.some((obj) => obj?._id === data?._id)) {
        let removed = wishlistFromLocal.filter((obj) => obj?._id !== data?._id);
        localStorage.setItem("wishlist", JSON.stringify(removed));
        toast.success("Removed from Wishlist!");
        setInWishlist(false);
        return;
      }
      wishlistFromLocal.push(dataToadd);
      localStorage.setItem("wishlist", JSON.stringify(wishlistFromLocal));
      toast.success("Added to Wishlist!");
      setInWishlist(true);
    },
    [data]
  );
  return (
    <Box
      className={classes.main}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => navigate(`/product/${data?._id}`, { state: { data } })}
    >
      <Image
        src={data?.images?.[0]}
        withPlaceholder
        width={location === "/" ? 300 : 250}
        height={location === "/" ? 300 : 250}
        fit="contain"
      />
      <Badge
        w={50}
        h={50}
        className={classes.badge}
        bg={data?.sale ? theme.colors.primary[0] : "pink"}
      >
        {data?.sale ? "SALE" : "NEW"}
      </Badge>
      <Text>{data?.title || "Title"}</Text>
      <Group>
        {data?.sale && (
          <Text style={{ textDecoration: "line-through", opacity: 0.7 }}>
            Rs {data?.price || "1999"}
          </Text>
        )}
        <Text color={theme.colors.primary}>
          Rs {data?.price * ((100 - data?.sale) / 100)}
        </Text>
      </Group>
      <Group className={classes.hover}>
        <Tooltip label="Add to Cart">
          <ShoppingBag size={30} className={classes.icon} />
        </Tooltip>
        <Heart
          fill={inWishlist ? "red" : "black"}
          stroke={inWishlist ? "red" : "black"}
          size={30}
          className={classes.icon}
          onClick={(e) => addToWishlist(e)}
        />
      </Group>
    </Box>
  );
};

export default ProductCard;
