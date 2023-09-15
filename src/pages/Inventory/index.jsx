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
  const { cat, gender } = useParams();
  const [toShow, setToShow] = useState(12);
  const [price, setPrice] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(true);
  const [activePage, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedSeason, setSeason] = useState("");
  const [selectedType, setSelectedtType] = useState("");
  const [data, setData] = useState([]);
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
  useEffect(() => {
    document.title = cat;
    return () => {
      document.title = "Child City";
    };
  }, [cat]);

  useEffect(() => {
    setSelectedCategory(cat);
    setSelectedGender(gender);
  }, [cat, gender]);
  let totalPages = 0;

  const filtered = useCallback(() => {
    if (selectedCategory === "Accessories" || selectedCategory === "Toys") {
      return data.filter(
        (obj, ind) =>
          obj.category.title === selectedCategory &&
          obj?.price >= price[0] &&
          obj?.price <= price[1]
      );
    } else if (selectedCategory === "All Clothings") {
      return data.filter(
        (obj) =>
          obj.price >= price[0] &&
          obj.price <= price[1] &&
          obj.category.title !== "Accessories" &&
          obj.category.title !== "Toys" &&
          obj?.sizes?.join(",").includes(selectedAge) &&
          obj?.season.includes(selectedSeason) &&
          obj.price >= price[0] &&
          obj.price <= price[1]
      );
    } else if (selectedCategory === "") {
      return data.filter(
        (obj) => obj.price >= price[0] && obj.price <= price[1]
      );
    } else {
      return data.filter((obj) => {
        return (
          obj?.category.title === selectedCategory &&
          obj?.sizes?.join(",").includes(selectedAge) &&
          obj?.season.includes(selectedSeason) &&
          // obj?.type.includes(selectedType) &&
          obj.price >= price[0] &&
          obj.price <= price[1]
        );
      });
    }
  }, [
    selectedCategory,
    data,
    price,
    selectedAge,
    selectedGender,
    selectedSeason,
    selectedType,
  ]);
  console.log(filtered(), selectedCategory, selectedAge);
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
        <Title align="center" color="gray" order={3}>
          {gender?.toUpperCase()}
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
          setSelectedGender={setSelectedGender}
          setSeason={setSeason}
          selectedGender={selectedGender}
          setSelectedAge={setSelectedAge}
          setSelectedtType={setSelectedtType}
          selectedType={selectedType}
          selectedAge={selectedAge}
          selectedSeason={selectedSeason}
          data={data}
          selectedCategory={selectedCategory}
        />
        <Box w={isMobile ? "100%" : "80%"} p="lg">
          <Group position="apart" mb="lg">
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
