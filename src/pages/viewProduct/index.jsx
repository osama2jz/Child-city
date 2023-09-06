import {
  Box,
  Chip,
  Flex,
  Group,
  List,
  NumberInput,
  Stack,
  Tabs,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import Zoom from "react-img-zoom";
import pic from "../../assets/example.jpg";
import Button from "../../component/Button";
import { Heart, InfoCircle, MessageDots } from "tabler-icons-react";
import Reviews from "./Reviews";
import AdditionalInfo from "./AdditionalInfo";
import { useMediaQuery } from "@mantine/hooks";

const ViewProduct = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const data = {
    img: pic,
    title: "CC034-Girls Dresses",
    descritpion: "Baby Girl Designs. Soft and Comfortable. Summer Collection",
    price: "2999",
    salePrice: "1999",
    size: "1-2Y",
    sizes: "1-2Y, 2-3Y, 3-4Y",
    sku: "CC034",
    additionalInfo: { size: "1-2Y,2-3Y,3-4Y", size2: "1-2Y,2-3Y,3-4Y" },
  };
  return (
    <Box>
      <Flex p="xl" gap={"100px"} direction={isMobile ? "column" : "row"}>
        <Zoom img={data?.img} zoomScale={3} width={600} height={600} />
        <Stack spacing={20}>
          <Title>{data?.title}</Title>
          <List>
            {data.descritpion?.split(".").map((obj, ind) => (
              <List.Item key={ind}>{obj}</List.Item>
            ))}
          </List>

          <Text>
            Size: <b> {data?.size}</b>
          </Text>
          <Chip.Group multiple={false}>
            <Group>
              {data?.sizes.split(",").map((obj, ind) => (
                <Chip value={obj} key={ind} variant="light">
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
            <NumberInput w={70} value={1} />
            <Button label={"Add to Cart"} />
          </Group>
          <Text style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Heart /> Add to Wishlist
          </Text>
          <Text>SKU: {data?.sku}</Text>
        </Stack>
      </Flex>
      <Tabs
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
      </Tabs>
    </Box>
  );
};

export default ViewProduct;
