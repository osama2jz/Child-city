import { Box, Group, Loader, Title } from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { backendUrl } from "../../constants";
import BlogCard from "./BlogCard";
import { useStyles } from "./styles";

const Blog = () => {
  const { classes } = useStyles();
  const [blogs, setBlogs] = useState([]);
  const { status } = useQuery(
    "fetchBlogs",
    () => {
      return axios.get(backendUrl + `/blog`, {
        // headers: {
        //   authorization: `Bearer ${user.token}`,
        // },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        setBlogs(data.filter((item) => !item.blocked));
      },
    }
  );
  return (
    <Box>
      <Box className={classes.main}>
        <Title align="center" color="rgb(0,0,0,0.8)">
          Our Blogs
        </Title>
      </Box>
      {status === "loading" ? (
        <Loader m="auto" />
      ) : (
        <Group
          spacing={50}
          p="xl"
          position="center"
          // breakpoints={[
          //   { minWidth: "xs", cols: 1 },
          //   { minWidth: "sm", cols: 2 },
          //   { minWidth: "lg", cols: 3 },
          // ]}
        >
          {blogs.map((obj, ind) => {
            return <BlogCard obj={obj} ind={ind} key={ind} />;
          })}
        </Group>
      )}
    </Box>
  );
};

export default Blog;
