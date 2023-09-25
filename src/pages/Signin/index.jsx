import {
  Anchor,
  Flex,
  Group,
  Modal,
  PasswordInput,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import Button from "../../component/Button";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useMutation } from "react-query";
import { backendUrl } from "../../constants";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

const Signin = ({ open, setOpen }) => {
  const theme = useMantineTheme();
  const { setUser } = useContext(UserContext);
  const [signup, setSignup] = useState(false);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      name: "",
      password: "",
      phoneNumber: "",
      confirmPassword: "",
    },

    validate: {
      name: (value) =>
        value?.length > 2 && value?.length < 30
          ? null
          : "Please enter full name",
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Please Enter a valid email",
      password: (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
          value
        )
          ? null
          : "Password must contain 8 to 15 characters.",

      confirmPassword: (value, values) =>
        value !== values?.password ? "Passwords did not match" : null,
    },
  });
  const SignInform = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (val) =>
        /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{0,6}$/i.test(val)
          ? null
          : "Please enter a valid email",
      password: (value) => (value?.length < 1 ? "Please enter password" : null),
    },
  });
  const handleSignup = useMutation(
    (values) => {
      return axios.post(`${backendUrl + "/user/signup"}`, values, {});
    },
    {
      onSuccess: (response) => {
        form.reset();
        setSignup(false);
        toast.success("Sign Up Successful.");
      },
      onError: (err) => {
        toast.error(err.response.data.error);
      },
    }
  );

  const handleLogin = useMutation(
    (values) => {
      return axios.post(`${backendUrl + "/user/signin"}`, values);
    },
    {
      onSuccess: (response) => {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        toast.success("Sign in Successful.");
        setOpen(false);
      },
      onError: (err) => {
        // console.log(response);
        toast.error(err.response.data.error);
      },
    }
  );
  return (
    <Modal
      opened={open}
      onClose={() => {
        SignInform.reset();
        form.reset();
        setOpen(false);
      }}
      title="Sign In to Child City"
      centered
      size="lg"
    >
      {!signup ? (
        <form
          onSubmit={SignInform.onSubmit((values) => handleLogin.mutate(values))}
        >
          <Flex direction={"column"} gap="20px" p={"md"}>
            <TextInput
              placeholder="example@email.com"
              label="Email"
              withAsterisk
              {...SignInform.getInputProps("email")}
            />
            <PasswordInput
              placeholder="*******"
              label="Password"
              withAsterisk
              {...SignInform.getInputProps("password")}
            />
            <Button label={"Sign In"} mt="md" type={"submit"} />
            <Group position="center">
              <Text>New to ChildCity? </Text>
              <Anchor
                color={theme.colors.primary}
                onClick={() => setSignup(true)}
              >
                Sign Up here
              </Anchor>
            </Group>
          </Flex>
        </form>
      ) : (
        <form onSubmit={form.onSubmit((values) => handleSignup.mutate(values))}>
          <Flex direction={"column"} gap="10px" p={"md"}>
            <TextInput
              placeholder="Full Name"
              label="Full Name"
              {...form.getInputProps("name")}
            />
            <TextInput
              placeholder="example@email.com"
              label="Email"
              {...form.getInputProps("email")}
            />
            <TextInput
              placeholder="+9322432423"
              label="Phone Number"
              {...form.getInputProps("phoneNumber")}
            />
            <PasswordInput
              placeholder="*******"
              label="Password"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              placeholder="*******"
              label="Confirm Password"
              {...form.getInputProps("confirmPassword")}
            />
            <Button label={"Sign In"} mt="md" type={"submit"} />
            <Group position="center">
              <Text>Already registered on ChildCity? </Text>
              <Anchor
                color={theme.colors.primary}
                onClick={() => setSignup(false)}
              >
                Sign In here
              </Anchor>
            </Group>
          </Flex>
        </form>
      )}
    </Modal>
  );
};

export default Signin;
