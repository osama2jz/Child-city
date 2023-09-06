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

const Filters = ({ showFilters }) => {
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
        onClick={() => setOpen1(!open1)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          position: "relative",
        }}
      >
        - Clothing {!open1 ? <ChevronDown /> : <ChevronUp />}
        <Badge pos={"absolute"} right={10}>
          5
        </Badge>
      </Text>
      <Collapse in={open1}>
        <Stack w={"80%"} align="center">
          <Select data={["Boys", "Girls"]} placeholder="Gender" />
          <Select
            data={["Kamez Shalwar", "Western"]}
            placeholder="Dress Category"
          />
          <Select
            data={[
              { value: "1-2Y", label: "1-4Y", group: "Winter Collection" },
              { value: "2-3Y", label: "3-9Y", group: "Winter Collection" },
              { value: "3-4Y", label: "1-2Y", group: "Summer Collection" },
              { value: "4-6Y", label: "2-3Y", group: "Summer Collection" },
              { value: "6-9Y", label: "3-4Y", group: "Summer Collection" },
              { value: "3-6M", label: "3-6M", group: "Summer Collection" },
              { value: "6-9M", label: "6-9M", group: "Summer Collection" },
            ]}
            placeholder="Dress Size"
          />
        </Stack>
        {/* <List listStyleType="none" withPadding>
          <List.Item pos={"relative"}>
            - Pre Winter{" "}
            <Badge pos={"absolute"} right={10}>
              5
            </Badge>
          </List.Item>
          <List withPadding listStyleType="none">
            <List.Item pos={"relative"}>
              - 1-4Y{" "}
              <Badge pos={"absolute"} right={10}>
                5
              </Badge>
            </List.Item>
            <List.Item pos={"relative"}>
              - 3-9Y{" "}
              <Badge pos={"absolute"} right={10}>
                5
              </Badge>
            </List.Item>
          </List>
          <List.Item pos={"relative"}>
            - Summer Collection{" "}
            <Badge pos={"absolute"} right={10}>
              5
            </Badge>
          </List.Item>
          <List withPadding listStyleType="none">
            <List.Item pos={"relative"}>
              - 1-2Y{" "}
              <Badge pos={"absolute"} right={10}>
                5
              </Badge>
            </List.Item>
            <List.Item pos={"relative"}>
              - 2-3Y{" "}
              <Badge pos={"absolute"} right={10}>
                5
              </Badge>
            </List.Item>
            <List.Item pos={"relative"}>
              - 3-4Y{" "}
              <Badge pos={"absolute"} right={10}>
                5
              </Badge>
            </List.Item>
            <List.Item pos={"relative"}>
              - 3-6M{" "}
              <Badge pos={"absolute"} right={10}>
                5
              </Badge>
            </List.Item>
            <List.Item pos={"relative"}>
              - 6-9M{" "}
              <Badge pos={"absolute"} right={10}>
                5
              </Badge>
            </List.Item>
          </List>
          <List.Item pos={"relative"}>
            - Traditional{" "}
            <Badge pos={"absolute"} right={10}>
              5
            </Badge>
          </List.Item>
        </List> */}
      </Collapse>
      {/* <Text
        onClick={() => setOpen2(!open2)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          position: "relative",
        }}
      >
        - Girls Clothing {!open2 ? <ChevronDown /> : <ChevronUp />}
        <Badge pos={"absolute"} right={10}>
          5
        </Badge>
      </Text>
      <Collapse in={open2}>
        <List listStyleType="none" withPadding>
          <List.Item pos={"relative"}>
            - Pre Winter{" "}
            <Badge pos={"absolute"} right={10}>
              5
            </Badge>
          </List.Item>
          <List withPadding listStyleType="none">
            <List.Item pos={"relative"}>
              - 1-4Y{" "}
              <Badge pos={"absolute"} right={10}>
                5
              </Badge>
            </List.Item>
            <List.Item pos={"relative"}>
              - 3-9Y{" "}
              <Badge pos={"absolute"} right={10}>
                5
              </Badge>
            </List.Item>
          </List>
          <List.Item pos={"relative"}>
            - Summer Collection{" "}
            <Badge pos={"absolute"} right={10}>
              5
            </Badge>
          </List.Item>
          <List withPadding listStyleType="none">
            <List.Item pos={"relative"}>
              - 1-2Y{" "}
              <Badge pos={"absolute"} right={10}>
                5
              </Badge>
            </List.Item>
            <List.Item pos={"relative"}>
              - 2-3Y{" "}
              <Badge pos={"absolute"} right={10}>
                5
              </Badge>
            </List.Item>
            <List.Item pos={"relative"}>
              - 3-4Y{" "}
              <Badge pos={"absolute"} right={10}>
                5
              </Badge>
            </List.Item>
            <List.Item pos={"relative"}>
              - 3-6M{" "}
              <Badge pos={"absolute"} right={10}>
                5
              </Badge>
            </List.Item>
            <List.Item pos={"relative"}>
              - 6-9M{" "}
              <Badge pos={"absolute"} right={10}>
                5
              </Badge>
            </List.Item>
          </List>
        </List>
      </Collapse> */}
      {/* <Text pos={"relative"}>
        - New Born Clothing{" "}
        <Badge pos={"absolute"} right={10}>
          5
        </Badge>
      </Text> */}
      <Text pos={"relative"}>
        - Accessories{" "}
        <Badge pos={"absolute"} right={10}>
          5
        </Badge>
      </Text>
      <Text pos={"relative"}>
        - Toys & Games{" "}
        <Badge pos={"absolute"} right={10}>
          5
        </Badge>
      </Text>
    </Stack>
  );
};

export default Filters;
