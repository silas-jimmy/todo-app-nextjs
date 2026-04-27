"use client";

import {
  Anchor,
  Button,
  Card,
  Checkbox,
  Flex,
  Grid,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import Link from "next/link";

export default function SignIn() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },

    validate: {
      email: isEmail("Invalid email!"),
      password: hasLength(
        { min: 8 },
        "Password must be more than 7 characters!",
      ),
    },
  });

  return (
    <Card withBorder w="350">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Grid>
          <Grid.Col span={12}>
            <Title order={2}>Sign In</Title>
          </Grid.Col>

          <Grid.Col span={12}>
            <TextInput
              withAsterisk
              label="Email Address"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <PasswordInput
              withAsterisk
              label="Password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Flex justify="space-between" align="center">
              <Checkbox
                label="Remember me"
                key={form.key("remember")}
                {...form.getInputProps("remember", { type: "checkbox" })}
              />

              <Anchor href="#" underline="hover" size="sm">
                Forgot password?
              </Anchor>
            </Flex>
          </Grid.Col>

          <Grid.Col span={12}>
            <Button fullWidth type="submit" variant="filled">
              Login
            </Button>
          </Grid.Col>

          <Grid.Col span={12}>
            <Flex align="center" justify="center" gap={2}>
              <Text size="sm">Don't have an account?</Text>

              <Anchor component={Link} href="/sign-up" size="sm">
                Sign up
              </Anchor>
            </Flex>
          </Grid.Col>
        </Grid>
      </form>
    </Card>
  );
}
