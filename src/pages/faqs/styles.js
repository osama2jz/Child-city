import { createStyles } from "@mantine/core";
import inventory from "../../assets/inventory.jpg";

export const useStyles = createStyles((theme) => ({
  main: {
    backgroundImage: `url(${inventory})`,
    paddingBlock: "100px",
  },
  question: {
    cursor: "pointer",
    borderRadius: "10px",
    ":hover": {
      backgroundColor: theme.colors.primary[2],
      color: "white",
    },
  },
}));
