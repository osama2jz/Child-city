import { Box, Flex, Image, Text, Title } from "@mantine/core";
import React from "react";
import { useLocation } from "react-router-dom";
import { useStyles } from "./styles";
import ReactHtmlParser from "react-html-parser";
import { useMediaQuery } from "@mantine/hooks";

const ViewBlog = () => {
  const { classes } = useStyles();
  const { blogData } = useLocation().state;
  const isMobile = useMediaQuery("(max-width: 1100px)");
  return (
    <Box>
      <Box className={classes.main}>
        <Title align="center" color="rgb(0,0,0,0.8)">
          Read Blog
        </Title>
      </Box>
      <Title m={50} align="center">
        {blogData.title}
      </Title>
      <Flex
        gap={40}
        m={50}
        align={"center"}
        direction={isMobile ? "column-reverse" : "row"}
      >
        <Text align="justify">{ReactHtmlParser(blogData.details)}</Text>
        <Image src={blogData?.image} width={400} />
      </Flex>
    </Box>
  );
};

export default ViewBlog;
