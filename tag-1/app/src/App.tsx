import {
  Anchor,
  Card,
  Center,
  Container,
  Divider,
  Grid,
  MantineProvider,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { DateValue } from "@mantine/dates";
import { useCallback, useState } from "react";
import CalendarCard from "./cards/CalendarCard";
import { ARTISTS, CATERERS, TIMESLOTS } from "./cards/constants";
import FingerFoodCard from "./cards/FingerFoodCard";
import FormCard from "./cards/FormCard";
import PlaylistCard from "./cards/PlaylistCard";
import { theme } from "./theme";

import "@mantine/core/styles.css";
import CatererCard from "./cards/CatererCard";

export default function App() {
  const [date, setDate] = useState<DateValue>(new Date());
  const [time, setTime] = useState<DateValue>(TIMESLOTS[0]);

  const [selectedArtists, setSelectedArtists] = useState<(typeof ARTISTS)[number][]>([]);

  const [selectedCaterer, setSelectedCaterer] = useState<(typeof CATERERS)[number] | null>(null);

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
                <CalendarCard
                  onDateChange={setDate}
                  onTimeChange={setTime}
                  selectedDate={date}
                  selectedTime={time}
                />
                <CatererCard
                  caterers={CATERERS}
                  selectedCaterer={selectedCaterer}
                  onCatererSelect={(email) => {
                    const caterer = CATERERS.find((caterer) => caterer.email === email);
                    if (!caterer) {
                      return;
                    }
                    setSelectedCaterer(caterer);
                  }}
                />
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ sm: 6, md: 6, lg: 6 }}>
              <Stack gap="md">
                <FingerFoodCard date={date} />
                <PlaylistCard selectedArtists={selectedArtists} onArtistSelected={updateArtist} />
                <FormCard selectedDay={date} selectedTime={time} />
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </MantineProvider>
  );
}
