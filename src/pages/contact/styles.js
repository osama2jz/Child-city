import { createStyles } from "@mantine/core";
import inventory from "../../assets/inventory.jpg";

export const useStyles = createStyles((theme) => ({
  main: {
    backgroundImage: `url(${inventory})`,
    paddingBlock: "100px",
  },
  contact: {
    border: "2px dashed rgb(0,0,0,0.1)",
    borderRadius: "10px",
    padding: "20px",
  },
}));
