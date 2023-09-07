import { Box, Flex, Group, Image, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useStyles } from "./styles";
import about1 from "../../assets/avout1.jpg";
import about2 from "../../assets/about2.jpg";
import a1 from "../../assets/a1.jpg";
import a2 from "../../assets/a2.jpg";
import a3 from "../../assets/a3.jpg";

const AboutUs = () => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  return (
    <Box>
      <Box className={classes.main}>
        <Title align="center" color="rgb(0,0,0,0.8)">
          About Us
        </Title>
      </Box>
      <Flex
        wrap={isMobile ? "wrap" : "nowrap"}
        m={isMobile ? 50 : 100}
        gap={50}
        align={"center"}
      >
        <img src={about1} width={isMobile ? "100%" : "50%"} />
        <Stack>
          <Title>Story & Mission</Title>
          <Text fz={"lg"}>
            Our mission is to serve the needs of the parents with a one stop
            shop to ease the parenting process with zero compromise on quality
            and affordability. The aim is to ensure that looking after your baby
            is the most fun yet effortless experience for you, thanks to the
            Child City range of baby care.
          </Text>
        </Stack>
      </Flex>
      <Flex
        className={classes.cardsMain}
        wrap={isMobile ? "wrap" : "nowrap"}
        p={isMobile ? 20 : 100}
        justify={isMobile ? "center" : "space-between"}
      >
        <Stack className={classes.cards}>
          <img src={a1} width={60} />
          <Title order={5}>Cute Models</Title>
          <Text align="center">
            Discover the cuteness overload at our baby store! Meet our adorable
            models: a sunshine of smiles, a dapper dude stealing hearts, a
            princess poppet enchanting with grace, and a playful explorer
            conquering with laughter. Find joy in every outfit and embrace the
            charm they bring!
          </Text>
        </Stack>
        <Stack className={classes.cards}>
          <img src={a2} width={60} />
          <Title order={5}>Awesome Products</Title>
          <Text align="center">
            Discover the magic of our baby brand. From trendy threads to playful
            toys, snug & cozy essentials to personalized perfection, we create
            unforgettable moments. Embrace comfort, style, and joy with our
            awesome collection of baby clothing, toys, and accessories.
          </Text>
        </Stack>
        <Stack className={classes.cards}>
          <img src={a3} width={60} />
          <Title order={5}>Best Quality</Title>
          <Text align="center">
            Experience the pinnacle of quality with our baby brand. Impeccable
            craftsmanship, safe materials, enduring durability, timeless
            elegance, thoughtful functionality, and trusted excellence define
            our best-in-class collection of baby clothing, toys, and
            accessories. Give your little one the very best.
          </Text>
        </Stack>
      </Flex>
      <Flex
        wrap={isMobile ? "wrap" : "nowrap"}
        m={isMobile ? 50 : 100}
        gap={50}
        align={"center"}
      >
        <Stack>
          <Title>Our Philosophy</Title>
          <Text fz={"lg"}>
            We believe that the best gift your child can receive is your time
            and attention. And that’s something no childcare brand can produce.
            So, we do the next best thing – we create a whole range of care
            products, saving you the time you’d otherwise spend searching for
            the best for your angel. We aim to guide you and other new parents
            through the most important stages of parenting by showing you how
            simple it really is. The perfect grooming product isn’t some overtly
            complex or revolutionary device that forces you to plan your life
            around it, but one that subtly eases into your existing lifestyle.
            And that’s the mantra we follow at Child City – we put our best into
            making the simplest yet most useful baby care products.
          </Text>
        </Stack>
        <img src={about2} width={isMobile ? "100%" : "50%"} />
      </Flex>
    </Box>
  );
};

export default AboutUs;
