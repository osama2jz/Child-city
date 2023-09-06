import {
  Box,
  Group,
  Pagination,
  RangeSlider,
  Select,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../component/Button";
import ProductCard from "../../component/ProductCard";
import Filters from "./Filters";
import { useStyles } from "./styles";

const Inventory = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const { cat, subCat, size } = useParams();
  const [toShow, setToShow] = useState(12);
  const [data, setData] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  const [price, setPrice] = useState([0, 1500]);
  const [showFilters, setShowFilters] = useState(true);
  const [activePage, setPage] = useState(1);

  const totalPages = useMemo(() => {
    if (toShow === "Show All") return 1;
    let total = data.length / toShow;
    return Math.ceil(total);
  }, [data, toShow]);

  const filtered = () => {
    if (totalPages === 1) {
      return data;
    } else {
      let startIndex = (activePage - 1) * toShow;
      let endIndex = startIndex + toShow;
      return data.slice(startIndex, endIndex);
    }
  };
  return (
    <Box>
      <Box className={classes.main}>
        <Title align="center" color="rgb(0,0,0,0.8)">
          {cat.toUpperCase()}
        </Title>
        <Title align="center" color="gray" order={3}>
          {subCat?.toUpperCase()}
        </Title>
        <Title align="center" color="gray" order={5}>
          {size?.toUpperCase()}
        </Title>
      </Box>
      <Box className={classes.content}>
        {isMobile && (
          <Button
            label={"Filters"}
            leftIcon={"filter"}
            onClick={() => setShowFilters(!showFilters)}
          />
        )}
        <Filters showFilters={showFilters} />
        <Box w={isMobile ? "100%" : "80%"} p="lg">
          <Group position="apart" mb="lg">
            <Box>
              <Text>
                Price Range: {price[0]} - {price[1]}
              </Text>
              <RangeSlider
                color={"blue"}
                defaultValue={price}
                max={3000}
                w={isMobile ? 300 : 350}
                // maw={}
                onChange={(e) => setPrice(e)}
              />
            </Box>
            <Group m={isMobile ? "auto" : ""}>
              <Select
                data={[
                  "Default",
                  "By Popularity",
                  "By Average Rating",
                  "By Latest",
                  "Low To High",
                  "High To Low",
                ]}
                color="red"
                label="Sort By"
                w={155}
                defaultValue={"Default"}
              />
              <Select
                data={["12", "24", "48", "96", "Show All"]}
                w={100}
                onChange={setToShow}
                label="Show"
                defaultValue={"12"}
              />
            </Group>
          </Group>
          <Group position="center" spacing={"lg"}>
            {filtered().map((obj, ind) => (
              <ProductCard />
            ))}
          </Group>
          {totalPages > 1 && (
            <Pagination
              mt="lg"
              position="center"
              total={totalPages}
              value={activePage}
              onChange={setPage}
              color={"blue"}
              radius={"lg"}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Inventory;
