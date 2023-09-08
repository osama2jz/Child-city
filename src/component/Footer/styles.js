import { createStyles } from "@mantine/core";
import footer from "../../assets/footer.jpg";
export const useStyles = createStyles((theme) => ({
  footer: {
    backgroundImage: `url(${footer})`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: "50px 150px 200px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    backgroundPosition: "bottom center",
    [`@media (max-width: 1100px)`]: {
      height: "650px",
      backgroundSize: "1100px 700px",
      padding: "20px",
      backgroundPosition: "bottom left",
    },
  },
  item: {
    color: "rgb(0,0,0,0.7)",
    cursor: "pointer",
    fontWeight:600,
    fontSize: 12,
  },
  item2: {
    color: "rgb(0,0,0,0.5)",
    display: "flex",
    fontSize: 12,
    alignItems: "center",
    gap: "10px",
  },
}));
