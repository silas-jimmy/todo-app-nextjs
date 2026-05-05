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
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [loginButtonLoading, loginButtonHandlers] = useDisclosure(false);
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

  /**
   * Handles the user login logic.
   */
  async function handleLogin(data: any) {
    loginButtonHandlers.open();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_USERS_SERVICE_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    loginButtonHandlers.close();

    const result = await response.json();

    if (response.ok) {
      notifications.show({
        title: "Success",
        message: "Login successful.",
        color: "green",
        position: "top-right",
        autoClose: 3000,
      });

      const token = result.data;

      localStorage.setItem("token", token);

      router.push("/todos");
    } else {
      const errorMessages = Object.entries(result.data).map((error) => {
        const field = error[0];
        const message = error[1] as string[];

        return `${field.charAt(0).toUpperCase() + field.slice(1)}: ${message[0]}`;
      });

      notifications.show({
        title: result.message,
        message: errorMessages.join("\n"),
        color: "red",
        position: "top-right",
        autoClose: 4000,
      });
    }
  }

  return (
    <Card withBorder w="350">
      <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
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
            <Button
              fullWidth
              loading={loginButtonLoading}
              loaderProps={{ type: "dots" }}
              type="submit"
              variant="filled"
            >
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
