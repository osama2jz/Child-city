import { Box, Group, Stack, Text } from "@mantine/core";
import { useStyles } from "./styles";
import logo from "../../assets/logo.png";
import { ClockHour3, Mail, MapPin, Phone } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 1100px)");

  return (
    <Box className={classes.footer}>
      {/* <img src={logo} width={isMobile ? 300 : 400} /> */}
      <Group
        position={"apart"}
        align="flex-start"
        // mt="50px"
        style={{ width: "100%" }}
      >
        <Stack align="flex-start">
          <Text fw="600" fz={isMobile ? "md" : "lg"}>
            Information
          </Text>
          <Text className={classes.item} onClick={() => navigate("/about-us")}>
            About Us
          </Text>
          <Text className={classes.item} onClick={() => navigate("/contacts")}>
            Contact Us
          </Text>
          <Text className={classes.item}>FAQ</Text>
          <Text className={classes.item} onClick={() => navigate("/shop")}>
            BabyStreet Shop
          </Text>
          <Text className={classes.item} onClick={() => navigate("/blog")}>
            Blog
          </Text>
        </Stack>
        <Stack align="flex-start" fz={isMobile ? "md" : "lg"}>
          <Text fw="600">Extras</Text>
          <Text className={classes.item} onClick={()=>navigate('/wishlist')}>Wishlist</Text>
          <Text className={classes.item}>Terms & Conditions</Text>
          <Text className={classes.item}>Privacy Policy</Text>
        </Stack>
        <Stack align="flex-start" fz={isMobile ? "md" : "lg"}>
          <Text fw="600">Have a Question?</Text>
          <Text className={classes.item2}>
            <ClockHour3 size={20} /> Alawys Open
          </Text>
          <Text className={classes.item2}>
            <MapPin size={20} /> Lahore, Pakistan
          </Text>
          <Text className={classes.item2}>
            <Phone size={20} />
            +92-336-7866668
          </Text>
          <Text className={classes.item2}>
            <Mail size={20} />
            shop@childcity.shop
          </Text>
        </Stack>
        <Stack align="flex-start" fz={isMobile ? "md" : "lg"}>
          <Text fw="600">Payment Options</Text>
          <Text className={classes.item2}>Cash On Delivery</Text>
          <Text className={classes.item2}>Jazzcash</Text>
          <Text className={classes.item2}>Easypaisa</Text>
          <Text className={classes.item2}>Bank Transfer</Text>
        </Stack>
      </Group>
    </Box>
  );
};

export default Footer;
