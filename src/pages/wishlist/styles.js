import { createStyles } from "@mantine/core";
import inventory from "../../assets/inventory.jpg";

export const useStyles = createStyles((theme) => ({
  main: {
    backgroundImage: `url(${inventory})`,
    paddingBlock: "100px",
  },
}));
