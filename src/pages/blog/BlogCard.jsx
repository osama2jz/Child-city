import { Image, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

const BlogCard = ({ obj, ind }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  return (
    <Stack
      key={ind}
      p="10px"
      w={380}
      spacing={"xs"}
      style={{
        cursor: "pointer",
        border: "2px dashed rgb(0,0,0,0.1)",
        borderRadius: "10px",
        boxShadow: "0px 5px 5px rgb(0,0,0,0.2)",
        aspectRatio: "1/1",
      }}
      onClick={() => navigate(`/view-blog/${obj._id}`, { state: { blogData: obj } })}
    >
      <Image src={obj?.image} height={"250px"} fit="cover" />
      <Text fz="xs" align="left">
        Published: {new Date(obj?.createdAt).toLocaleDateString()}
      </Text>
      <Text fw={"bold"} fz={"lg"} color={"primary"} align="left"  lineClamp={2}>
        {obj?.title}
      </Text>
      {/* <Text align="left" lineClamp={2}>
        {ReactHtmlParser(obj?.details)}
      </Text> */}
    </Stack>
  );
};

export default BlogCard;
