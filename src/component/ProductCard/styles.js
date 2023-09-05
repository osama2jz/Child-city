import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme, { show }) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    cursor: "pointer",
    [`@media (max-width: 1100px)`]: {
      transform: "scale(0.9)",
    },
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "white",
    fontSize: 14,
    padding: 0,
  },
  hover: {
    display: show ? "flex" : "none",
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  icon: {
    backgroundColor: "white",
    color: "black",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    padding: "10px",
    ":hover": {
      backgroundColor: "pink",
      color: "white",
    },
  },
}));
