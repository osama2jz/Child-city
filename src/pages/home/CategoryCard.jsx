import { Box, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { useStyles } from "./styles";

const CategoryCard = ({ img, title1, title2, text }) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.card}>
      <Box className={classes.border}></Box>
      <img src={img} />
      <Stack ml="20px" mb="20px" spacing={0}>
        <Title>{title1}</Title>
        <Title order={3}>{title2}</Title>
        <Text>{text}</Text>
      </Stack>
    </Box>
  );
};

export default CategoryCard;
