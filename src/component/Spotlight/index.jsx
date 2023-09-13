import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Photo } from "tabler-icons-react";

const Spotlight = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      category: "Clothing",
      title: "This is a title",
      gender: "Girls",
      type: "Kamez Shalwar",
      sizes: ["1-2Y", "2-3Y", "3-4Y", "3-6M"],
      season: "summer",
      price: 1999,
      salePrice: 1500,
    },
    {
      category: "Clothing",
      title: "Some dress",
      gender: "Boys",
      type: "Western",
      season: "winter",
      sizes: ["1-2Y", "3-4Y", "3-6M"],
      price: 1500,
      salePrice: 900,
    },
    {
      category: "Clothing",
      gender: "Boys",
      title: "Pretty dress",
      type: "Western",
      season: "summer",
      sizes: ["1-2Y", "2-3Y", "3-4Y", "6-9M"],
      price: 800,
    },
    {
      category: "Clothing",
      gender: "Girls",
      title: "Pretty dress for girls",
      type: "Kamez Shalwar",
      season: "Winter Collection",
      sizes: ["1-2Y", "2-3Y", "3-4Y", "6-9M"],
      price: 800,
    },
    {
      category: "Accessories",
      title: "Pretty Socks",
      season: "Winter Collection",
      sizes: ["1-2Y", "2-3Y", "3-4Y", "6-9M"],
      price: 800,
    },
  ]);
  return data.map((obj, ind) => {
    return {
      title: obj.title,
      icon: <Photo />,
      onTrigger: () => navigate(`/product/${obj.title}`),
      description: `Price: ${obj.price}, sizes: ${obj?.sizes.join(",")}`,
    };
  });
};

export default Spotlight;
