import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Photo } from "tabler-icons-react";
import { backendUrl } from "../../constants";
import axios from "axios";
import { Image } from "@mantine/core";

const Spotlight = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { status } = useQuery(
    "fetchProducts",
    () => {
      return axios.get(backendUrl + "/product", {});
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        let neww = data.filter((item) => !item.blocked);
        setData(neww);
      },
    }
  );
  return data.map((obj, ind) => {
    return {
      title: obj.title,
      icon: <Image src={obj.images[0]} width={50} />,
      onTrigger: () =>
        navigate(`/product/${obj._id}`, { state: { data: obj } }),
      description: `Price: ${obj.price}, sizes: ${obj?.sizes.join(",")}`,
    };
  });
};

export default Spotlight;
