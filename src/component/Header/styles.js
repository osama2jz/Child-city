import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme, { opened }) => ({
  logo: {
    color: "white",
    "&:hover": {
      cursor: "pointer",
    },
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontWeight:500,
    [`@media (max-width: 1100px)`]: {
      color: "black",
    },
    "&:hover": {
      cursor: "pointer",
      scale: "1.02",
      color: theme.colors.primary,
    },
  },
  icon: {
    // backgroundColor: theme.colors.blue,
    // padding: "10px",
    color: "white",
    // borderRadius: "50%",
    cursor: "pointer",
    // border: "1px solid white",
    // "&:hover": {
    //   color: theme.colors.blue,
    //   backgroundColor: "white",
    //   borderColor: theme.colors.blue,
    //   borderWidth: "1px",
    //   borderStyle: "solid",
    // },
  },
  navigationBar: {
    [`@media (max-width: 1100px)`]: {
      flexDirection: "column",
      position: "absolute",
      top: "65px",
      padding: "50px 20px",
      color: "black !important",
      borderRadius: "10px",
      width: "100vw",
      right: 0,
      backgroundColor: "white",
      display: opened ? "flex" : "none",
      zIndex: 11,
      boxShadow: "0px 10px 10px rgb(0,0,0,0.2)",
    },
  },
  icons: {
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: "8px",
    boxShadow: "0px 0px 0px 2px #81d1e5",
    borderRadius: "20px",
    border: "2px dashed white",
  },
  iconS: {
    cursor: "pointer",
    ":hover": {
      stroke: "#ff52b5",
    },
  },
}));
