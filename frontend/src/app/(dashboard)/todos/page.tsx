"use client";

import { Button } from "@mantine/core";
import Link from "next/link";

export default function Todos() {
  return (
    <div>
      <h1>All todos</h1>
      <Button variant="filled" component={Link} href="/todos/create">Create todo</Button>
    </div>
  );
}
