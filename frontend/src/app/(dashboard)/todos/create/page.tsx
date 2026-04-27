"use client";

import { TodoCategory } from "@/app/types/todo";
import {
  ActionIcon,
  Button,
  CheckIcon,
  CloseButton,
  Combobox,
  Grid,
  Group,
  Input,
  InputBase,
  Select,
  SelectProps,
  Stack,
  Textarea,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { Calendar, DatePicker, TimeInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { ClockIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRef, useState } from "react";

export default function CreateTodo() {
  const ref = useRef<HTMLInputElement>(null);
  const todoCategories: TodoCategory[] = [
    {
      label: "Label",
      value: "value",
      description: "Description",
    },
  ];

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
      id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      title: "",
      description: "",
      category: "",
      date: null,
      time: null,
      completed: false,
    },

    validate: {
      title: isNotEmpty("Task title is required!"),
      description: isNotEmpty("Task description is required!"),
      category: isNotEmpty("Task category is required!"),
      date: isNotEmpty("Task date is required!"),
      time: isNotEmpty("Task time is required!"),
    },
  });

  const renderSelectOption: SelectProps["renderOption"] = ({
    option,
    checked,
  }) => (
    <Group>
      {option.label}
      {checked}
    </Group>
  );

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
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

                <Button variant="filled" type="submit">
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
                allowDeselect 
                value={new Date().toDateString()}
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
