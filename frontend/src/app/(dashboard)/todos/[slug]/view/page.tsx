"use client";

import {
  Card,
  Image,
  Group,
  Text,
  Badge,
  Button,
  Stack,
  Title,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CaretLeftIcon } from "@phosphor-icons/react";

export default function ViewTodo() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [isDataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_TODOS_SERVICE_URL}/todo/${params.slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);

        setDataLoading(false);
      });
  }, []);

  return (
    <Stack>
      <Group>
        <Button
          leftSection={<CaretLeftIcon size={14} />}
          onClick={() => router.back()}
          variant="subtle"
        >
          Go back
        </Button>
      </Group>

      <Card padding="lg">
        <Card.Section component="div">
          <Image
            h={150}
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            alt="Task art"
          />
        </Card.Section>

        <Box pos="relative">
          <LoadingOverlay visible={isDataLoading}></LoadingOverlay>

          <Stack pt="lg">
            <Group justify="space-between">
              <Stack gap={4}>
                <Title order={2}>{data?.title}</Title>

                <Text>
                  {data?.date.toString()} at {data?.time.toString()}
                </Text>
              </Stack>

              {/* <Badge color="red">Due today</Badge> */}
            </Group>

            <Text size="sm" c="dimmed">
              {data?.description || "No description provided."}
            </Text>

            <Button>Mark as completed</Button>
          </Stack>
        </Box>
      </Card>
    </Stack>
  );
}
