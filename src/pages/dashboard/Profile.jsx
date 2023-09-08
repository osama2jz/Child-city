import { Box, Text } from "@mantine/core";

const Profile = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        border: "2px dashed rgb(0,0,0,0.2)",
        padding: "20px",
        marginTop: "50px",
        margin: "auto",
        width: "350px",
      }}
    >
      <Text>
        Name: <b>Muhammad Usama</b>
      </Text>
      <Text>
        Email: <b>mosama4u@gmail.com</b>
      </Text>
    </Box>
  );
};

export default Profile;
