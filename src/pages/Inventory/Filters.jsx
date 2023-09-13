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
import { useState } from "react";
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
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
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
          setSelectedCategory("Clothing");
          setOpen1(!open1);
        }}
        color={selectedCategory === "Clothing" ? "#ff8087" : "black"}
        fw={selectedCategory === "Clothing" ? "bold" : ""}
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
          {data?.filter((obj) => obj.category === "Clothing").length}
        </Badge>
      </Text>
      <Collapse in={open1}>
        <Stack w={"80%"} align="center">
          <Select
            onChange={setSelectedGender}
            value={selectedGender}
            data={[{ label: "All", value: "" }, "Boys", "Girls", "New Born"]}
            placeholder="Gender"
          />
          <Select
            data={[
              { label: "All", value: "" },
              { label: "Kamez Shalwar", value: "Kamez Shalwar" },
              { label: "Western", value: "Western" },
            ]}
            placeholder="Dress Category"
            value={selectedType}
            onChange={setSelectedtType}
          />
          <Select
            onChange={(e) => {
              if (e[0] == "w") {
                setSeason("Winter Collection");
                setSelectedAge(e.slice(1));
              } else if (e === "") {
                setSelectedAge("");
                setSeason("");
              } else {
                setSeason("Summer Collection");
                setSelectedAge(e);
              }
            }}
            value={selectedAge}
            data={[
              { label: "All", value: "", group: "All" },
              { value: "w1-2Y", label: "1-2Y", group: "Winter Collection" },
              { value: "w2-3Y", label: "2-3Y", group: "Winter Collection" },
              { value: "3-4Y", label: "3-4Y", group: "Summer Collection" },
              { value: "4-6Y", label: "4-6Y", group: "Summer Collection" },
              { value: "6-9Y", label: "6-9Y", group: "Summer Collection" },
              { value: "3-6M", label: "3-6M", group: "Summer Collection" },
              { value: "6-9M", label: "6-9M", group: "Summer Collection" },
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
          {data?.filter((obj) => obj.category === "Accessories").length}
        </Badge>
      </Text>
      <Text
        pos={"relative"}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setSelectedCategory("Toys & Games");
          setSeason("");
          setSelectedAge("");
          setSelectedGender("");
          setOpen1(false);
        }}
        color={selectedCategory === "Toys & Games" ? "#ff8087" : "black"}
        fw={selectedCategory === "Toys & Games" ? "bold" : ""}
      >
        - Toys & Games{" "}
        <Badge
          pos={"absolute"}
          right={10}
          variant="filled"
          fw={selectedCategory === "Toys & Games" ? "bold" : ""}
        >
          {data?.filter((obj) => obj.category === "Toys & Games").length}
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
