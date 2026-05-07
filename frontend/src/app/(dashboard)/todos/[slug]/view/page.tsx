"use client";

import {
  Card,
  Image,
  Group,
  Text,
  Button,
  Stack,
  Title,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CaretLeftIcon } from "@phosphor-icons/react";
import { TODOS_SERVICE_API_ENDPOINT } from "@/lib/utils/constants";

export default function ViewTodo() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [isDataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    fetch(`${TODOS_SERVICE_API_ENDPOINT}/todo/${params.slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
                  {data?.date} at {data?.time}
                </Text>
              </Stack>
            </Group>

            <Text size="sm" c="dimmed">
              {data?.description || "No description provided."}
            </Text>

            <Button>Mark as done</Button>
          </Stack>
        </Box>
      </Card>
    </Stack>
  );
}
