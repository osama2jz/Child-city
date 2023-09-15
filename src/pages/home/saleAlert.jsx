import { Box, Image, Modal } from "@mantine/core";
import React, { useContext, useState } from "react";
import home from "../../assets/home.jpg";
import { X } from "tabler-icons-react";
import { UserContext } from "../../context/UserContext";

const SaleAlert = () => {
  const { aboutUs } = useContext(UserContext);

  const [open, setOpen] = useState(aboutUs?.saleAlertImage ? true : false);
  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      centered
      size={"lg"}
      styles={{
        body: { padding: 0, position: "relative" },
        header: { display: "none" },
      }}
    >
      <Image src={aboutUs?.saleAlertImage} fit="cover" />
      <X
        cursor="pointer"
        onClick={() => setOpen(false)}
        style={{ position: "absolute", top: 10, right: 10 }}
      />
    </Modal>
  );
};

export default SaleAlert;
