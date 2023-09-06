import { Box, Group, Stack, Text } from "@mantine/core";
import React from "react";

const AdditionalInfo = ({ data }) => {
  return (
    <Stack>
      {Object.keys(data).map((obj, ind) => (
        <Group key={ind}>
          <Text>{obj}:</Text>
          <Text>{data[obj]}</Text>
        </Group>
      ))}
    </Stack>
  );
};

export default AdditionalInfo;
