import { useQuery } from "react-query";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../constants";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [aboutUs, setAboutUs] = useState({});
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setWishlist(JSON.parse(localStorage.getItem("wishlist")) ?? []);
    setCart(JSON.parse(localStorage.getItem("cart")) ?? []);
  }, []);
  const value = {
    aboutUs,
    cart,
    setCart,
    wishlist,
    setWishlist,
    user,
    setUser,
  };
  const _ = useQuery(
    ["fetchAboutUs"],
    () => {
      return axios.get(`${backendUrl + `/aboutUs`}`);
    },
    {
      onSuccess: (response) => {
        setAboutUs(response.data?.data[0]);
      },
    }
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
