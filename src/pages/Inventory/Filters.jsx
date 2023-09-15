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

const Filters = ({
  showFilters,
  setSelectedCategory,
  setSelectedGender,
  setSelectedAge,
  setSeason,
  selectedSeason,
  selectedAge,
  selectedGender,
  selectedCategory,
  setSelectedtType,
  selectedType,
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
  useEffect(() => {
    if (
      selectedCategory === "All Clothings" ||
      selectedCategory === "Girls" ||
      selectedCategory === "Boys" ||
      selectedCategory === "New Born"
    ) {
      setOpen1(true);
    }
  }, [selectedCategory]);
  const isMobile = useMediaQuery("(max-width: 1100px)");
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

      <Text
        onClick={() => {
          setOpen1(!open1);
        }}
        color={
          selectedCategory === "All Clothings" ||
          selectedCategory === "Girls" ||
          selectedCategory === "Boys" ||
          selectedCategory === "New Born"
            ? "#ff8087"
            : "black"
        }
        fw={
          selectedCategory === "All Clothings" ||
          selectedCategory === "Girls" ||
          selectedCategory === "Boys" ||
          selectedCategory === "New Born"
            ? "bold"
            : ""
        }
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          position: "relative",
        }}
      >
        - Clothing {!open1 ? <ChevronDown /> : <ChevronUp />}
        <Badge pos={"absolute"} right={10} variant="filled">
          {data?.filter((obj) => obj.category.subTitle === "Clothing").length}
        </Badge>
      </Text>
      <Collapse in={open1}>
        <Stack w={"80%"} align="center">
          <Select
            onChange={setSelectedCategory}
            value={selectedCategory}
            data={[
              { label: "All", value: "All Clothings" },
              "Boys",
              "Girls",
              "New Born",
            ]}
            placeholder="Gender"
          />
          {/* <Select
            data={[
              { label: "All", value: "" },
              { label: "Kamez Shalwar", value: "Kamez Shalwar" },
              { label: "Western", value: "Western" },
            ]}
            placeholder="Dress Category"
            value={selectedType}
            onChange={setSelectedtType}
          /> */}
          <Select
            data={[
              { label: "All", value: "" },
              "Winters Collection",
              "Summers Collection",
            ]}
            placeholder="Dress Category"
            value={selectedSeason}
            onChange={setSeason}
          />
          <Select
            onChange={setSelectedAge}
            value={selectedAge}
            data={[
              { label: "All", value: "" },
              "3-6M",
              "6-9M",
              "1-2Y",
              "2-3Y",
              "3-4Y",
            ]}
            placeholder="Dress Size"
          />
        </Stack>
      </Collapse>

      <Text
        style={{ cursor: "pointer" }}
        pos={"relative"}
        onClick={() => {
          setSelectedCategory("Accessories");
          setSeason("");
          setSelectedAge("");
          setSelectedGender("");
          setOpen1(false);
        }}
        color={selectedCategory === "Accessories" ? "#ff8087" : "black"}
        fw={selectedCategory === "Accessories" ? "bold" : ""}
      >
        - Accessories{" "}
        <Badge
          pos={"absolute"}
          right={10}
          variant="filled"
          fw={selectedCategory === "Accessories" ? "bold" : ""}
        >
          {data?.filter((obj) => obj.category.title === "Accessories").length}
        </Badge>
      </Text>
      <Text
        pos={"relative"}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setSelectedCategory("Toys");
          setSeason("");
          setSelectedAge("");
          setSelectedGender("");
          setOpen1(false);
        }}
        color={selectedCategory === "Toys" ? "#ff8087" : "black"}
        fw={selectedCategory === "Toys" ? "bold" : ""}
      >
        - Toys & Games{" "}
        <Badge
          pos={"absolute"}
          right={10}
          variant="filled"
          fw={selectedCategory === "Toys & Games" ? "bold" : ""}
        >
          {data?.filter((obj) => obj.category.title === "Toys").length}
        </Badge>
      </Text>
      <Button
        label={"Clear Filters"}
        compact={true}
        w={"90%"}
        my="md"
        m="auto"
        onClick={() => {
          setSeason("");
          setSelectedAge("");
          setSelectedCategory("");
          setSelectedGender("");
          setOpen1(false);
        }}
      />
    </Stack>
  );
};

export default Filters;
