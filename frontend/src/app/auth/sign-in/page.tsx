"use client";

import { Button, Card, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function SignIn() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },
  });

  return (
    <Card withBorder>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput label="Email Address" />

        <PasswordInput label="Password" />

        <Button variant="filled">Login</Button>
      </form>
    </Card>
  );
}
