import { createStyles } from "@mantine/core";
import inventory from "../../assets/inventory.jpg";

export const useStyles = createStyles((theme) => ({
  main: {
    backgroundImage: `url(${inventory})`,
    paddingBlock: "100px",
  },
  details: {
    backgroundColor: "rgb(0,0,0,0.05)",
    borderRadius: "10px",
    padding: "20px",
    marginInline: "20px",
  },
}));
