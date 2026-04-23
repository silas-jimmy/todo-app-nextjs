"use client";

import {
  Card,
  Title,
  Flex,
  TextInput,
  PasswordInput,
  Button,
  Grid,
} from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";

export default function SignUp() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirm: "",
    },

    validate: {
      first_name: hasLength({ min: 1 }, "Required!"),
      last_name: hasLength({ min: 1 }, "Required!"),
      username: hasLength({ min: 1 }, "Required!"),
      email: isEmail("Invalid email!"),
      password: hasLength({ min: 8 }, "Minimum of 8 characters"),
      confirm: hasLength({ min: 8 }, "Minimum of 8 characters"),
    },
  });

  return (
    <Card withBorder>
      <Title order={2} mb={16}>
        Sign Up
      </Title>

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Flex direction="column" gap="lg">
          <Grid columns={2}>
            <TextInput
              withAsterisk
              label="First name"
              key={form.key("first_name")}
              {...form.getInputProps("first_name")}
            />

            <TextInput
              withAsterisk
              label="Last name"
              key={form.key("last_name")}
              {...form.getInputProps("last_name")}
            />
          </Grid>

          <Grid columns={2}>
            <TextInput
              withAsterisk
              label="Username"
              key={form.key("username")}
              {...form.getInputProps("username")}
            />

            <TextInput
              withAsterisk
              label="Email address"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
          </Grid>

          <Grid columns={2}>
            <PasswordInput
              withAsterisk
              w="100%"
              label="Password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />

            <PasswordInput
              withAsterisk
              w="100%"
              label="Confirm password"
              key={form.key("confirm")}
              {...form.getInputProps("confirm")}
            />
          </Grid>

          <Button fullWidth type="submit" variant="filled">
            Create account
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
