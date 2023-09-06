import {
  Checkbox,
  Flex,
  Rating,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import React from "react";
import Button from "../../component/Button";
import { useMediaQuery } from "@mantine/hooks";

const Reviews = () => {
  const isMobile = useMediaQuery("(max-width: 1100px)");
  return (
    <Flex direction={isMobile ? "column" : "row"} gap="xl">
      <Stack w={isMobile ? "100%" : "50%"}>
        <Title order={3}>Reviews</Title>
        <Text>There are no reviews yet.</Text>
      </Stack>
      <Stack
        style={{ borderLeft: isMobile ? "none" : "2px dashed gray" }}
        pl="xl"
      >
        <Title order={3}>Be the first to review.</Title>
        <Text>
          Your email address will not be published. Required fields are marked *
        </Text>
        <Text>Your Rating</Text>
        <Rating />
        <Text>Full Name</Text>
        <TextInput placeholder="Full Name" />
        <Text>Email</Text>
        <TextInput placeholder="Email" type="email" />
        <Text>Your Review</Text>
        <Textarea minRows={6} placeholder="Type your review here..." />
        <Checkbox label="SAVE MY NAME, EMAIL, AND WEBSITE IN THIS BROWSER FOR THE NEXT TIME I COMMENT." />
        <Button label={"Submit"} />
      </Stack>
    </Flex>
  );
};

export default Reviews;
