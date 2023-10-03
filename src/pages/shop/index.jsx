import React, { useState } from "react";
import { useStyles } from "./styles";
import girls from "../../assets/girls.jpg";
import boys from "../../assets/boys.jpg";
import toys from "../../assets/toys.jpg";
import access from "../../assets/access.jpg";
import newBorn from "../../assets/newBorn.jpg";
import CategoryCard from "../home/CategoryCard";
import { Box, Group, Loader, Title } from "@mantine/core";
import { useQuery } from "react-query";
import axios from "axios";
import { backendUrl } from "../../constants";

const Shop = () => {
  const { classes } = useStyles();
  const [data, setData] = useState([]);
  const { status } = useQuery(
    "fetchCats",
    () => {
      return axios.get(backendUrl + "/category");
    },
  {
      onSuccess: (res) => {
        const data = res.data.data;
        let newData=data.filter((item) => !item.blocked);
        setData(newData);
      },
    }
  );
  return (
    <Box>
      <Box className={classes.main}>
        <Title align="center" color="rgb(0,0,0,0.8)">
          Baby Shop
        </Title>
      </Box>
      <Group position="center" my="50px" spacing={"30px"}>
        {status === "loading" ? (
          <Loader />
        ) : (
          data?.map((obj, ind) => (
            <CategoryCard
              key={ind}
              img={obj.image}
              title1={obj.title}
              title2={obj?.subTitle}
              text={obj?.description}
              to={"/" + obj?.title}
            />
          ))
        )}
      </Group>
    </Box>
  );
};

export default Shop;
