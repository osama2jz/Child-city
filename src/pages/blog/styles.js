import { createStyles } from "@mantine/core";
import inventory from "../../assets/blog.jpg";

export const useStyles = createStyles((theme) => ({
  main: {
    backgroundImage: `url(${inventory})`,
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "500px",
    objectFit: "cover",
    backgroundAttachment: "fixed",
    backgroundPosition: "top center",
  },
  qoute: {
    backgroundColor: theme.colors.primary,
    padding: "30px",
    borderRadius: "20px",
    fontSize: "26px",
    color: "white",
    border: "2px dashed white",
    boxShadow: `0 0 0px 5px ${theme.colors.primary[0]}`,
  },
}));
