import { Box, Flex, Image, Text, Title } from "@mantine/core";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useStyles } from "./styles";
import ReactHtmlParser from "react-html-parser";
import { useMediaQuery } from "@mantine/hooks";
import { useQuery } from "react-query";
import axios from "axios";
import { backendUrl } from "../../constants";
import { useState } from "react";

const ViewBlog = () => {
  const { classes } = useStyles();
  let { blogData: data } = useLocation()?.state || {};
  const [blogData, setBlogData] = useState(data);
  const { id } = useParams();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const { status } = useQuery(
    "fetchSingleBlog",
    () => {
      return axios.get(backendUrl + `/blog/${id}`);
    },
    {
      onSuccess: (res) => {
        setBlogData(res.data.data);
      },
    }
  );
  return (
    <Box>
      <Box className={classes.main}>
        <Title align="center" color="rgb(0,0,0,0.8)">
          Read Blog
        </Title>
      </Box>
      <Title m={isMobile ? 20 : 50} align={isMobile ? "justify" : "center"}>
        {blogData?.title}
      </Title>
      <Flex
        gap={40}
        m={isMobile ? 20 : 50}
        align={"flex-start"}
        direction={isMobile ? "column-reverse" : "row"}
      >
        <Text align="justify">{ReactHtmlParser(blogData?.details)}</Text>
        <Image src={blogData?.image} width={isMobile ? "100%" : 400} />
      </Flex>
    </Box>
  );
};

export default ViewBlog;
