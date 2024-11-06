import { Card, Chip, Divider, Group, Text, Title } from "@mantine/core";
import "@mantine/core/styles.css";
import { ARTISTS } from "./constants";

export default function PlaylistCard(props: {
  selectedArtists: string[];
  onArtistSelected: (selectedArtist: (typeof ARTISTS)[number]) => void;
}) {
  return (
    <Card>
      <Title order={3}>
        <Text>Music</Text>
      </Title>
      <Divider my="md" />
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
    </Card>
  );
}
