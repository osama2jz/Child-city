import { Box, Flex, Group, Image, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { useStyles } from "./styles";
import { useMediaQuery } from "@mantine/hooks";
import blog1 from "../../assets/blog1.jpg";
import blog2 from "../../assets/blog2.jpg";

const Blog = () => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  return (
    <Box>
      <Box className={classes.main}>
        <Title align="center" color="white">
          How Aromatherapy Can Impact NICU Babies
        </Title>
      </Box>
      <Stack mx={isMobile ? 50 : 200} my={100}>
        <Title>Applying The Kids Design Guide</Title>
        <Text>
          Internet technology such as online retailers and social media
          platforms have given way for trends to be identified, marketed and
          sold immediately. Styles and trends are easily conveyed online to
          attract the trendsetters. Posts on Instagram or Facebook can easily
          increase awareness about new trends in fashion which can create high
          demand for specific items or brands, new “buy now button” technology
          can link these styles with direct sales. <br />
          <br /> Machine vision technology has been developed to track how
          fashions spread through society. The industry can now see the direct
          correlation on how fashion shows influence street-chic outfits. The
          effects can now be quantified and provide valuable feedback to fashion
          houses, designers and consumers regarding trends.
        </Text>
        <Flex gap={50} wrap={isMobile ? "wrap" : "nowrap"}>
          <Box>
            <Title>It’s a Process</Title>
            <Text align="justify">
              Machine vision technology has been developed to track how fashions
              spread through society. The industry can now see the direct
              correlation on how fashion shows influence street-chic outfits.
              The effects can be quantified.
            </Text>
          </Box>
          <Box>
            <Title>And It Takes Time</Title>
            <Text align="justify">
              Machine vision technology has been developed to track how fashions
              spread through society. The industry can now see the direct
              correlation on how fashion shows influence street-chic outfits.
              The effects can be quantified.
            </Text>
          </Box>
        </Flex>
        <Flex gap={50} wrap={isMobile ? "wrap" : "nowrap"}>
          <Image src={blog1} />
          <Image src={blog2} />
        </Flex>
        <Title>So We Took The Challenge…</Title>
        <Text className={classes.qoute}>
          Fashion is always of the time in which you live. It is not something
          standing alone. But the grand problem, the most important problem, is
          to rejeuvenate women. To make women look young. Then their outlook
          changes. They feel more joyous.
        </Text>
        <Text>
          Internet technology such as online retailers and social media
          platforms have given way for trends to be identified, marketed and
          sold immediately. Styles and trends are easily conveyed online to
          attract the trendsetters. Posts on Instagram or Facebook can easily
          increase awareness about new trends in fashion which can create high
          demand for specific items or brands, new “buy now button” technology
          can link these styles with direct sales.
        </Text>
        <Title>The End Result Was Absolutely Amazing</Title>
        <Text>
          As we undergo a global economic downturn, the “Spend now, think later”
          belief is getting less relevant in our society. Today’s consumer tends
          to be more mindful about consumption, looking for just enough and
          better, more durable options. People have also become more conscious
          of the impact their everyday consumption has on the environment and
          society. They’re looking for ways to mediate their material desires
          with an aim to do more good in the world. A linear economy is slowly
          shifting to a circular one. <br />
          <br /> Consumption as a share of gross domestic product in China has
          fallen for six decades, from 76 percent in 1952 to 28 percent in 2011.
          China plans to reduce tariffs on a number of consumer goods and expand
          its 72-hour transit visa plan to more cities in an effort to stimulate
          domestic consumption.
        </Text>
      </Stack>
    </Box>
  );
};

export default Blog;
