import { Carousel } from "@mantine/carousel";
import {
  Box,
  CheckIcon,
  Chip,
  ColorSwatch,
  Flex,
  Group,
  Image,
  List,
  NumberInput,
  Stack,
  Text,
  Title,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { Heart } from "tabler-icons-react";
import pic from "../../assets/example.jpg";
import Button from "../../component/Button";

const ViewProduct = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const data = {
    imgs: [pic, pic, pic],
    title: "CC034-Girls Dresses",
    descritpion: "Baby Girl Designs. Soft and Comfortable. Summer Collection",
    price: "2999",
    salePrice: "1999",
    size: "1-2Y",
    sizes: "1-2Y, 2-3Y, 3-4Y",
    sku: "CC034",
    colors: ["red", "yellow", "blue"],
    additionalInfo: { size: "1-2Y,2-3Y,3-4Y", size2: "1-2Y,2-3Y,3-4Y" },
  };
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  return (
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
            height={isMobile ? 350 : 500}
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
            {data?.imgs.map((img, ind) => (
              <Carousel.Slide
                key={ind}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Image src={img} width={"100%"} fit="cover" />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>
        <Stack spacing={20} w={isMobile ? "80%" : "50%"}>
          <Title>{data?.title}</Title>

          <Group>
            <Text>
              Colors: <b>{selectedColor}</b>
            </Text>
            {data?.colors.map((color, ind) => {
              return (
                <ColorSwatch
                  key={ind}
                  color={color}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedColor(color)}
                >
                  {selectedColor === color && (
                    <CheckIcon width={14} color="black" />
                  )}
                </ColorSwatch>
              );
            })}
          </Group>

          <Chip.Group multiple={false}>
            <Group>
              <Text>
                Sizes: <b> {selectedSize}</b>
              </Text>
              {data?.sizes.split(",").map((obj, ind) => (
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
          <Group align="baseline">
            <Text style={{ textDecoration: "line-through", opacity: 0.7 }}>
              Rs. {data?.price}
            </Text>
            <Text color={theme.colors.primary} fw={600} fz={"26px"}>
              Rs. {data?.salePrice}
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
              label={"Add to Cart"}
              disabled={!selectedColor || !selectedSize || selectedQuantity < 1}
            />
          </Group>
          <Text style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Heart /> Add to Wishlist
          </Text>
          <Text>SKU: {data?.sku}</Text>
          <List>
            {data.descritpion?.split(".").map((obj, ind) => (
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
    </Box>
  );
};

export default ViewProduct;
