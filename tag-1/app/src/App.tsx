import {
  Anchor,
  Card,
  Center,
  Container,
  Divider,
  Grid,
  MantineProvider,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { DateValue } from "@mantine/dates";
import { useCallback, useState } from "react";
import CalendarCard from "./cards/CalendarCard";
import FingerFoodCard from "./cards/FingerFoodCard";
import FormCard from "./cards/FormCard";
import PlaylistCard from "./cards/PlaylistCard";
import { ARTISTS, CATERERS, TIMESLOTS } from "./constants";
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
          <Center>{"Party Planner Demo"}</Center>
          <hr />
        </Title>
        <Stack h={"100%"} w={"100%"}>
          <Grid py={"xl"}>
            <Grid.Col span={{ sm: 6, md: 6, lg: 6 }}>
              <Stack gap="md">
                <Card>
                  <Title order={3}>{"Welcome to the Party Planner demo app!"}</Title>
                  <Divider my="md" />
                  <Text size="md">
                    {
                      "Here, you can explore options for catering, customize your menu, and design beautiful invitation cards tailored to your special occasion. Try out each feature to see how easy it is to create an unforgettable event!"
                    }
                  </Text>
                  <Space h="sm" />
                  <Text size="xs" c="dimmed">
                    <Text span>{" Credit to "}</Text>
                    <Anchor href="https://chatgpt.com/" target="_blank">
                      {"ChatGPT"}
                    </Anchor>
                    <Text span>
                      {
                        " for the snappy texts \u2014 turns out, even AI knows how to party! Built with "
                      }
                    </Text>
                    <Anchor href="https://vuejs.org/" target="_blank">
                      {"Vue.js"}
                    </Anchor>
                    <Text span>{" and "}</Text>
                    <Anchor href="https://matine.dev" target="_blank">
                      {"Mantine"}
                    </Anchor>
                    <Text span>{"."}</Text>
                  </Text>
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
