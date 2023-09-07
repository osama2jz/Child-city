import {
  Box,
  Flex,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import { useStyles } from "./styles";
import Button from "../../component/Button";

const Contact = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  return (
    <Box>
      <Box className={classes.main}>
        <Title align="center" color="rgb(0,0,0,0.8)">
          Contacts
        </Title>
      </Box>
      <Stack justify="center" align="center" spacing={"xl"} mt="xl">
        <Title align="center">Have a Question?</Title>
        <Text align="center" w={isMobile ? "100%" : "50%"}>
          Or just wanna say Hi. We’d love to get to know you. Tell us a little
          about yourself and how we can help. Get answers to all your questions
          about our online service here 24/7. We are always open.
        </Text>
      </Stack>
      <Flex
        m={isMobile ? "0px" : "50px"}
        gap={50}
        direction={isMobile ? "column" : "row"}
      >
        <Stack w={isMobile ? "95%" : "50%"} p={20}>
          <Title
            order={3}
            style={{ borderBottom: "2px dashed rgb(0,0,0,0.2)" }}
          >
            Send Us a Message
          </Title>
          <Flex
            direction={"column"}
            gap={20}
            className={classes.contact}
            p="xl"
          >
            <TextInput placeholder="Your Name" />
            <TextInput placeholder="Email Address" type="email" />
            <TextInput placeholder="Phone Number" />
            <TextInput placeholder="Street Address" />
            <Textarea placeholder="Message Text" minRows={5} />
            <Button label={"Send Message"} />
          </Flex>
        </Stack>
        <Stack w={isMobile ? "95%" : "50%"} p="xl">
          <Title
            order={3}
            style={{ borderBottom: "2px dashed rgb(0,0,0,0.2)" }}
          >
            Contact Us
          </Title>
          <Box className={classes.contact}>
            <Title order={5}>BabyStreet Trading LTD</Title>
            <Text>Childcity.shop</Text>
            <Text>Lahore</Text>
          </Box>
          <Box className={classes.contact}>
            <Title order={5}>Wholesale Dealer Inquiries</Title>
            <Text>
              If you’re interested in wholesale orders or dealership
              opportunities and offers, contact us here
            </Text>
          </Box>
          <Box
            className={classes.contact}
            style={{ backgroundColor: theme.colors.primary[0], color: "white" }}
          >
            <Text fw={"bold"} fz={"lg"}>
              Brand Ambassador Program
            </Text>
            <Text>
              Are you a “Mommy Blogger or social influencer?” Do you love
              stylish kids clothes as we do? We are looking for bloggers or
              trendy moms that would love to share their style with our matching
              models. Please, contact us here for more information.
            </Text>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Contact;
