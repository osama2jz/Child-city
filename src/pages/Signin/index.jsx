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
import React, { useState } from "react";
import Button from "../../component/Button";

const Signin = ({ open, setOpen }) => {
  const theme = useMantineTheme();
  const [signup, setSignup] = useState(false);
  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Sign In to Child City"
      centered
      size="lg"
    >
      {!signup ? (
        <form>
          <Flex direction={"column"} gap="20px" p={"md"}>
            <TextInput placeholder="example@email.com" label="Email" />
            <PasswordInput placeholder="*******" label="Password" />
            <Button label={"Sign In"} mt="md"/>
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
        <form>
          <Flex direction={"column"} gap="10px" p={"md"}>
            <TextInput placeholder="Full Name" label="Full Name" />
            <TextInput placeholder="example@email.com" label="Email" />
            <TextInput placeholder="+9322432423" label="Phone Number" />
            <PasswordInput placeholder="*******" label="Password" />
            <PasswordInput placeholder="*******" label="Confirm Password" />
            <Button label={"Sign In"} mt="md"/>
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
