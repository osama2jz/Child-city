import { Box, Tabs, Title, useMantineTheme } from "@mantine/core";
import React from "react";
import { useStyles } from "./styles";
import { useMediaQuery } from "@mantine/hooks";
import MyOrders from "./Orders.";
import Settings from "./Settings";
import Profile from "./Profile";

const Dashboard = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  return (
    <Box>
      <Box className={classes.main}>
        <Title align="center" color="rgb(0,0,0,0.8)">
          My Dashboard
        </Title>
      </Box>
      <Tabs defaultValue="orders" variant="pills" my={50}>
        <Tabs.List position="center">
          <Tabs.Tab value="profile">Profile</Tabs.Tab>
          <Tabs.Tab value="orders">My Orders</Tabs.Tab>
          <Tabs.Tab value="settings">Settings</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profile" pt="xs">
          <Profile />
        </Tabs.Panel>

        <Tabs.Panel value="orders" pt="xs">
          <MyOrders />
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="xs">
          <Settings />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default Dashboard;
