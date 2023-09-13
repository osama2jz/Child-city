import { Box, Image, Modal } from "@mantine/core";
import React, { useState } from "react";
import home from "../../assets/home.jpg";
import { X } from "tabler-icons-react";

const SaleAlert = () => {
  const [open, setOpen] = useState(true);
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
      <Image src={home} fit="cover" />
      <X
        cursor="pointer"
        onClick={() => setOpen(false)}
        style={{ position: "absolute", top: 10, right: 10 }}
      />
    </Modal>
  );
};

export default SaleAlert;
