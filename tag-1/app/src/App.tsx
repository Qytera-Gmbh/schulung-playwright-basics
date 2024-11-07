import {
  Anchor,
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Grid,
  Group,
  MantineProvider,
  Modal,
  Popover,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useState } from "react";
import { ARTISTS } from "./cards/constants";
import FingerFoodCard from "./cards/FingerFoodCard";
import FormCard from "./cards/FormCard";
import PlaylistCard from "./cards/PlaylistCard";
import { theme } from "./theme";

export default function App() {
  const [opened, { open, close }] = useDisclosure(false);
  const [date] = useState(new Date());
  const [selectedArtists, setSelectedArtists] = useState<(typeof ARTISTS)[number][]>([]);

  const updateArtist = useCallback(
    (artist: (typeof ARTISTS)[number]) => {
      setSelectedArtists((currentArtists) => {
        if (currentArtists.includes(artist)) {
          return currentArtists.filter((e) => e !== artist);
        }
        return [...currentArtists, artist];
      });
    },
    [setSelectedArtists]
  );

  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Modal
        opened={opened}
        onClose={close}
        // title={<Title order={2}>About Mantine Theme Builder</Title>}
        // title={"About the project"}
        size={"xl"}
        centered
        // scrollAreaComponent={ScrollArea.Autosize}
        styles={{ content: { paddingTop: "0rem" } }}
      >
        <ScrollArea h={"600px"} pe={"sm"} pl="md" pr="xl">
          <Text>
            Hello my name is <p>Someone</p>
          </Text>
        </ScrollArea>
      </Modal>
      <Container size={"xl"} p={{ sm: "md", md: "xl" }} h={"100%"} mt={"sm"}>
        <Title order={1}>
          <Center>Party Planner</Center>
          <hr />
        </Title>
        <Stack h={"100%"} w={"100%"}>
          <Grid py={"xl"}>
            <Grid.Col span={{ sm: 6, md: 6, lg: 6 }}>
              <Stack gap="md">
                <Card>
                  <Title order={3}>Text</Title>
                  <Divider my="md" />
                  <Text size="xs">Extra small text</Text>
                  <Text size="sm">Small text</Text>
                  <Text size="md">Default text</Text>
                  <Text size="lg">Large text</Text>
                  <Text size="xl">Extra large text</Text>
                  <Text fw={500}>Semibold</Text>
                  <Text fw={700}>Bold</Text>
                  <Text fs="italic">Italic</Text>
                  <Text td="underline">Underlined</Text>
                  <Text td="line-through">Strikethrough</Text>
                  <Text c="dimmed">Dimmed text</Text>
                  <Text c="blue">Blue text</Text>
                  <Text c="teal.4">Teal 4 text</Text>
                  <Text tt="uppercase">Uppercase</Text>
                  <Text tt="capitalize">capitalized text</Text>
                  <Text ta="center">Aligned to center</Text>
                  <Text ta="right">Aligned to right</Text>
                  <span>
                    I am a link: <Anchor href="https://example.org">link</Anchor>
                  </span>
                </Card>
                <Button onClick={open}>Open Modal</Button>
                <SimpleGrid cols={{ lg: 2 }} spacing="md">
                  <Stack gap="md">
                    <Card>
                      <Box>
                        <Title order={5}>Team Members</Title>
                        <Text size="sm" c="dimmed">
                          Invite your team members to collaborate.
                        </Text>
                      </Box>
                      <Box mt="lg">
                        <Stack gap="lg">
                          <Group justify="space-between">
                            <Group>
                              <Avatar src="/avatars/01.png" alt="Image" radius="xl" />
                              <div>
                                <Text size="sm" fw={500}>
                                  Sofia Davis
                                </Text>
                                <Text size="xs" c="dimmed">
                                  m@example.com
                                </Text>
                              </div>
                            </Group>
                            <Popover width={200} position="bottom-end" withArrow shadow="md">
                              <Popover.Target>
                                <Button
                                  variant="default"
                                  size="xs"
                                  /*rightSection={<ChevronDownIcon />}*/
                                >
                                  Owner
                                </Button>
                              </Popover.Target>
                              <Popover.Dropdown>
                                <TextInput placeholder="Select new role..." />
                                <Divider my="sm" />
                                <Stack gap="xs">
                                  <Text size="sm">Viewer</Text>
                                  <Text size="xs" c="dimmed">
                                    Can view and comment.
                                  </Text>
                                  <Text size="sm">Developer</Text>
                                  <Text size="xs" c="dimmed">
                                    Can view, comment and edit.
                                  </Text>
                                  <Text size="sm">Billing</Text>
                                  <Text size="xs" c="dimmed">
                                    Can view, comment and manage billing.
                                  </Text>
                                  <Text size="sm">Owner</Text>
                                  <Text size="xs" c="dimmed">
                                    Admin-level access to all resources.
                                  </Text>
                                </Stack>
                              </Popover.Dropdown>
                            </Popover>
                          </Group>
                          <Group justify="space-between">
                            <Group>
                              <Avatar src="/avatars/02.png" alt="Image" radius="xl" />
                              <div>
                                <Text size="sm" fw={500}>
                                  Jackson Lee
                                </Text>
                                <Text size="xs" c="dimmed">
                                  p@example.com
                                </Text>
                              </div>
                            </Group>
                            <Popover width={200} position="bottom-end" withArrow shadow="md">
                              <Popover.Target>
                                <Button
                                  variant="default"
                                  size="xs"
                                  /*rightSection={<ChevronDownIcon />}*/
                                >
                                  Member
                                </Button>
                              </Popover.Target>
                              <Popover.Dropdown>
                                <TextInput placeholder="Select new role..." />
                                <Divider my="sm" />
                                <Stack gap="xs">
                                  <Text size="sm">Viewer</Text>
                                  <Text size="xs" c="dimmed">
                                    Can view and comment.
                                  </Text>
                                  <Text size="sm">Developer</Text>
                                  <Text size="xs" c="dimmed">
                                    Can view, comment and edit.
                                  </Text>
                                  <Text size="sm">Billing</Text>
                                  <Text size="xs" c="dimmed">
                                    Can view, comment and manage billing.
                                  </Text>
                                  <Text size="sm">Owner</Text>
                                  <Text size="xs" c="dimmed">
                                    Admin-level access to all resources.
                                  </Text>
                                </Stack>
                              </Popover.Dropdown>
                            </Popover>
                          </Group>
                          <Group justify="space-between">
                            <Group>
                              <Avatar src="/avatars/03.png" alt="Image" radius="xl" />
                              <div>
                                <Text size="sm" fw={500}>
                                  Isabella Nguyen
                                </Text>
                                <Text size="xs" c="dimmed">
                                  i@example.com
                                </Text>
                              </div>
                            </Group>
                            <Popover width={200} position="bottom-end" withArrow shadow="md">
                              <Popover.Target>
                                <Button
                                  variant="default"
                                  size="xs" /*rightSection={<ChevronDownIcon />}*/
                                >
                                  Member
                                </Button>
                              </Popover.Target>
                              <Popover.Dropdown>
                                <TextInput placeholder="Select new role..." />
                                <Divider my="sm" />
                                <Stack gap="xs">
                                  <Text size="sm">Viewer</Text>
                                  <Text size="xs" c="dimmed">
                                    Can view and comment.
                                  </Text>
                                  <Text size="sm">Developer</Text>
                                  <Text size="xs" c="dimmed">
                                    Can view, comment and edit.
                                  </Text>
                                  <Text size="sm">Billing</Text>
                                  <Text size="xs" c="dimmed">
                                    Can view, comment and manage billing.
                                  </Text>
                                  <Text size="sm">Owner</Text>
                                  <Text size="xs" c="dimmed">
                                    Admin-level access to all resources.
                                  </Text>
                                </Stack>
                              </Popover.Dropdown>
                            </Popover>
                          </Group>
                        </Stack>
                      </Box>
                    </Card>
                    {/* <CardsCookieSettings /> */}
                    {/* <CardsPaymentMethod /> */}
                  </Stack>

                  <Stack gap="md">
                    {/* <CardsChat /> */}
                    {/* <CardsCreateAccount /> */}
                    {/* <CardsReportIssue /> */}
                  </Stack>
                </SimpleGrid>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ sm: 6, md: 6, lg: 6 }}>
              <Stack gap="md">
                <FingerFoodCard date={date} />
                <PlaylistCard selectedArtists={selectedArtists} onArtistSelected={updateArtist} />
                <FormCard />

                {/* <CardsCalendar /> */}
                {/* <CardsActivityGoal /> */}
                {/* <CardsMetric /> */}
                {/* <CardsDataTable /> */}
                {/* <CardsShare /> */}
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </MantineProvider>
  );
}
