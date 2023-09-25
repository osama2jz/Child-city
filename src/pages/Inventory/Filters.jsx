import { Badge, Box, Collapse, Stack, Text, Title } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import Button from "../../component/Button";
import { backendUrl, sizes } from "../../constants";
import { useStyles } from "./styles";

const Filters = ({
  showFilters,
  setSelectedCategory,
  setSelectedtSubCategory,
  setSelectedtSize,
  selectedSubCategory,
  selectedSize,
  setSelectedtType,
  selectedType,
  selectedCategory,
  data,
}) => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const [categories, setCategories] = useState([]);
  const [openSection, setOpenSection] = useState("");
  const [opened, setOpened] = useState(false);
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
                if (openSection === obj.title) {
                  setOpened(false);
                  setOpenSection("")
                } else {
                  setOpenSection(obj.title)
                  setOpened(true);
                }
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
                <Collapse
                  key={s}
                  in={selectedCategory === obj?.title && opened}
                  transitionDuration={200}
                  transitionTimingFunction="linear"
                >
                  <Box ml="md">
                    <Text
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedCategory(obj?.title);
                        setSelectedtSubCategory(sub?.title);
                        setSelectedtSize("");
                        setSelectedtType("");
                      }}
                      color={
                        selectedSubCategory === sub?.title ? "#ff8087" : "black"
                      }
                    >
                      {sub.title}
                    </Text>
                    {sub.showFilters &&
                      sizes.map((size, ss) => {
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
                            color={
                              selectedSize === size &&
                              selectedCategory === obj?.title &&
                              selectedSubCategory === sub?.title
                                ? "#ff8087"
                                : "black"
                            }
                          >
                            {size}
                          </Text>
                        );
                      })}
                  </Box>
                </Collapse>
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
