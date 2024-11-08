import { Box, Card, Chip, Group, Text, Title } from "@mantine/core";
import "@mantine/core/styles.css";
import { ARTISTS } from "../constants";

export default function PlaylistCard(props: {
  selectedArtists: string[];
  onArtistSelected: (selectedArtist: (typeof ARTISTS)[number]) => void;
}) {
  return (
    <Card>
      <Box>
        <Title order={5}>Music</Title>
        <Text size="sm" c="dimmed">
          Select the artists to add to the party playlist.
        </Text>
      </Box>
      <Box mt="md">
        <Group>
          {ARTISTS.map((artist, index) => {
            return (
              <Chip
                key={index}
                checked={props.selectedArtists.includes(artist)}
                onChange={() => props.onArtistSelected(artist)}
                variant="light"
              >
                {artist}
              </Chip>
            );
          })}
        </Group>
      </Box>
    </Card>
  );
}
