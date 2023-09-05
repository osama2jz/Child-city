import {
  Box,
  Collapse,
  Group,
  List,
  RangeSlider,
  Select,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronDown, ChevronUp } from "tabler-icons-react";
import { useStyles } from "./styles";
import ProductCard from "../../component/ProductCard";
import Button from "../../component/Button";
import { useMediaQuery } from "@mantine/hooks";

const Inventory = () => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const { cat, subCat, size } = useParams();
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [price, setPrice] = useState([0, 1500]);
  const [showFilters, setShowFilters] = useState(true);
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
        {
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
            <Text>- Accessories</Text>
            <Text
              onClick={() => setOpen1(!open1)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              - Boys Clothing {!open1 ? <ChevronDown /> : <ChevronUp />}
            </Text>
            <Collapse in={open1}>
              <List listStyleType="none" withPadding>
                <List.Item>- Pre Winter</List.Item>
                <List withPadding listStyleType="none">
                  <List.Item>- 1-4Y</List.Item>
                  <List.Item>- 3-9Y</List.Item>
                </List>
                <List.Item>- Summer Collection</List.Item>
                <List withPadding listStyleType="none">
                  <List.Item>- 1-2Y</List.Item>
                  <List.Item>- 2-3Y</List.Item>
                  <List.Item>- 3-4Y</List.Item>
                  <List.Item>- 3-6M</List.Item>
                  <List.Item>- 6-9M</List.Item>
                </List>
                <List.Item>- Traditional</List.Item>
              </List>
            </Collapse>
            <Text
              onClick={() => setOpen2(!open2)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              - Girls Clothing {!open2 ? <ChevronDown /> : <ChevronUp />}
            </Text>
            <Collapse in={open2}>
              <List listStyleType="none" withPadding>
                <List.Item>- Pre Winter</List.Item>
                <List withPadding listStyleType="none">
                  <List.Item>- 1-4Y</List.Item>
                  <List.Item>- 3-9Y</List.Item>
                </List>
                <List.Item>- Summer Collection</List.Item>
                <List withPadding listStyleType="none">
                  <List.Item>- 1-2Y</List.Item>
                  <List.Item>- 2-3Y</List.Item>
                  <List.Item>- 3-4Y</List.Item>
                  <List.Item>- 3-6M</List.Item>
                  <List.Item>- 6-9M</List.Item>
                </List>
              </List>
            </Collapse>
            <Text>- New Born Clothing</Text>
            <Text>- Toys & Games</Text>
          </Stack>
        }
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
                label="Sort By"
                w={150}
                defaultValue={"Default"}
              />
              <Select
                data={["12", "24", "48", "96", "Show All"]}
                w={100}
                label="Show"
                defaultValue={"12"}
              />
            </Group>
          </Group>
          <Group position="center" spacing={"lg"}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </Group>
        </Box>
      </Box>
    </Box>
  );
};

export default Inventory;
