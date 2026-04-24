"use client";

import {
  Card,
  Title,
  Flex,
  TextInput,
  PasswordInput,
  Button,
  Grid,
  Text,
  Anchor,
} from "@mantine/core";
import {
  hasLength,
  isEmail,
  isNotEmpty,
  matchesField,
  useForm,
} from "@mantine/form";
import Link from "next/link";

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
      first_name: isNotEmpty("First name is required!"),
      last_name: isNotEmpty("Last name is required!"),
      username: isNotEmpty("Username is required!"),
      email: isEmail("Invalid email!"),
      password: hasLength(
        { min: 8 },
        "Password must be more than 7 characters!",
      ),
      confirm: matchesField("password", "Passwords do not match!"),
    },
  });

  return (
    <Card withBorder w="450">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Grid>
          <Grid.Col span={12}>
            <Title order={2} mb={16}>
              Sign Up
            </Title>
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="First name"
              key={form.key("first_name")}
              {...form.getInputProps("first_name")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Last name"
              key={form.key("last_name")}
              {...form.getInputProps("last_name")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Username"
              key={form.key("username")}
              {...form.getInputProps("username")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Email address"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <PasswordInput
              withAsterisk
              label="Password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <PasswordInput
              withAsterisk
              label="Confirm password"
              key={form.key("confirm")}
              {...form.getInputProps("confirm")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Button fullWidth type="submit" variant="filled">
              Create account
            </Button>
          </Grid.Col>

          <Grid.Col span={12}>
            <Flex align="center" justify="center" gap={3}>
              <Text size="sm">Already have an account?</Text>

              <Anchor component={Link} href="/auth/sign-in" size="sm">
                Sign in
              </Anchor>
            </Flex>
          </Grid.Col>
        </Grid>
      </form>
    </Card>
  );
}
