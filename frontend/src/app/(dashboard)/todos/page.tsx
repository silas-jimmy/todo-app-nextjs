"use client";

import {
  ActionIcon,
  Box,
  Button,
  Group,
  LoadingOverlay,
  Menu,
  Stack,
  Table,
  Title,
  Modal,
  Text,
} from "@mantine/core";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  PencilSimpleLineIcon,
  TrashIcon,
  EyeIcon,
  DotsThreeCircleVerticalIcon,
} from "@phosphor-icons/react";
import { useDisclosure } from "@mantine/hooks";
import { Todo } from "@/app/types/todo";
import { notifications } from "@mantine/notifications";
import { TODOS_SERVICE_API_ENDPOINT } from "@/lib/utils/constants";

export default function Todos() {
  const [showDeleteModal, handleDeleteModal] = useDisclosure(false);
  const [tableData, setTableData] = useState([]);
  const [isTableLoading, setTableLoading] = useState(true);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [deleteTodoConfirmLoading, setDeleteTodoConfirmLoading] =
    useState(false);

  function openDeleteTodoModal(todo: Todo) {
    setSelectedTodo(todo);

    handleDeleteModal.open();
  }

  function closeDeleteTodoModal() {
    setSelectedTodo(null);

    handleDeleteModal.close();
  }

  function deleteTodo() {
    setDeleteTodoConfirmLoading(true);

    fetch(`${TODOS_SERVICE_API_ENDPOINT}/todo/${selectedTodo?.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setDeleteTodoConfirmLoading(false);

        setSelectedTodo(null);

        handleDeleteModal.close();

        notifications.show({
          title: "Success",
          message: result.message,
          color: result.success ? "green" : "red",
          position: "top-right",
          autoClose: 3000,
        });
      })
      .finally(async () => {
        setTableLoading(true);

        const response = await fetch(`${TODOS_SERVICE_API_ENDPOINT}/todo`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        const result = await response.json();

        setTableData(result.data);

        setTableLoading(false);
      });
  }

  useEffect(() => {
    fetch(`${TODOS_SERVICE_API_ENDPOINT}/todo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setTableData(result.data);

        setTableLoading(false);
      });
  }, []);

  return (
    <>
      <Modal
        centered
        opened={showDeleteModal}
        onClose={closeDeleteTodoModal}
        title="Delete todo"
      >
        <Stack>
          <Text ta="center">
            Are you sure you want to delete this todo? This action cannot be
            undone.
          </Text>

          <Group justify="flex-end">
            <Button variant="default" onClick={closeDeleteTodoModal}>
              Cancel
            </Button>

            <Button
              color="red"
              variant="filled"
              loading={deleteTodoConfirmLoading}
              onClick={deleteTodo}
            >
              Confirm
            </Button>
          </Group>
        </Stack>
      </Modal>

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
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {tableData.length < 1 ? (
                <Table.Tr>
                  <Table.Td colSpan={100}>
                    <div className="text-gray-500 text-center font-light py-2">No todos available</div>
                  </Table.Td>
                </Table.Tr>
              ) : (
                tableData.map((todo: any) => (
                  <Table.Tr key={todo.id}>
                    <Table.Td>{todo.title}</Table.Td>
                    <Table.Td>{todo.date}</Table.Td>
                    <Table.Td>{todo.time}</Table.Td>
                    <Table.Td>
                      <Menu position="bottom-end">
                        <Menu.Target>
                          <ActionIcon variant="default">
                            <DotsThreeCircleVerticalIcon />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item
                            component={Link}
                            href={`/todos/${todo.id}/view`}
                            leftSection={<EyeIcon size={14} />}
                          >
                            View
                          </Menu.Item>

                          <Menu.Item
                            component={Link}
                            href={`/todos/${todo.id}/edit`}
                            leftSection={<PencilSimpleLineIcon size={14} />}
                          >
                            Edit
                          </Menu.Item>

                          <Menu.Item
                            leftSection={<TrashIcon size={14} />}
                            color="red"
                            onClick={() => openDeleteTodoModal(todo)}
                          >
                            Delete
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </Box>
      </Stack>
    </>
  );
}
