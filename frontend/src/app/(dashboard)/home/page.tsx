"use client";

import {
  BackgroundImage,
  Center,
  Flex,
  Grid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { DatePicker, DatesProvider } from "@mantine/dates";
import dayjs from "dayjs";

export default function Home() {
  const today = dayjs().format('YYYY-MM-DD');

  return (
    <Grid>
      <Grid.Col span={9}>
        <div className="h-full bg-white rounded-xl p-1.5">
          <BackgroundImage
            h="100%"
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
            radius={6}
          >
            <Flex align="center" p="md" h="100%">
              <Grid>
                <Grid.Col span={8}>one</Grid.Col>

                <Grid.Col span={4}>two</Grid.Col>
              </Grid>
              {/* <Stack gap={12}>
                <Title>Good morning, John</Title>

                <Text c="white">You have 6 tasks to complete today.</Text>
              </Stack> */}
            </Flex>
          </BackgroundImage>
        </div>
      </Grid.Col>

      <Grid.Col span={3}>
        <div className="bg-white rounded-xl p-1.5">
          <DatesProvider settings={{ consistentWeeks: true }}>
            <DatePicker fullWidth value={today} size="sm" />
          </DatesProvider>
        </div>
      </Grid.Col>
    </Grid>
  );
}
