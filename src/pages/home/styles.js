import { createStyles, keyframes } from "@mantine/core";
import home from "../../assets/home.jpg";
import dark from "../../assets/dark.jpg";
export const rightToLeft = keyframes({
  from: { transform: "translateX(0%) translateZ(0) " },
  // "50%": { transform: "translateX(-80%) translateZ(0) scaleX(0)" },
  to: { transform: "translateX(-90%) translateZ(0) " },
});
export const useStyles = createStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    width: "100%",
    height: "100%",
    aspectRatio: "3",
    position: "relative",
    [`@media (max-width: 1100px)`]: {
      aspectRatio: "5/2",
      height:'100%'
    },
  },
  buttons: {
    zIndex: 99,
    position: "absolute",
  },
  card: {
    position: "relative",
    width: "400px",
    height: "285px",
    display: "flex",
    color: "white",
    cursor: "pointer",
    flexDirection: "column",
    justifyContent: "flex-end",
    borderRadius: "10px",
    overflow: "hidden",
    ":hover": {
      "& > img": {
        transform: "scale(1.1)",
      },
    },
    "& > img": {
      transition: "transform 0.2s",
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: "10px",
      objectFit: "cover",
      zIndex: -1,
    },
    [`@media (max-width: 1100px)`]: {
      transform: "scale(0.9)",
    },
  },
  dark: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
    gap: "20px",
    backgroundImage: `url(${dark})`,
    height: "440px",
  },
  border: {
    position: "absolute",
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
    borderRadius: "10px",
    border: "2px dashed white",
    zIndex: 99,
  },
  wave: {
    position: "absolute",
    bottom: 0,
    // animation: `${rightToLeft} 10s linear infinite`,
    backgroundRepeat: "repeat",
  },
  wave2: {
    position: "absolute",
    bottom: 0,
    opacity: 0.7,
    // animation: `${rightToLeft} 15s linear infinite`,
    backgroundRepeat: "repeat",
  },
  wave1: {
    position: "absolute",
    bottom: 0,
    opacity: 0.5,
  },
}));
