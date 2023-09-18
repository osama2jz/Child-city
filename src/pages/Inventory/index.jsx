import {
  Box,
  Group,
  Image,
  Pagination,
  RangeSlider,
  Select,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../component/Button";
import logo from "../../assets/logo.png";
import ProductCard from "../../component/ProductCard";
import Filters from "./Filters";
import { useStyles } from "./styles";
import { useQuery } from "react-query";
import axios from "axios";
import { backendUrl } from "../../constants";

const Inventory = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const { cat, subCat, size } = useParams();
  const [toShow, setToShow] = useState(12);
  const [price, setPrice] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(true);
  const [activePage, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedtType] = useState("");
  const [selectedSubCategory, setSelectedtSubCategory] = useState("");
  const [selectedSize, setSelectedtSize] = useState("");
  const [data, setData] = useState([]);

  //all products
  const { status } = useQuery(
    "fetchProducts",
    () => {
      return axios.get(backendUrl + "/product");
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        data.filter((item) => !item.blocked);
        setData(data);
      },
    }
  );

  //page name
  useEffect(() => {
    document.title = cat;
    return () => {
      document.title = "Child City";
    };
  }, [cat]);

  //set filters
  useEffect(() => {
    setSelectedCategory(cat);
    setSelectedtSubCategory(subCat);
    setSelectedtSize(size);
  }, [cat, size, subCat]);
  let totalPages = 0;

  //filter data
  const filtered = useCallback(() => {
    if (selectedCategory === "") return data;
    return data.filter(
      (obj) =>
        obj.category.title === selectedCategory &&
        obj?.subCategory?.title.includes(selectedSubCategory) &&
        obj?.sizes?.join(",").includes(selectedSize) &&
        obj.price >= price[0] &&
        obj.price <= price[1]
    );
  }, [data, selectedCategory, selectedSubCategory, selectedSize, price]);

  //pagination
  const paginated = useCallback(() => {
    if (totalPages === 1) {
      return filtered();
    } else {
      let startIndex = (activePage - 1) * toShow;
      let endIndex = startIndex + toShow;
      return filtered().slice(startIndex, endIndex);
    }
  }, [activePage, filtered, toShow, totalPages]);

  totalPages = useMemo(() => {
    if (toShow === "Show All") return 1;
    let total = filtered()?.length / toShow;
    return Math.ceil(total);
  }, [filtered, toShow]);

  return (
    <Box>
      <Box className={classes.main}>
        <Title align="center" color="rgb(0,0,0,0.8)">
          {cat?.toUpperCase()}
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
        <Filters
          showFilters={showFilters}
          setSelectedCategory={setSelectedCategory}
          setSelectedtSubCategory={setSelectedtSubCategory}
          setSelectedtSize={setSelectedtSize}
          setSelectedtType={setSelectedtType}
          selectedType={selectedType}
          selectedSize={selectedSize}
          data={data}
          selectedCategory={selectedCategory}
        />
        <Box w={isMobile ? "100%" : "80%"} p="lg">
          <Group position="apart" mb="lg">
            <Group>
              <Box>
                <Text>
                  Price Range: {price[0]} - {price[1]}
                </Text>
                <RangeSlider
                  color={"blue"}
                  defaultValue={price}
                  max={5000}
                  w={isMobile ? 300 : 350}
                  // maw={}
                  onChange={(e) => setPrice(e)}
                />
              </Box>
              <Select
                m={isMobile ? "auto" : ""}
                data={["All", "Eastern", "Western"]}
                label="Product Type"
                w={155}
                onChange={setSelectedtType}
                defaultValue={"All"}
              />
            </Group>
            <Group m={isMobile ? "auto" : ""}>
              <Select
                data={[
                  "Default",
                  "By Popularity",
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
            {paginated().length > 0 ? (
              paginated()?.map((obj, ind) => (
                <ProductCard key={ind} data={obj} />
              ))
            ) : (
              <Stack align="center" opacity={0.4}>
                <Image src={logo} width="200px" />
                <Title order={4} color={"gray"}>
                  No Product Found
                </Title>
              </Stack>
            )}
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
