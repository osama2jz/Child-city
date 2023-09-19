import { Box, Text } from "@mantine/core";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Profile = () => {
  const {user}=useContext(UserContext)
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
        Name: <b>{user?.name}</b>
      </Text>
      <Text>
        Email: <b>{user?.email}</b>
      </Text>
    </Box>
  );
};

export default Profile;
