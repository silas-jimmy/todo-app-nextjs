"use client";

import {
  ActionIcon,
  Box,
  Button,
  Group,
  LoadingOverlay,
  Stack,
  Table,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  PencilSimpleLineIcon,
  TrashIcon,
  EyeIcon,
} from "@phosphor-icons/react";

export default function Todos() {
  const [tableData, setTableData] = useState([]);
  const [isTableLoading, setTableLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_TODOS_SERVICE_URL}/todo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setTableData(result.data);

        setTableLoading(false);
      });
  }, []);

  return (
    <Stack className="bg-white px-4 py-3 rounded-xl">
      <Group justify="space-between">
        <Title order={2}>All tasks</Title>

        <Button variant="filled" component={Link} href="/todos/create">
          Add new task
        </Button>
      </Group>

      <Box pos="relative">
        <LoadingOverlay visible={isTableLoading} />

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Time</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {tableData.map((todo: any) => (
              <Table.Tr key={todo.id}>
                <Table.Td>{todo.title}</Table.Td>
                <Table.Td>{todo.date}</Table.Td>
                <Table.Td>{todo.time}</Table.Td>
                <Table.Td>
                  <Group>
                    <ActionIcon
                      component={Link}
                      href={`/todos/${todo.id}/view`}
                      variant="default"
                      aria-label="View todo"
                    >
                      <EyeIcon size={18} />
                    </ActionIcon>

                    <ActionIcon
                      component={Link}
                      href={`/todos/${todo.id}/edit`}
                      variant="outline"
                      aria-label="Edit todo"
                    >
                      <PencilSimpleLineIcon size={18} />
                    </ActionIcon>

                    <ActionIcon
                      variant="outline"
                      color="red"
                      aria-label="Delete todo"
                    >
                      <TrashIcon size={18} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Box>
    </Stack>
  );
}
