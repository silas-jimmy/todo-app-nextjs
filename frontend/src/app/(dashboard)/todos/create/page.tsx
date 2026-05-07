"use client";

import { TodoCategory } from "@/app/types/todo";
import { TODOS_SERVICE_API_ENDPOINT } from "@/lib/utils/constants";
import {
  ActionIcon,
  Button,
  Grid,
  Group,
  Select,
  SelectProps,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { ClockIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTodo() {
  const router = useRouter();

  const ref = useRef<HTMLInputElement>(null);
  const [todoCategories, setTodoCategories] = useState<TodoCategory[]>([]);
  const [formButtonLoading, setFormButtonLoading] = useState(false);

  const timePickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <ClockIcon size={16} />
    </ActionIcon>
  );

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: null,
      description: null,
      category: null,
      date: new Date().toISOString().split("T")[0],
      time: null,
    },

    validate: {
      title: isNotEmpty("Task title is required!"),
      description: isNotEmpty("Task description is required!"),
      date: isNotEmpty("Task date is required!"),
      time: isNotEmpty("Task time is required!"),
    },
  });

  async function handleSubmit(data: any) {
    setFormButtonLoading(true);

    const payload: any = {
      title: data.title,
      description: data.description,
      date: data.date,
      time: data.time,
    };

    if (data.category) {
      const category: TodoCategory | undefined = todoCategories.find(
        (category: any) => category.value === data.category,
      );

      payload.category_id = category?.id;
    }

    const response = await fetch(`${TODOS_SERVICE_API_ENDPOINT}/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(payload),
    });

    setFormButtonLoading(false);

    const results = await response.json();

    notifications.show({
      title: response.ok ? "Success" : "Error",
      message: results.message,
      color: response.ok ? "green" : "red",
      position: "top-right",
      autoClose: response.ok ? 3000 : 4000,
    });

    if (response.ok) router.push("/todos");
  }

  const renderSelectOption: SelectProps["renderOption"] = ({
    option,
    checked,
  }) => (
    <Group>
      {option.label}
      {checked}
    </Group>
  );

  useEffect(() => {
    fetch(`${TODOS_SERVICE_API_ENDPOINT}/category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setTodoCategories(result.data);
      });
  }, []);

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Grid>
        <Grid.Col span={8}>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                withAsterisk
                label="Title"
                placeholder="The task's title"
                key={form.key("title")}
                {...form.getInputProps("title")}
              ></TextInput>
            </Grid.Col>

            <Grid.Col span={12}>
              <Textarea
                withAsterisk
                autosize
                minRows={3}
                label="Description"
                placeholder="Add a brief description of what the task is about"
                key={form.key("description")}
                {...form.getInputProps("description")}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Select
                withAsterisk
                clearable
                searchable
                nothingFoundMessage="Nothing found..."
                label="Category"
                placeholder="Select the task category"
                data={todoCategories}
                key={form.key("category")}
                {...form.getInputProps("category")}
                renderOption={renderSelectOption}
              ></Select>
            </Grid.Col>

            <Grid.Col span={12}>
              <Group justify="flex-end">
                <Button component={Link} href="/todos" variant="subtle">
                  Cancel
                </Button>

                <Button
                  variant="filled"
                  type="submit"
                  loading={formButtonLoading}
                >
                  Submit
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Grid.Col>

        <Grid.Col span={4}>
          <Grid>
            <Grid.Col span={12}>
              <div className="text-sm font-semibold mb-1">
                Set the date <span className="text-red-500">*</span>
              </div>

              <DatePicker
                fullWidth
                p={8}
                className="bg-white rounded-xl"
                key={form.key("date")}
                {...form.getInputProps("date")}
              ></DatePicker>
            </Grid.Col>

            <Grid.Col span={12}>
              <TimeInput
                withAsterisk
                ref={ref}
                rightSection={timePickerControl}
                label="Set the time"
                key={form.key("time")}
                {...form.getInputProps("time")}
              ></TimeInput>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </form>
  );
}
