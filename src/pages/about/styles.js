import { createStyles } from "@mantine/core";
import inventory from "../../assets/inventory.jpg";

export const useStyles = createStyles((theme) => ({
  main: {
    backgroundImage: `url(${inventory})`,
    paddingBlock: "100px",
  },
  cardsMain: {
    backgroundColor: "#ebf7fa",
    gap: "30px",
    justifyContent: "space-between",
  },
  cards: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: "20px",
    border: "2px dashed rgb(0,0,0,0.2)",
    boxShadow: "0px 0px 0px 5px white",
    borderRadius: "10px",
    gap: "20px",
    fontSize: 18,
    minHeight: "380px",
    width: "380px",
    cursor: "pointer",
    transition: "all ease 0.3s",
    ":hover": {
      transform: "translateY(-10px)",
      boxShadow: "0px 0px 10px 10px white",
    },
    "& > img": {
      borderRadius: "50%",
    },
  },
}));
