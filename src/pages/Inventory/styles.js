import { createStyles } from "@mantine/core";
import inventory from "../../assets/inventory.jpg";

export const useStyles = createStyles((theme) => ({
  main: {
    backgroundImage: `url(${inventory})`,
    paddingBlock: "100px",
  },
  content: {
    padding: "4%",
    display: "flex",
    gap: "20px",
    justifyContent: "space-between",
    [`@media (max-width: 1100px)`]: {
      flexDirection: "column",
      padding: 20,
    },
  },
  cat: {
    backgroundColor: theme.colors.primary,
    padding: "10px",
    margin: "5px",
    color: "white",
    border: "2px dashed white",
    borderRadius: "10px",
    boxShadow: `0 0 0 3px ${theme.colors.primary[0]}`,
  },
}));
