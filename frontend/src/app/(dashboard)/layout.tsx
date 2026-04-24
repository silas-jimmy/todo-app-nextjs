"use client";

import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger,
  Group,
  Indicator,
  NavLink,
  TextInput,
  Text,
  Button,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  BellIcon,
  GearSixIcon,
  HouseIcon,
  ListNumbersIcon,
  MagnifyingGlassIcon,
  SignOutIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerHeight = 64;
  const pathName = usePathname();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      header={{ height: headerHeight }}
      navbar={{ width: 220, breakpoint: "sm", collapsed: { mobile: !opened } }}
      withBorder={false}
      padding={6}
    >
      <AppShell.Header py={6} px={12}>
        <Group
          h="100%"
          justify="space-between"
          className="bg-white px-2 rounded-xl"
        >
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />

            <TextInput
              leftSectionPointerEvents="none"
              leftSection={<MagnifyingGlassIcon size={18} />}
              placeholder="Search todo..."
            />
          </Group>

          <Group gap={12}>
            <ActionIcon variant="default" size="lg" aria-label="Notifications">
              <Indicator size={6} offset={3}>
                <BellIcon size={18} />
              </Indicator>
            </ActionIcon>

            <Avatar color="orange" radius="xl">
              JD
            </Avatar>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <AppShell.Section px={12}>
          <Group px={12} gap={24} h={headerHeight} align="center">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />

            <Group gap={16}>
              <Avatar
                variant="filled"
                radius="sm"
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                size={32}
              />

              <Text>Logo</Text>
            </Group>
          </Group>
        </AppShell.Section>

        <AppShell.Section h="100%">
          <Stack py={6} px={12} justify="space-between" h="100%">
            <Stack p={6} gap={2} className="bg-white rounded-xl">
              <NavLink
                component={Link}
                className="rounded-xl"
                href="/home"
                label="Home"
                variant="subtle"
                active={pathName === '/home'}
                leftSection={<HouseIcon size={18} />}
              />

              <NavLink
                component={Link}
                className="rounded-xl"
                href="/todos"
                label="Todos"
                variant="subtle"
                active={pathName === '/todos'}
                leftSection={<ListNumbersIcon size={18} />}
              />

              <NavLink
                component={Link}
                className="rounded-xl"
                href="/profile"
                label="Profile"
                variant="subtle"
                active={pathName === '/profile'}
                leftSection={<UserCircleIcon size={18} />}
              />

              <NavLink
                component={Link}
                className="rounded-xl"
                href="/settings"
                label="Settings"
                variant="subtle"
                active={pathName === '/settings'}
                leftSection={<GearSixIcon size={18} />}
              />
            </Stack>

            <Button
              variant="default"
              justify="start"
              leftSection={<SignOutIcon size={18} />}
            >
              Log out
            </Button>
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <div className="px-1.5">{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
