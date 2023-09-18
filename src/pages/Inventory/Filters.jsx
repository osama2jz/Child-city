import {
  Badge,
  Box,
  Collapse,
  Flex,
  List,
  Menu,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "tabler-icons-react";
import { useStyles } from "./styles";
import Button from "../../component/Button";
import { useQuery } from "react-query";
import { backendUrl, sizes } from "../../constants";
import axios from "axios";

const Filters = ({
  showFilters,
  setSelectedCategory,
  setSelectedtSubCategory,
  setSelectedtSize,
  selectedSize,
  setSelectedtType,
  selectedType,
  selectedCategory,
  data,
}) => {
  const { classes } = useStyles();
  const [open1, setOpen1] = useState(
    selectedCategory === "All Clothings" ||
      selectedCategory === "Girls" ||
      selectedCategory === "Boys" ||
      selectedCategory === "New Born"
      ? true
      : false
  );
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const [categories, setCategories] = useState([]);

  //all categories
  const { status } = useQuery(
    "fetchCategories",
    () => {
      return axios.get(backendUrl + "/category", {});
    },
    {
      onSuccess: (res) => {
        let cat = res.data.data.filter((obj) => !obj?.blocked);
        setCategories(cat);
      },
    }
  );

  return (
    <Stack
      w={isMobile ? "100%" : "20%"}
      spacing={"xs"}
      style={{
        height: showFilters ? "100%" : "0px",
        overflow: "hidden",
        transition: "all 0.5s ease-in-out",
      }}
    >
      <Title order={4} className={classes.cat}>
        Product Categories
      </Title>
      {categories.map((obj, ind) => {
        return (
          <Stack key={ind}>
            <Text
              pos={"relative"}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedCategory(obj?.title);
                setSelectedtSubCategory("");
                setSelectedtSize("");
                setSelectedtType("");
              }}
              color={selectedCategory === obj?.title ? "#ff8087" : "black"}
              fw={selectedCategory === obj?.title ? "bold" : ""}
            >
              - {obj?.title}
              <Badge
                pos={"absolute"}
                right={10}
                variant="filled"
                fw={selectedCategory === obj?.title ? "bold" : ""}
              >
                {
                  data?.filter((prod) => prod.category.title === obj?.title)
                    .length
                }
              </Badge>
            </Text>
            {obj.subCategories?.map((sub, s) => {
              return (
                <Box key={s} ml="md">
                  <Text
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedCategory(obj?.title);
                      setSelectedtSubCategory(sub?.title);
                      setSelectedtSize("");
                      setSelectedtType("");
                    }}
                  >
                    {sub.title}
                  </Text>
                  {sizes.map((size, ss) => {
                    return (
                      <Text
                        key={ss}
                        ml="md"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setSelectedCategory(obj?.title);
                          setSelectedtSubCategory(sub?.title);
                          setSelectedtSize(size);
                        }}
                      >
                        {size}
                      </Text>
                    );
                  })}
                </Box>
              );
            })}
          </Stack>
        );
      })}
      <Button
        label={"Clear Filters"}
        compact={true}
        w={"90%"}
        my="md"
        m="auto"
        onClick={() => {
          setSelectedCategory("");
          setSelectedtSubCategory("");
          setSelectedtSize("");
          setSelectedtType("");
        }}
      />
    </Stack>
  );
};

export default Filters;
