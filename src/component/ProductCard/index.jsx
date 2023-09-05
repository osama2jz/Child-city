import {
  Badge,
  Box,
  Group,
  Image,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import logo from "../../assets/example.jpg";
import { useStyles } from "./styles";
import { CreditCard, Heart, ShoppingBag } from "tabler-icons-react";
import { useLocation } from "react-router-dom";

const ProductCard = ({}) => {
  const theme = useMantineTheme();
  const location = useLocation().pathname;
  const [show, setShow] = useState(false);
  const { classes } = useStyles({ show });
  return (
    <Box
      className={classes.main}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Image
        src={logo}
        width={location === "/" ? 300 : 250}
        height={location === "/" ? 300 : 250}
      />
      <Badge w={50} h={50} className={classes.badge}>
        NEW
      </Badge>
      <Text>Turkish Style Romper Full Sleeves</Text>
      <Group>
        <Text style={{ textDecoration: "line-through", opacity: 0.7 }}>
          Rs 2999
        </Text>
        <Text color={theme.colors.primary}>Rs 1999</Text>
      </Group>
      <Group className={classes.hover}>
        <Tooltip label="Add to Cart">
          <ShoppingBag size={30} className={classes.icon} />
        </Tooltip>
        <CreditCard size={30} className={classes.icon} />
        <Heart size={30} className={classes.icon} />
      </Group>
    </Box>
  );
};

export default ProductCard;
