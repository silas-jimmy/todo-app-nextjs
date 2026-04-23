"use client";

import {
  Button,
  Card,
  Checkbox,
  Flex,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";

export default function SignIn() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },

    validate: {
      email: isEmail("Invalid email"),
      password: hasLength({ min: 8 }, "Min of 8 characters"),
    },
  });

  return (
    <Card withBorder w="350">
      <Title order={2} mb={16}>
        Sign In
      </Title>

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Flex direction="column" gap="lg">
          <Flex direction="column" gap="xs">
            <TextInput
              withAsterisk
              label="Email Address"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />

            <PasswordInput
              withAsterisk
              label="Password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />

            <Flex justify="space-between" align="center">
              <Checkbox
                label="Remember me"
                key={form.key("remember")}
                {...form.getInputProps("remember", { type: "checkbox" })}
              />

              <Button component="a" href="#">Forgot password?</Button>
            </Flex>
          </Flex>

          <Button fullWidth type="submit" variant="filled">
            Login
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
