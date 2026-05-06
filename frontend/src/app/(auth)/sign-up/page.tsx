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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

export default function SignUp() {
  const router = useRouter();
  const [registerButtonLoading, setRegisterButtonLoading] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
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
      password_confirmation: matchesField("password", "Passwords do not match!"),
    },
  });

  /**
   * Handles the user registration logic.
   * 
   * @param data user's data to register with.
   */
  async function handleSignUp(data: any) {
    setRegisterButtonLoading(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_USERS_SERVICE_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    setRegisterButtonLoading(false);

    const results = await response.json();
    let errorMessages: string[] = [];

    if (response.ok) {
      router.push("/sign-in");
    } else {
      console.log(results.data);

      errorMessages = Object.entries(results.data).map((error) => {
        const field = error[0];
        const message = error[1] as string[];

        return `${field.charAt(0).toUpperCase() + field.slice(1)}: ${message[0]}`;
      });
    }

    notifications.show({
      title: response.ok ? "Success" : "Error",
      message: response.ok
        ? "Account created successfully."
        : errorMessages.length > 1
          ? errorMessages.join("\n")
          : results.message,
      color: response.ok ? "green" : "red",
      position: "top-right",
      autoClose: response.ok ? 3000 : 5000,
    });
  }

  return (
    <Card withBorder w="450">
      <form onSubmit={form.onSubmit((values) => handleSignUp(values))}>
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
              key={form.key("password_confirmation")}
              {...form.getInputProps("password_confirmation")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Button
              fullWidth
              loading={registerButtonLoading}
              loaderProps={{ type: 'dots' }}
              type="submit"
              variant="filled"
            >
              Create account
            </Button>
          </Grid.Col>

          <Grid.Col span={12}>
            <Flex align="center" justify="center" gap={3}>
              <Text size="sm">Already have an account?</Text>

              <Anchor component={Link} href="/sign-in" size="sm">
                Sign in
              </Anchor>
            </Flex>
          </Grid.Col>
        </Grid>
      </form>
    </Card>
  );
}
