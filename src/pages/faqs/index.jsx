import React, { useState } from "react";
import { useStyles } from "./styles";
import {
  Box,
  Center,
  Flex,
  Grid,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { backendUrl } from "../../constants";
import axios from "axios";
import { useQuery } from "react-query";

const Faqs = () => {
  const { classes } = useStyles();
  const [faqs, setFaqs] = useState([]);
  const [display, setDisplay] = useState(null);

  const { status } = useQuery(
    "fetchFaqs",
    () => {
      return axios.get(backendUrl + `/faq`, {});
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        let filtered = data.filter((item) => !item.blocked);
        setFaqs(filtered);
        setDisplay(filtered[0]);
      },
    }
  );

  return (
    <Box>
      <Box className={classes.main}>
        <Title align="center" color="rgb(0,0,0,0.8)">
          FAQs
        </Title>
      </Box>
      {status === "loading" ? (
        <Center my="50px">
          <Loader m="auto" />
        </Center>
      ) : faqs.length < 1 ? (
        <Title color="gray" align="center" my="50px">
          No FAQs
        </Title>
      ) : (
        <Grid mx={100} my={50}>
          <Grid.Col
            md={4}
            style={{
              border: "2px dashed rgb(0,0,0,0.1)",
              borderRadius: "10px",
            }}
          >
            <Text fw={"bold"} fz={"xl"} mb="xl" align="center">
              Articles in this section
            </Text>
            <Stack spacing={"xs"}>
              {faqs.map((obj, ind) => {
                return (
                  <Flex
                    gap={"md"}
                    key={ind}
                    p="lg"
                    bg={display._id === obj._id ? "primary.0" : ""}
                    className={classes.question}
                    onClick={() => setDisplay(obj)}
                  >
                    <Text color={display._id === obj._id ? "white" : "black"}>
                      {ind + 1 + "-"}
                    </Text>
                    <Text color={display._id === obj._id ? "white" : "black"}>
                      {obj.question}
                    </Text>
                  </Flex>
                );
              })}
            </Stack>
          </Grid.Col>
          <Grid.Col md={8}>
            <Stack mx="xl">
              <Title order={2}>{display?.question}</Title>
              <Text>{display?.answer}</Text>
            </Stack>
          </Grid.Col>
        </Grid>
      )}
    </Box>
  );
};

export default Faqs;
