import { Flex, Stack, Text, TextInput, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import { Trash } from "tabler-icons-react";
import Button from "../../component/Button";
import { useForm } from "@mantine/form";

const Settings = () => {
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const [newAdd, setNewAdd] = useState("");
  const [address, setAddress] = useState({
    addresses: [
      "address 1, islamabad pakistan",
      "address 2, islamabad pakistan",
      "address 3, islamabad pakistan",
    ],
    default: null,
  });

  const removeAddress = (ind) => {
    let newAdd = address.addresses.filter((obj, i) => i !== ind);
    setAddress({ addresses: newAdd, ...address.default });
  };

  const addAddress = () => {
    setAddress({
      addresses: [...address.addresses, newAdd],
      ...address.default,
    });
    setNewAdd("");
  };

  const form = useForm({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      oldPassword: (value) => (value?.length < 1 ? "Enter old password" : null),
      password: (value) =>
        value?.length > 7 ? null : "Password must contain 8 to 15 characters.",
      confirmPassword: (value, values) =>
        value !== values?.password ? "Passwords did not match" : null,
    },
  });

  return (
    <Flex
      direction={isMobile ? "column" : "row"}
      justify={"space-evenly"}
      w={"90%"}
      m="auto"
      mt={20}
      gap="lg"
    >
      <form
        style={{ width: isMobile ? "100%" : "40%" }}
        onSubmit={form.onSubmit((values) => console.log(values))}
      >
        <Stack
          style={{ border: "2px dashed rgb(0,0,0,0.2)", borderRadius: "10px" }}
          p={30}
        >
          <Title align="center">Change Password</Title>
          <TextInput
            label="Old Password"
            {...form.getInputProps("oldPassword")}
          />
          <TextInput label="New Password" {...form.getInputProps("password")} />
          <TextInput
            label="Confirm Password"
            {...form.getInputProps("confirmPassword")}
          />
          <Button label={"Change Password"} type={"submit"} />
        </Stack>
      </form>
      <Stack
        w={isMobile ? "100%" : "40%"}
        style={{ border: "2px dashed rgb(0,0,0,0.2)", borderRadius: "10px" }}
        p={30}
      >
        <Title align="center">Manage Addresses</Title>
        {address.addresses.map((add, ind) => (
          <Flex key={ind} justify="space-between">
            <Text>
              Address {ind + 1}: {add}
            </Text>
            <Trash cursor={"pointer"} onClick={() => removeAddress(ind)} />
          </Flex>
        ))}
        <TextInput
          label="Add Address"
          value={newAdd}
          onChange={(e) => setNewAdd(e.target.value)}
        />
        <Button
          label={"Save"}
          disabled={newAdd.length < 1}
          onClick={() => addAddress()}
        />
      </Stack>
    </Flex>
  );
};

export default Settings;
