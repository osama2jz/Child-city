import {
  Box,
  Group,
  Modal,
  Select,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import React, { useContext } from "react";
import Button from "../../component/Button";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import axios from "axios";
import { backendUrl } from "../../constants";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";

const AddAddress = () => {
  const { user, setUser } = useContext(UserContext);
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      province: "",
      city: "",
      postalCode: "",
      address: "",
    },

    validate: {
      province: (value) => (value?.length > 0 ? null : "Select Province."),
      city: (value) => (value?.length > 0 ? null : "Enter city name."),
      address: (value) => (value?.length > 0 ? null : "Enter street address."),
    },
  });
  let addresses = user.addresses;
  const handleAddAddress = useMutation(
    (values) => {
      addresses.push(values);
      return axios.put(
        `${backendUrl + `/user/changeAddress/${user?.userId}`}`,
        addresses,
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
        setUser({ ...user, addresses: addresses });
        localStorage.setItem("user", JSON.stringify(user));
      },
      onError: (err) => {
        toast.error(err.response.data.error);
      },
    }
  );
  return (
    <Box style={{ position: "absolute", bottom: 20, width: "90%" }}>
      <Button label={"Add Address"} onClick={open} fullWidth />
      <Modal opened={opened} onClose={close} centered title="Add Address">
        <form
          onSubmit={form.onSubmit((values) => handleAddAddress.mutate(values))}
        >
          <Stack>
            <Select
              placeholder="Province"
              label="Province"
              withAsterisk
              data={[
                "Azad Kashmir",
                "Balochistan",
                "FATA",
                "Gilgit Baltistan",
                "Isalamabad",
                "KPK",
                "Punjab",
                "Sindh",
              ]}
              {...form.getInputProps("province")}
            />
            <TextInput
              placeholder="City"
              label="City"
              withAsterisk
              {...form.getInputProps("city")}
            />
            <TextInput
              placeholder="Zip Code"
              label="Zip Code"
              type="number"
              {...form.getInputProps("postalCode")}
            />
            <Textarea
              placeholder="Address"
              label="Address"
              withAsterisk
              {...form.getInputProps("address")}
            />
            <Group position="center" my="lg">
              <Button
                label={"Cancel"}
                color="blue"
                compact={true}
                onClick={close}
              />
              <Button label={"Save"} type={"submit"} compact={true} loading={handleAddAddress.isLoading}/>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
};

export default AddAddress;
