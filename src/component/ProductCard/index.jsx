import {
  Badge,
  Box,
  Group,
  Image,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag } from "tabler-icons-react";
import { UserContext } from "../../context/UserContext";
import { useStyles } from "./styles";
import ReactPixel from 'react-facebook-pixel';

const ProductCard = ({ data }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 500px)");
  const { setWishlist } = useContext(UserContext);
  const location = useLocation().pathname;
  const [show, setShow] = useState(false);
  const { classes } = useStyles({ show });
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    ReactPixel.pageView();
  }, []);

  useEffect(() => {
    let wishlistFromLocal = JSON.parse(localStorage.getItem("wishlist")) ?? [];
    if (wishlistFromLocal.some((obj) => obj?._id === data?._id)) {
      setInWishlist(true);
    }
  }, [setInWishlist, data?._id]);
  const addToWishlist = useCallback(
    (e) => {
      e.stopPropagation();
      let dataToadd = data;
      let wishlistFromLocal =
        JSON.parse(localStorage.getItem("wishlist")) ?? [];
      if (wishlistFromLocal.some((obj) => obj?._id === data?._id)) {
        let removed = wishlistFromLocal.filter((obj) => obj?._id !== data?._id);
        localStorage.setItem("wishlist", JSON.stringify(removed));
        setWishlist(removed);
        toast.success("Removed from Wishlist!");
        setInWishlist(false);
        return;
      }
      wishlistFromLocal.push(dataToadd);
      localStorage.setItem("wishlist", JSON.stringify(wishlistFromLocal));
      setWishlist(wishlistFromLocal);
      toast.success("Added to Wishlist!");
      setInWishlist(true);
    },
    [data, setWishlist]
  );
  return (
    <Box
      className={classes.main}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      mb="md"
      onClick={() => navigate(`/product/${data?._id}`, { state: { data } })}
    >
      <Image
        src={data?.images?.[0]}
        withPlaceholder
        width={isMobile ? 170 : 250}
        height={isMobile ? 190 : 250}
        fit="cover"
        styles={{ image: { borderRadius: "10px" } }}
      />
      {data.quantity > 0 ? (
        <Badge
          w={50}
          h={50}
          fz={data?.sale ? 11 : 12}
          className={classes.badge}
          bg={data?.sale ? theme.colors.primary[0] : "pink"}
        >
          {data?.sale
            ? data?.sale + "% Off"
            : data.quantity > 0
            ? "NEW"
            : "Out Of Stock"}
        </Badge>
      ) : (
        <Badge w={120}fz={12} className={classes.badge} bg="gray">
          Out Of Stock
        </Badge>
      )}
      <Text align="center">{data?.title || "Title"}</Text>
      <Group>
        {data?.sale && (
          <Text style={{ textDecoration: "line-through", opacity: 0.7 }}>
            Rs {data?.price || "1999"}
          </Text>
        )}
        <Text color={theme.colors.primary}>
          Rs {Math.round(data?.price * ((100 - data?.sale) / 100))}
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
