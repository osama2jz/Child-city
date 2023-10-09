import { Carousel } from "@mantine/carousel";
import {
  Box,
  Center,
  CheckIcon,
  Chip,
  ColorSwatch,
  Flex,
  Group,
  Image,
  List,
  Loader,
  NumberInput,
  Stack,
  Text,
  Title,
  Tooltip,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import { Heart } from "tabler-icons-react";
import Button from "../../component/Button";
import SimilarProduct from "../../component/SimilarProducts";
import { UserContext } from "../../context/UserContext";
import colorNameList from "color-name-list/dist/colornames.esm.mjs";
import { useQuery, useQueryClient } from "react-query";
import { backendUrl } from "../../constants";
import axios from "axios";

const ViewProduct = () => {
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  const { setCart, setWishlist } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const { data: statedData } = useLocation()?.state || {};
  const [data, setData] = useState(statedData);
  const { title } = useParams();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    let wishlistFromLocal = JSON.parse(localStorage.getItem("wishlist")) ?? [];
    setInWishlist(wishlistFromLocal.some((obj) => obj?._id === data?._id));
  }, [data?._id]);

  useEffect(() => {
    setData(statedData);
    queryClient.invalidateQueries("fetchProductsSimilar");
  }, [queryClient, statedData]);

  const { status } = useQuery(
    "fetchSingleProduct",
    () => {
      return axios.get(backendUrl + `/product/${title}`);
    },
    {
      onSuccess: (res) => {
        setData(res.data.data);
      },
    }
  );

  const addToCart = () => {
    if (
      (data.colors.length > 0 && !selectedColor) ||
      (data?.sizes.length > 0 && !selectedSize) ||
      selectedQuantity < 1 ||
      data?.quantity < 1
    ) {
      toast.error("Please Select all fields");
      return;
    }
    let dataToadd = data;
    dataToadd.selectedColor = selectedColor;
    dataToadd.selectedSize = selectedSize;
    dataToadd.selectedQuantity = selectedQuantity;
    let cartFromLocal = JSON.parse(localStorage.getItem("cart")) ?? [];
    if (
      cartFromLocal.some(
        (obj) =>
          obj?._id == dataToadd?._id &&
          obj?.selectedColor === dataToadd?.selectedColor &&
          obj?.selectedSize === dataToadd?.selectedSize
      )
    ) {
      cartFromLocal.map((obj, ind) => {
        if (
          obj?.selectedColor === dataToadd?.selectedColor &&
          obj?.selectedSize === dataToadd?.selectedSize
        )
          cartFromLocal[ind] = dataToadd;
      });
      localStorage.setItem("cart", JSON.stringify(cartFromLocal));
      setCart(cartFromLocal);
    } else {
      cartFromLocal.push(dataToadd);
      setCart(cartFromLocal);
      localStorage.setItem("cart", JSON.stringify(cartFromLocal));
    }
    toast.success("Added to Cart!");
  };

  const addToWishlist = useCallback(() => {
    let dataToadd = data;
    let wishlistFromLocal = JSON.parse(localStorage.getItem("wishlist")) ?? [];
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
  }, [data, setWishlist]);

  return status === "loading" ? (
    <Center my="100px">
      <Loader m="auto" />
    </Center>
  ) : (
    <Box>
      <Flex
        p="xl"
        gap={"100px"}
        direction={isMobile ? "column" : "row"}
        align={"center"}
      >
        <Box
          w={isMobile ? "100%" : "50%"}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Carousel
            w={isMobile ? 350 : 500}
            withIndicators
            slidesToScroll={1}
            slideSize={"100%"}
            height={isMobile ? 420 : 600}
            styles={{
              indicator: {
                width: rem(12),
                height: rem(4),
                transition: "width 250ms ease",
                "&[data-active]": {
                  width: rem(40),
                },
              },
            }}
          >
            {data?.images.map((img, ind) => (
              <Carousel.Slide
                key={ind}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {img.includes(".mp4") ? (
                  <iframe
                    style={{
                      width: "100%",
                      height: "100%",
                      // minHeight: "500px",
                    }}
                    src={img}
                  />
                ) : (
                  <Image
                    src={img}
                    width={isMobile ? 350 : 500}
                    fit="cover"
                    height={isMobile ? 420 : 600}
                  />
                )}
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>
        <Stack
          spacing={20}
          miw={isMobile ? "95%" : "30%"}
          style={{
            border: "2px dashed rgb(0,0,0,0.1)",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <Title>{data?.title}</Title>

          {data?.colors.length > 0 && (
            <Group>
              <Text>
                Colors: <b>{selectedColor}</b>
              </Text>
              {data?.colors.map((color, ind) => {
                let someNamedColor = colorNameList.find(
                  (i) => i.name.toLowerCase() === color.toLowerCase()
                );
                return (
                  <Tooltip key={ind} label={color}>
                    <ColorSwatch
                      color={someNamedColor?.hex || color}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedColor(color)}
                    >
                      {selectedColor === color && (
                        <CheckIcon width={14} color="black" />
                      )}
                    </ColorSwatch>
                  </Tooltip>
                );
              })}
            </Group>
          )}

          {data?.sizes.length > 0 && (
            <Chip.Group multiple={false}>
              <Group>
                <Text>
                  Sizes: <b> {selectedSize}</b>
                </Text>
                {data?.sizes.map((obj, ind) => (
                  <Chip
                    value={obj}
                    key={ind}
                    variant="filled"
                    onClick={() => setSelectedSize(obj)}
                  >
                    {obj}
                  </Chip>
                ))}
              </Group>
            </Chip.Group>
          )}
          <Group align="baseline">
            {data?.sale && (
              <Text style={{ textDecoration: "line-through", opacity: 0.7 }}>
                Rs. {data?.price}
              </Text>
            )}
            <Text color={theme.colors.primary} fw={600} fz={"26px"}>
              Rs. {Math.round(data?.price * ((100 - data?.sale) / 100))}
            </Text>
          </Group>
          <Group>
            <NumberInput
              w={70}
              value={selectedQuantity}
              min={0}
              onChange={(e) => setSelectedQuantity(e)}
            />
            <Button
              label={data?.quantity < 1 ? "Out Of Stock" : "Add to Cart"}
              onClick={addToCart}
              // disabled={
              //   (data.colors.length > 0 && !selectedColor) ||
              //   (data?.sizes.length > 0 && !selectedSize) ||
              //   selectedQuantity < 1 ||
              //   data?.quantity < 1
              // }
            />
          </Group>
          <Text
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
            }}
            onClick={addToWishlist}
          >
            <Heart fill={inWishlist ? "red" : "white"} /> Add to Wishlist
          </Text>
          <Text>SKU: {data?.sku}</Text>
          <List>
            {data?.description?.split(".").map((obj, ind) => (
              <List.Item key={ind}>{obj}</List.Item>
            ))}
          </List>
        </Stack>
      </Flex>
      {/* <Tabs
        defaultValue="info"
        variant="pills"
        bg={"#f1f9fb"}
        radius={"xl"}
        p="50px"
        m="xl"
        styles={{
          tab: {
            border: `2px dashed rgb(0,0,0,0.5)`,
            color: "black",
          },
        }}
      >
        <Tabs.List position="center">
          <Tabs.Tab value="info" icon={<InfoCircle />}>
            Additional Information
          </Tabs.Tab>
          <Tabs.Tab value="reviews" icon={<MessageDots />}>
            Reviews (0)
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="info" pt="xl">
          <AdditionalInfo data={data?.additionalInfo} />
        </Tabs.Panel>

        <Tabs.Panel value="reviews" pt="xl">
          <Reviews />
        </Tabs.Panel>
      </Tabs> */}

      <SimilarProduct cat={data?.category._id} id={data?._id} />
    </Box>
  );
};

export default ViewProduct;
