import { useQuery } from "react-query";
import { createContext, useState } from "react";
import axios from "axios";
import { backendUrl } from "../constants";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  const [aboutUs, setAboutUs] = useState({});
  const value = { aboutUs };
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
