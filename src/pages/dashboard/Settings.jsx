import {
  Box,
  Flex,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useContext, useState } from "react";
import { Trash } from "tabler-icons-react";
import Button from "../../component/Button";
import { useForm } from "@mantine/form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import axios from "axios";
import { backendUrl } from "../../constants";
import { UserContext } from "../../context/UserContext";
import AddAddress from "./AddAddress";

const Settings = () => {
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const { user, setUser } = useContext(UserContext);

  const removeAddress = (ind) => {
    let newAdd = user.addresses.filter((_, i) => i !== ind);
    setAddress({ addresses: newAdd, ...address.default });
  };

  let addresses = user.addresses;
  let newAdd;
  const handleAddAddress = useMutation(
    (ind) => {
      newAdd = addresses.filter((_, i) => i !== ind);
      return axios.put(
        `${backendUrl + `/user/changeAddress/${user?.userId}`}`,
        newAdd,
        {
          // headers: {
          //   authorization: `Bearer ${user.token}`,
          // },
        }
      );
    },
    {
      onSuccess: (response) => {
        toast.success(response?.data?.message);
        form.reset();
        close();
        setUser({ ...user, addresses: newAdd });
        let local = user;
        local.addresses = newAdd;
        localStorage.setItem("user", JSON.stringify(local));
      },
      onError: (err) => {
        toast.error(err.response.data.error);
      },
    }
  );

  const form = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validate: {
      oldPassword: (value) => (value?.length < 1 ? "Enter old password" : null),
      newPassword: (value) =>
        value?.length > 7 ? null : "Password must contain 8 to 15 characters.",
      confirmPassword: (value, values) =>
        value !== values?.newPassword ? "Passwords did not match" : null,
    },
  });
  const handleChangePassword = useMutation(
    (values) => {
      return axios.put(
        `${backendUrl + `/user/changePassword/${user?.userId}`}`,
        values,
        {
          // headers: {
          //   authorization: `Bearer ${user.token}`,
          // },
        }
      );
    },
    {
      onSuccess: (response) => {
        if (!response.data.status) return toast.error(response?.data?.message);
        toast.success(response?.data?.message);
        form.reset();
      },
      onError: (err) => {
        toast.error(err.response.data.error);
      },
    }
  );
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
        onSubmit={form.onSubmit((values) =>
          handleChangePassword.mutate(values)
        )}
      >
        <Stack
          style={{ border: "2px dashed rgb(0,0,0,0.2)", borderRadius: "10px" }}
          p={30}
        >
          <Title align="center">Change Password</Title>
          <PasswordInput
            label="Old Password"
            {...form.getInputProps("oldPassword")}
          />
          <PasswordInput
            label="New Password"
            {...form.getInputProps("newPassword")}
          />
          <PasswordInput
            label="Confirm Password"
            {...form.getInputProps("confirmPassword")}
          />
          <Button label={"Change Password"} type={"submit"} />
        </Stack>
      </form>
      <Stack
        w={isMobile ? "100%" : "40%"}
        h={400}
        style={{
          border: "2px dashed rgb(0,0,0,0.2)",
          borderRadius: "10px",
          position: "relative",
          
        }}
        p={30}
      >
        <Title align="center">Manage Addresses</Title>
        <Stack style={{overflow: "scroll", marginBottom:'50px'}}>
          {user?.addresses && user?.addresses?.length > 0 ? (
            user?.addresses.map((add, ind) => (
              <Flex key={ind} justify="space-between">
                <Text>
                  {ind +
                    1 +
                    "- " +
                    add.address +
                    ", " +
                    add?.city +
                    ", " +
                    add.province +
                    ", " +
                    add?.postalCode}
                </Text>
                <Trash
                  cursor={"pointer"}
                  onClick={() => handleAddAddress.mutate(ind)}
                />
              </Flex>
            ))
          ) : (
            <Title color="rgb(0,0,0,0.2)" order={4} align="center">
              You dont have any addresses
            </Title>
          )}
        </Stack>
        <AddAddress />
      </Stack>
    </Flex>
  );
};

export default Settings;
